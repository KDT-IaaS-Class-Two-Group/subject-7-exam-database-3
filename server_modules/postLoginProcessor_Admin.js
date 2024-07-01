const AdminManager = require('../database_modules/admin_modules/adminManager.js')
/**
 * 
 * @param {*} req : 
 * @param {*} res 
 */
const adminLoginProcessor = (req, res) => {
  let body = "";
  const adminManager = new AdminManager();
  req.on("data", (data) => {
    body += data;
  });
  req.on("end", () => {
    const loginData = JSON.parse(body);
    
  });
};

module.exports = adminLoginProcessor;
