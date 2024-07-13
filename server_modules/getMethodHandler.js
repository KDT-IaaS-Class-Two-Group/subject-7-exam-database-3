const path = require("path");
const getContentType = require("./getContentType");
const sendFile = require("./sendFile");
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/all.db');
const htmlPath = path.join(__dirname, "..", "public", "HTML");
const cssPath = path.join(__dirname, "..", "public", "CSS");
const jsPath = path.join(__dirname, "..", "public", "JS");

const getMethodHandler = (req, res) => {
    const url = req.url;
    const contentType = getContentType(url);
    console.log(req.url);
    let fileName;

    switch (true) {
        case url === "/":
            sendFile(path.join(htmlPath, "vending.html"), contentType, res);
            break;

        case url === "/HTML/index.html":
            sendFile(path.join(htmlPath, "index.html"), contentType, res);
            break;
        case url === "/manager.html":
      sendFile(path.join(htmlPath, "manager.html"), contentType, res);
      break;
        case url === "/vending.js":
            sendFile(path.join(jsPath, "vending.js"), contentType, res);
            break;

        case url.includes("/CSS"):
            fileName = url.split("/CSS/")[1];
            sendFile(path.join(cssPath, fileName), contentType, res);
            break;

        case url.includes("/img/"):
            fileName = url.split("/img/")[1];
            sendFile(path.join(__dirname, "..", "img", fileName), contentType, res);
            break;

        case url.includes("/JS/"):
            fileName = url.split("/JS/")[1];
            sendFile(path.join(jsPath, fileName), contentType, res);
            break;

        case url.includes("/modules/"):
            sendFile(path.join("./public", req.url), contentType, res);
            break;

        case url.includes("/SCSS/"):
            sendFile(path.join("./public", req.url), contentType, res);
            break;

        case url.includes("/manager_source/"):
            console.log(path.join(".", req.url));
            sendFile(path.join(".", req.url), contentType, res);
            break;

            case url.startsWith('/api/products'):
              const queryParams = new URLSearchParams(url.split('?')[1]);
              const id = queryParams.get('id');
              db.get("SELECT * FROM product WHERE rowid = ?", [id], (err, row) => {
                  if (err) {
                      res.writeHead(500, { 'Content-Type': 'application/json' });
                      res.end(JSON.stringify({ error: err.message }));
                      return;
                  }
                  if (!row) {
                      res.writeHead(404, { 'Content-Type': 'application/json' });
                      res.end(JSON.stringify({ error: 'Product not found' }));
                      return;
                  }
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ product: row }));
              });
              break;

        default:
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Not Found");
            break;
    }
};

module.exports = getMethodHandler;
