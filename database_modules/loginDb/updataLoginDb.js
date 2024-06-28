const database = require("sqlite3").verbose();
const db = new database.Database("./database/login.db");
const updateLoginDb = (tableName, change, changeValue, select, selectValue) => {
  const update = db.prepare(
    `UPDATE ${tableName} SET ${change} = ? WHERE ${select} = ?`
  );
  update.run(changeValue, selectValue);
};

module.exports = updateLoginDb;
