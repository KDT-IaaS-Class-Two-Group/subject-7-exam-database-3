const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "../../database/login.db");
const db = new sqlite3.Database(dbPath);

const createLoginDb = require("./createLoginDb");
const insertBasicLoginDb = require("./insertBasicLoginDb");

const checkTable = (tableName) => {
  db.get(
    `SELECT COUNT(*) as count FROM sqlite_master WHERE type='table' AND name=?`,
    [tableName],
    (err, row) => {
      if (err) {
        console.error("Error checking table existence:", err);
      } else {
        if (row.count > 0) {
          console.log(`${tableName} table already exists`);
          insertBasicLoginDb(tableName); // 테이블이 존재하면 기본 데이터 삽입
        } else {
          createLoginDb(tableName); // 테이블이 존재하지 않으면 테이블 생성
        }
      }
    }
  );
};

checkTable("login");
