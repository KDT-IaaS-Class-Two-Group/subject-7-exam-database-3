const tableObject = require('../pendingDb/tableScheme.js');

class AdminManager {
  constructor(createTable, selectTable) {
    this.create = createTable;
    this.select = selectTable;
    this.tableArr = ['admin', 'session']
  };

  createTable() {
    this.tableArr.forEach(element => {
      this.create.createTable(element, tableObject[element]);
    });
  }

  async checkData(object) {
    return this.select.selectAdminTable(object);
  }
}

module.exports = AdminManager;