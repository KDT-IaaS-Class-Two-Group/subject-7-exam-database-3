const path = require("path");
const sendFile = require("./sendFile");
const postLoginProcessor = require("./postLoginProcessor");

const postMethodHandler = (req, res) => {
  switch (req.url) {
    case "/login":
      console.log("d");
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
        const filePath = path.join(
          __dirname,
          "..",
          "public",
          "HTML",
          "index.html"
        );
        const contentType = "text/html";
        sendFile(filePath, contentType, res);
      });
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
      break;
  }
};

module.exports = postMethodHandler;
