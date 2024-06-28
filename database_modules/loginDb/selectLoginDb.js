const database = require("sqlite3").verbose();
const path = require("path");
const db = new database.Database(
  path.join(__dirname, "../../database/login.db")
);
const selectLoginDb = (
  wantSelect,
  tableName,
  ifSelectName,
  value,
  callback
) => {
  db.all(
    `SELECT ${wantSelect} FROM ${tableName} WHERE ${ifSelectName} = ?`,
    [value],
    (err, rows) => {
      if (err) {
        console.error("select 부분 error:", err);
        callback(err, null); // 에러 발생 시 콜백에 에러를 전달
      } else {
        callback(null, rows); // 조회 결과를 콜백에 전달
      }
    }
  );
};
module.exports = selectLoginDb;
