const postLoginProcessor = require("./postLoginProcessor");
const fs = require("fs");
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
        const data = body.json();
        console.log(data);
        res.writeHead(302, { Location: "./public/HTML/index.html" });
      });
      break;
  }
};
module.exports = postMethodHandler;
