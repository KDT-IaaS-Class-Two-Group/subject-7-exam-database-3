const sqlite3 = require("sqlite3").verbose();
const purchaseCreate = require("./purchaseDb/purchaseCreate");

const purchaseDb = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database("./database/purchase.db", async (err) => {
      if (err) {
        console.error("purchase.db 에러 발생 : ", err);
        reject(err);
        return;
      }
      console.log("purchase.db 데이터베이스 연결됨");

      try {
        await purchaseCreate(db, "purchase");
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

module.exports = purchaseDb;
