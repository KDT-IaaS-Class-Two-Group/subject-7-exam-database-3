const products = require("./productData");

const insertDb = (db, tableName) => {
  return new Promise((resolve, reject) => {
    let productsKey = Object.keys(products);
    for (let i = 0; i < productsKey.length; i++) {
      for (let j = 0; j < 5; j++) {
        const product = products[productsKey[i]][j][0];
        const description = products[productsKey[i]][j][1];
        const price = products[productsKey[i]][j][2];
        const type = products[productsKey[i]][j][3];
        const insertQuery = `INSERT INTO ${tableName} (type, productName,description, price) VALUES (?, ?, ?, ?)`;

        db.run(insertQuery, [type, product, description, price], (err) => {
          if (err) {
            reject(err); // 에러 발생 시 reject 호출
            return;
          }
          console.log(`데이터 삽입됨: ${product}와 ${price}`);
          resolve(); // 모든 삽입이 완료되면 resolve 호출
        });
      }
    }
  });
};

module.exports = insertDb;
