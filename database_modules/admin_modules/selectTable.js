const sqlite3 = require('sqlite3').verbose();

class SelectUserData {
  constructor(databaseName) {
    this.db = new sqlite3.Database(`./${databaseName}.db`);
  }

  selectAdminTable(obj) {
    const { name, pw } = obj;
    const query = `SELECT * FROM admin WHERE name = ? AND pw = ?`;

    return new Promise((resolve, reject) => {
      this.db.get(query, [name, pw], (error, row) => {
        if (error) {
          console.error(error);
          return reject(error);
        }
        resolve(row);
      });
    });
  };

  selectSessionTable(obj) {
    const { sessionKey } = obj;
    const query = `SELECT * FROM session WHERE sessionKey = ?`;
    return new Promise((resolve, reject) => {
      this.db.get(query, sessionKey, (error, row) => {
        if (error) {
          return reject(error);
        }
        resolve(row);
      })
    })
  }


}

module.exports = SelectUserData;