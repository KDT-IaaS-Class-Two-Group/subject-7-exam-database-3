const createLoginDb = (db, tableName) => {
  db.run(
    `CREATE TABLE ${tableName} (id TEXT NOT NULL, cookie INTEGER, state TEXT)`,
    (err) => {
      if (err) {
        console.log("오류 : ", err);
      } else {
        console.log(`${tableName} 생성됨`);
      }
    }
  );
};

module.exports = createLoginDb;
