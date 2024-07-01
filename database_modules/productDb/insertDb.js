const products = require("./productData");

const insertDb = (db, tableName) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < 5; i++) {
      const product = products[tableName][i][0];
      const description = products[tableName][i][1];
      const price = products[tableName][i][2];
      const insertQuery = `INSERT INTO ${tableName} (productName,description, price) VALUES (?, ?, ?)`;

      db.run(insertQuery, [product, description, price], (err) => {
        if (err) {
          reject(err); // 에러 발생 시 reject 호출
          return;
        }
        console.log(`데이터 삽입됨: ${product}와 ${price}`);
        resolve(); // 모든 삽입이 완료되면 resolve 호출
      });
    }
  });
};

module.exports = insertDb;
