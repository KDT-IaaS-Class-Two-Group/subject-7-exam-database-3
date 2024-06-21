const database = require("sqlite3").verbose();
const path = require("path");
const dbpath = path.join(__dirname, "test.db");
const db = new database.Database(dbpath, (err) => {
  console.log("에러 발생 : ", err);
});
const createDb = (tableName) => {
  db.run(
    `CREATE TABLE ${tableName} (product TEXT NOT NULL, price INTEGER NOT NULL, position INTEGER NOT NULL)`,
    (err) => {
      if (err) {
        console.log("오류 : ", err);
      } else {
        console.log("실행됨");
      }
    }
  );
};
createDb("TEST");
