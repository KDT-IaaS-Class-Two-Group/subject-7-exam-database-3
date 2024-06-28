const database = require("sqlite3").verbose();
const path = require("path");
const db = new database.Database(
  path.join(__dirname, "../../database/login.db")
);
const updateLoginDb = (tableName, change, changeValue, select, selectValue) => {
  const update = db.prepare(
    `UPDATE ${tableName} SET ${change} = ? WHERE ${select} = ?`
  );
  update.run(changeValue, selectValue);
};

module.exports = updateLoginDb;
