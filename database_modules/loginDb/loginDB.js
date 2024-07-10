const sqlite3 = require("sqlite3").verbose();
const createLoginDb = require("./createLoginDb");
const insertLoginDb = require("./insertLoginDb");

const loginDb = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database("./database/all.db", async (err) => {
      if (err) {
        console.error("all.db 에러 발생 : ", err);
        reject(err);
        return;
      }
      console.log("all.db 데이터베이스 연결됨");

      try {
        await createLoginDb(db, "login");
        await insertLoginDb(db, "login");
        resolve();
      } catch (error) {
        console.error("오류 : ", error);
        reject(error);
      } finally {
        db.close((closeErr) => {
          if (closeErr) {
            console.error("데이터베이스 닫기 에러 : ", closeErr);
          }
        });
      }
    });
  });
};

module.exports = loginDb;
