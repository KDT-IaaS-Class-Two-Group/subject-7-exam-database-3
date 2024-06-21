const database = require("sqlite3").verbose();
//경로 설정은 지윤님 경로 그대로 사용했습니다.
const db = new database.Database("/public/JS/module/test.db");
const createDb = (tableName) => {
  db.run(
    `CREATE TABLE ${tableName} (product TEXT NOT NULL, price INTEGER NOT NULL, position INTEGER NOT NULL)`
  );
};
createDb("TEST");
