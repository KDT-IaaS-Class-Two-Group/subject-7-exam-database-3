const insertLoginDb = (db, tableName) => {
  return new Promise((resolve, reject) => {
    const idList = ["panda", "alpaca", "penguin", "marmot", "cheetah"];

    for (let i = 0; i < idList.length; i++) {
      const id = idList[i];
      const insertQuery = `INSERT INTO ${tableName} (id) VALUES (?)`;

      db.run(insertQuery, [id], (err) => {
        if (err) {
          reject(err); // 에러 발생 시 reject 호출
          return;
        }
        console.log(`데이터 삽입됨: ${id}`);
      });
    }
    resolve(); // 모든 삽입이 완료되면 resolve 호출
  });
};

module.exports = insertLoginDb;
