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
  }
};

module.exports = postMethodHandler;
