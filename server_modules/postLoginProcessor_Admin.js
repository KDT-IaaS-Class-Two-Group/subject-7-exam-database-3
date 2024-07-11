const checkAuth = require('./checkAuth.js');
const SessionManager = require('./sessionManager.js')

const adminLoginProcessor = (data, res) => {
  const isAuthCheck = checkAuth(data);
  if (isAuthCheck) {
    const sessionManager = new SessionManager();
    sessionManager.insertSessionTable();
    sessionManager.processRequestAdminLogin(res);
  } else {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end('error');
  }
};

module.exports = adminLoginProcessor;
