const sqlite3 = require('sqlite3');

class InsertTable {
  constructor(databaseName) {
    this.db = new sqlite3.Database(`./${databaseName}.db`);
  }
  async InsertAdminTable(name, pw) {
    const query = `INSERT INTO admin (name, pw) VALUES (?, ?)`;
    this.db.run(query, [name, pw], (error) => { console.error(error) });
    this.db.close();
  }
  async InsertSessionTable(name, key) {
    const query = `INSERT INTO admin (name, sessionKey) VALUES (?, ?)`;
    this.db.run(query, [name, key], (error) => { console.error(error) });
    this.db.close();
  }
}

module.exports = InsertTable;