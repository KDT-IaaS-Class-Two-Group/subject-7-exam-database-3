const selectDb = require("../database_modules/loginDb/selectLoginDb");
const updateLoginDb = require("../database_modules/loginDb/updataLoginDb");
const crypto = require("crypto");
const sendFile = require("./sendFile"); // sendFile 모듈 로드
const sessions = {};

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
        if (err) {
          console.error("Database select error:", err);
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Database select error");
        } else if (rows.length === 0) {
          console.log("No matching record found for ID:", id);
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ loggedIn: false }));
        } else {
          const row = rows[0];
          console.log("Rows from database:", row.id);
          updateLoginDb("login", "state", "on", "id", id);
          const sessionId = crypto.randomBytes(16).toString("hex");
          sessions[sessionId] = row.id;
          res.writeHead(200, {
            "Set-Cookie": `sessionId=${sessionId}; HttpOnly;`,
            "Content-Type": "application/json",
          });
          res.end(JSON.stringify({ loggedIn: true, username: row.username }));
        }
      });
    } catch (error) {
      console.error("Error parsing JSON:", error);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid JSON" }));
    }
  });
};

module.exports = postLoginProcessor;
