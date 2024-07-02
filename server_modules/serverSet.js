const http = require("http");
const postMethodHandler = require("./postMethodHandler");
const getMethodHandler = require("./getMethodHandler");

const serverSet = (port) => {
  const server = http
    .createServer((req, res) => {
      if (req.method === "GET") {
        getMethodHandler(req, res);
      } else if (req.method === "POST") {
        postMethodHandler(req, res);
      }
    })
    .listen(port, (err) => {
      if (err) {
        console.log("Err : ", err);
      }
      console.log(`http://localhost:${port}`);
    });
};

module.exports = serverSet;
