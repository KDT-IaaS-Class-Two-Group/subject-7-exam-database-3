const products = require("./product");
const insertDb = (db, tableName) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < products.length; i++) {
      const product = products[tableName][i][0];
      const price = product[tableName][i][1];
      const insertQuery = `INSERT INTO ${tableName} (product, price) VALUES (?, ?)`;

      db.run(insertQuery, [product], [price], (err) => {
        if (err) {
          reject(err); // 에러 발생 시 reject 호출
          return;
        }
        console.log(`데이터 삽입됨: ${product}와 ${price}`);
      });
    }
    resolve(); // 모든 삽입이 완료되면 resolve 호출
  });
};

module.exports = insertDb;
