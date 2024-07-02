const AdminManager = require('../database_modules/admin_modules/adminManager.js')
const CreateTable = require('../database_modules/admin_modules/createTable.js')
const SelectTable = require('../database_modules/admin_modules/selectTable.js');

const checkAuth = async (obj) => {
  const adminManager = new AdminManager(new CreateTable('admin'), new SelectTable('admin'));
  const result = await adminManager.checkData(obj)
  console.log(result)
};

module.exports = checkAuth;