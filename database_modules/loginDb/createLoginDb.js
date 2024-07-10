const createLoginDb = (db, tableName) => {
  return new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE ${tableName} (id TEXT PRIMARY KEY, cookie INTEGER, state TEXT)`,
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

module.exports = createLoginDb;
