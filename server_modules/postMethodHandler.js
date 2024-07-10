const path = require("path");
const sendFile = require("./sendFile");
const adminLoginProcessor = require('./postLoginProcessor_Admin');
const postLoginProcessor = require("./postLoginProcessor");
const searchUser = require("./searchUser");

const postMethodHandler = (req, res) => {
  let body = "";
  req.on("data", (data) => {
    body += data;
  });
  req.on("end", async () => {
    const data = await JSON.parse(body);
    switch (req.url) {
      case "/login":
        postLoginProcessor(data, res);
        break;

      case "/Gologin":
        const filePath = path.join(__dirname, "..", "public", "HTML", "index.html");
        const contentType = "text/html";
        sendFile(filePath, contentType, res);
        break;

      case "/adminLogin":
        adminLoginProcessor(data, res);
        break;

      case "/search":
        searchUser(data, res);
        break;

      default:
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
        break;
    }
  });
}
module.exports = postMethodHandler;
