const createDb = (db, tableName) => {
  return new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE ${tableName} (productName TEXT NOT NULL, description TEXT, price INTEGER)`,
      (err) => {
        if (err) {
          reject("오류 : ", err);
        } else {
          console.log(`${tableName} 생성됨`);
          resolve();
        }
      }
    );
  });
};

module.exports = createDb;
