const database = require("sqlite3").verbose();

const updateLoginDb = (tableName, change, changeValue, select, selectValue) => {
  const db = new database.Database("./database/all.db");
  const update = db.prepare(
    `UPDATE ${tableName} SET ${change} = ? WHERE ${select} = ?`
  );
  update.run(changeValue, selectValue);
};

module.exports = updateLoginDb;
