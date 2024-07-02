const sqlite3 = require("sqlite3").verbose();
const createDb = require("./createDb");
const insertDb = require("./insertDb");
const products = require("./productData");

const productDb = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database("./database/product.db", async (err) => {
      if (err) {
        console.error("product.db 에러 발생 : ", err);
        reject(err);
        return;
      }
      console.log("product.db 데이터베이스 연결됨");

      try {
        const tables = Object.keys(products); // 객체의 키값을 배열로 변환
        for (const tableName of tables) {
          // for..of 문으로 키값 반복
          await createDb(db, tableName);
          await insertDb(db, tableName);
        }
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

module.exports = productDb;
