const selectDb = require("../database_modules/loginDb/selectLoginDb");
const updateLoginDb = require("../database_modules/loginDb/updataLoginDb");
const crypto = require("crypto");
const sendFile = require("./sendFile");
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
          // Create a new ID in the database
          updateLoginDb("INSERT INTO login (id) VALUES (?)", [id], (err) => {
            if (err) {
              console.error("Database insert error:", err);
              res.writeHead(500, { "Content-Type": "text/plain" });
              res.end("Database insert error");
            } else {
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ created: true, id: id }));
            }
          });
        } else {
          // Handle existing ID logic here
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ loggedIn: true }));
        }
      });
    } catch (error) {
      console.error("Error processing request:", error);
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Invalid request");
    }
  });
};

module.exports = postLoginProcessor;
