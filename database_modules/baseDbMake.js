const loginDb = require("./loginDb/loginDB.js");
const productDb = require("./productDb/productDB.js");
const purchaseDb = require("./purchaseDb/purchaseDB.js");

const setupDatabases = async () => {
  try {
    await Promise.all([loginDb(), productDb(), purchaseDb()]);
    console.log("모든 데이터베이스가 설정되었습니다.");
  } catch (error) {
    console.error("데이터베이스 설정 중 오류 발생: ", error);
  }
};

setupDatabases();
