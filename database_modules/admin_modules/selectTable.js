const sqlite3 = require('sqlite3');

class SelectUserData {
  constructor(databaseName) {
    this.db = new sqlite3.Database(`./${databaseName}.db`);
  }

  select(tableName, obj) {
    const { name, pw } = obj;
    const query = `SELECT * FROM ${tableName} WHERE name = ? AND pw = ?`;

    return new Promise((resolve, reject) => {
      this.db.get(query, [name, pw], (error, row) => {
        if (error) {
          console.error(error);
          return reject(error);
        }
        resolve(row);
      });
    });
  }
}

module.exports = SelectUserData;