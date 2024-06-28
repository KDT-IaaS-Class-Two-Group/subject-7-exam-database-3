const selectDb = require("../database_modules/loginDb/selectLoginDb");

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
          console.error("서버 select", err);
          // 데이터베이스 조회 에러 응답
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(console.log("ddd"));
        } else if (rows.length === 0) {
          //input id와 일치하지 않을 때
          console.log("No matching record found for ID:", id);
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(console.log("일치하지않음"));
        } else {
          // input id와 일치할 때
          const row = rows[0];
          console.log("Rows from database:", row.id);

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end();
        }
      });
    } catch (error) {
      console.error("Error parsing JSON:", error);
      // 잘못된 JSON 요청 응답
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid JSON" }));
    }
  });
};

module.exports = postLoginProcessor;
