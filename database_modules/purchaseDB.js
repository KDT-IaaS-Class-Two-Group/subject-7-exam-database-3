const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database/purchase.db", (err) => {
  if (err) {
    console.error("에러 발생 : ", err);
  } else {
    console.log("데이터베이스 연결됨");
  }
});

const purchaseCreate = require("./purchaseDb/purchaseCreate");
const purchaseMake = async () => {
  try {
    await purchaseCreate(db, "purchase");
  } catch (error) {
    console.error("오류 : ", error);
  } finally {
    db.close();
  }
};

purchaseMake();
