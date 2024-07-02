const path = require("path");
const sendFile = require("./sendFile");
const adminLoginProcessor = require('./postLoginProcessor_Admin');
const postLoginProcessor = require("./postLoginProcessor");

const postMethodHandler = (req, res) => {
  switch (req.url) {
    case "/login":
      postLoginProcessor(req, res);
      break;
    case "/Gologin":
      let body = "";
      req.on("data", (data) => {
        body += data;
      });
      req.on("end", () => {
        const data = JSON.parse(body);
        console.log(data);
        const filePath = path.join(__dirname, "..", "public", "HTML", "index.html");
        const contentType = "text/html";
        sendFile(filePath, contentType, res);
      });
      break;
    case "/adminLogin":
      adminLoginProcessor(req, res);
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
      break;
  }
};

module.exports = postMethodHandler;
