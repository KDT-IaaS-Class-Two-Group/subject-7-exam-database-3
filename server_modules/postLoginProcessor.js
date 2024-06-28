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

      // selectDb 함수를 비동기적으로 호출하여 데이터베이스에서 데이터를 가져옴
      selectDb("*", "login", "id", "panda", (err, rows) => {
        if (err) {
          console.error("Error in selectDb:", err);
          // 데이터베이스 조회 에러 응답
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Database error" }));
        } else {
          // 조회 성공 시 rows가 담기고 여기서 처리
          console.log("Rows from database:", rows);
          // 응답
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              message: "Login request received",
              id: id,
              data: rows,
            })
          );
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
