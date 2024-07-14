const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/all.db');
const products = require('./productData');

const insertDb = (db, tableName) => {
  return new Promise((resolve, reject) => {
    let productsKey = Object.keys(products);

    const insertProduct = (type, product, description, price) => {
      return new Promise((resolve, reject) => {
        const insertQuery = `INSERT INTO ${tableName} (type, productName, description, price) VALUES (?, ?, ?, ?)`;
        db.run(insertQuery, [type, product, description, price], (err) => {
          if (err) {
            reject(err);
          } else {
            console.log(`데이터 삽입됨: ${product}와 ${price}`);
            resolve();
          }
        });
      });
    };

    const insertAllProducts = async () => {
      try {
        for (let i = 0; i < productsKey.length; i++) {
          for (let j = 0; j < products[productsKey[i]].length; j++) {
            const [product, description, price, type] = products[productsKey[i]][j];
            await insertProduct(type, product, description, price);
          }
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    };

    insertAllProducts();
  });
};

module.exports = insertDb;
