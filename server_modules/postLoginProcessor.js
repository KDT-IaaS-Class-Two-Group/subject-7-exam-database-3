const selectDb = require("../database_modules/loginDb/selectLoginDb");
const postLoginSelect = require("./postLoginSelect");
const sendFile = require("./sendFile"); // sendFile 모듈 로드

const postLoginProcessor = (req, res) => {
  let body = "";
  req.on("data", (data) => {
    body += data;
  });
  req.on("end", () => {
    try {
      const data = JSON.parse(body);
      const id = data.id;
      console.log("Received ID:", id);
      selectDb("*", "login", "id", id, (err, rows) => {
        postLoginSelect(res, id, err, rows);
      });
    } catch (error) {
      console.error("Error parsing JSON:", error);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid JSON" }));
    }
  });
};

module.exports = postLoginProcessor;
