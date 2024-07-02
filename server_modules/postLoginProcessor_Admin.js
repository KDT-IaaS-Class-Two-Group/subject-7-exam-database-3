const checkAuth = require('./checkAuth.js');
const SessionManager = require('./sessionManager.js')

const adminLoginProcessor = (req, res) => {
  let body = "";
  req.on("data", (data) => {
    body += data;
  });

  req.on("end", async () => {
    const loginData = await JSON.parse(body);
    const isAuthCheck = checkAuth(loginData);
    if (isAuthCheck) {
      const sessionManager = new SessionManager();
      sessionManager.insertSessionTable();
      sessionManager.processRequestAdminLogin(res);
    } else {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end('error');
    }
  });
};

module.exports = adminLoginProcessor;
