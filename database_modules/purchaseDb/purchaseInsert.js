const pruchaseInsert = (db, tableName, productName) => {
  return new Promise((resolve, reject) => {
    const insertQuery = `INSERT INTO ${tableName} (product) VALUES (?)`;
    db.run(insertQuery, [productName], (err) => {
      if (err) {
        reject(err); // 에러 발생 시 reject 호출
        return;
      }
      console.log(`데이터 삽입됨: ${productName}`);
    });

    resolve(); // 모든 삽입이 완료되면 resolve 호출
  });
};

module.exports = pruchaseInsert;
