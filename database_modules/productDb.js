const sqlite3 = require("sqlite3").verbose();
const createDb = require("./createDb");
const insertDb = require("./insertDb");

const db = new sqlite3.Database("./database/product.db", (err) => {
  if (err) {
    console.error("에러 발생 : ", err);
  } else {
    console.log("데이터베이스 연결됨");
  }
});

const productDb = async () => {
  try {
    await createDb(db, "animal");
    await insertDb(db, "animal");
  } catch (error) {
    console.error("오류 : ", error);
  } finally {
    db.close();
  }
};

productDb();
