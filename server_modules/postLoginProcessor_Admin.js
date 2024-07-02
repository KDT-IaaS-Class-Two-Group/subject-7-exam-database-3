const checkAuth = require('./checkAuth.js');

const adminLoginProcessor = (req, res) => {
  let body = "";
  req.on("data", (data) => {
    body += data;
  });

  req.on("end", async () => {
    const loginData = await JSON.parse(body);
    checkAuth(loginData)
  });
};

module.exports = adminLoginProcessor;
