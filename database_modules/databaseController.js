const Database = require('sqlite3');
const table = require('./tableShcema.js');


const databaseManager = (tableName, columns) => {
  const db = new Database.Database('./product.db');

  let obj = {

    tableName: tableName,
    columns: columns,

    createTable: () => {
      const queryString = this.columns.map(column => {
        if (column.type) {
          return `${column.name} ${column.type}`;
        }
        else {
          return column.foregin;
        }
      }).join(',');

      db.run(`CREATE TABLE IF NOT EXISTS ${tableName} (${queryString})`);

    },
  }


  return obj;
}

Object.keys(table).forEach(ele => {
  const dbManager = new databaseManager(ele, table[ele]);
  dbManager.createTable();
});

// for(let i = 0; i < 3; i++){

// }