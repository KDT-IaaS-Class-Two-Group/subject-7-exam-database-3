const sessions = {};
const updateLoginDb = require("../database_modules/loginDb/updataLoginDb");
const crypto = require("crypto");
const postLoginSelect = (res, id, err, rows) => {
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
};

module.exports = postLoginSelect;
