const createLoginDb = (tableName)=>{
const database = require("sqlite3").verbose();
  const db = new database.Database("./database/login.db", (err) => {
    console.log("에러 발생 : ", err);
  });
  const createDb = (tableName) => {
    db.run(
      `CREATE TABLE ${tableName} (id TEXT NOT NULL, cookie INTEGER NOT NULL)`,
      (err) => {
        if (err) {
          console.log("오류 : ", err);
        } else {
          console.log(`${tableName} 생성됨`);
        }
      }
    );
  };
  createDb(tableName)
}

module.exports = createLoginDb;