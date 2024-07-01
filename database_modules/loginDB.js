const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database/login.db", (err) => {
  if (err) {
    console.error("에러 발생 : ", err);
  } else {
    console.log("데이터베이스 연결됨");
  }
});

const createLoginDb = require("./loginDb/createLoginDb");
const insertLoginDb = require("./loginDb/insertLoginDb");

const loginDb = async () => {
  try {
    await createLoginDb(db, "login");
    await insertLoginDb(db, "login");
  } catch (error) {
    console.error("오류 : ", error);
  } finally {
    db.close();
  }
};

loginDb();
