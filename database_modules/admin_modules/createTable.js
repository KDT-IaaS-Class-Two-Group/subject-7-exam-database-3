const sqlite3 = require('sqlite3');
class CreateTable {
  constructor(databaseName) {
    this.db = new sqlite3.Database(`./${databaseName}.db`);
  }
  async createTable(tableName, columnString) {
    console.log(tableName)
    const columns = columnString.map(ele => {
      if (ele.type) {
        return `${ele.name} ${ele.type}`;
      } else if (ele.foreign) {
        return ele.foreign;
      }
    }).join(',');

    const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns})`;

    this.db.run(query, (error) => {
      if (error) {
        console.error(new Error(error));
      } else {
        console.log('성공');
      }
    })
  }
}

module.exports = CreateTable;