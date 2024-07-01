const database = require("sqlite3").verbose();
const db = new database.Database("./database/login.db", (err) => {
  console.log("에러 발생 : ", err);
});
const createLoginDb = require("./loginDb/createLoginDb");
const insertBasicLoginDb = require("./loginDb/insertLoginDb");
createLoginDb(db, "login");
insertBasicLoginDb(db, "login");
