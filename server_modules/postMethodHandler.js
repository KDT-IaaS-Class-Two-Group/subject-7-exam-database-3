const path = require("path");
const sendFile = require("./sendFile");
const adminLoginProcessor = require('./postLoginProcessor_Admin');
const postLoginProcessor = require("./postLoginProcessor");
const searchUser = require("./searchUser");
const sqlite3 = require('sqlite3').verbose();
const dbPath = path.join(__dirname, '..', 'database', 'all.db'); // 경로 수정
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('데이터베이스 연결 오류:', err.message);
  } else {
    console.log('데이터베이스 연결 성공');
  }
});

// purchaseInsert 함수 추가
const purchaseInsert = (db, tableName, productName) => {
  return new Promise((resolve, reject) => {
    const insertQuery = `INSERT INTO ${tableName} (productName) VALUES (?)`;
    db.run(insertQuery, [productName], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const postMethodHandler = (req, res) => {
  let body = "";
  req.on("data", (data) => {
    body += data;
  });
  req.on("end", async () => {
    const data = await JSON.parse(body);
    switch (req.url) {
      case "/login":
        postLoginProcessor(data, res);
        break;

      case "/Gologin":
        const filePath = path.join(__dirname, "..", "public", "HTML", "index.html");
        const contentType = "text/html";
        sendFile(filePath, contentType, res);
        break;

      case "/adminLogin":
        adminLoginProcessor(data, res);
        break;

      case "/search":
        searchUser(data, res);
        break;

      case "/api/purchase":
        console.log('Request body:', body);
        const { productId, productName, price } = data;
        purchaseInsert(db, 'purchase', productName)
          .then(() => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Purchase recorded' }));
          })
          .catch(err => {
            console.error('Error during purchase insert:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          });
        break;

      default:
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
        break;
    }
  });
}

module.exports = postMethodHandler;
