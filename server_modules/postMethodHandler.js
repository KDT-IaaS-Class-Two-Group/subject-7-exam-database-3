<<<<<<< HEAD
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
=======
const postLoginProcessor = require("./postLoginProcessor");
const Gologin = require("./postGologin");
const insertCoin = require("./postInsert-coin");

const postMethodHandler = (req, res) => {
  console.log("Handling POST request for:", req.url);

  if (req.method === "POST") {
    switch (req.url) {
      case "/login":
        postLoginProcessor(req, res);
        break;
      case "/Gologin":
        Gologin(req, res);
        break;
      case "/insert-coin": // insert-coin 엔드포인트 추가
        insertCoin(req, res); // insert-coin 요청 처리
        break;
      default:
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
        break;
    }
  } else {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method Not Allowed");
>>>>>>> 92f684acefaeaf71262ef746a9f38f673441bb02
  }
};

module.exports = postMethodHandler;
