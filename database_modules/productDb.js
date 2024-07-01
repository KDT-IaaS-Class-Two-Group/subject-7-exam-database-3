const sqlite3 = require("sqlite3").verbose();
const createDb = require("./productDb/createDb");
const insertDb = require("./productDb/insertDb");
const products = require("./productDb/productData");

const db = new sqlite3.Database("./database/product.db", (err) => {
  if (err) {
    console.error("에러 발생 : ", err);
  } else {
    console.log("데이터베이스 연결됨");
  }
});

const productDb = async () => {
  try {
    const tables = Object.keys(products); // 객체의 키값을 배열로 변환
    for (const tableName of tables) {
      // for..of 문으로 키값 반복
      await createDb(db, tableName);
      await insertDb(db, tableName);
    }
  } catch (error) {
    console.error("오류 : ", error);
  } finally {
    db.close();
  }
};

productDb();
