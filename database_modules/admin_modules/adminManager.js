const tableObject = require('../tableScheme.js');

class AdminManager {
  constructor(tableName, createTable, userDataSelect) {
    this.create = createTable;
    this.select = userDataSelect;
    this.tableArr = tableName;
  };

  createTable() {
    this.tableArr.forEach(element => {
      this.create.createTable(element, tableObject[element]);
    });
  }

  checkData(object) {
    try {
      return this.select.select('admin', object);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = AdminManager;