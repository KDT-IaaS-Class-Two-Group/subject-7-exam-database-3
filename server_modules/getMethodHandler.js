const path = require("path");
const getContentType = require("./getContentType");
const sendFile = require("./sendFile");
const htmlPath = path.join(__dirname, "..", "public", "HTML");
const cssPath = path.join(__dirname, "..", "public", "CSS");
const jsPath = path.join(__dirname, "..", "public", "JS");

const getMethodHandler = (req, res) => {
  const url = req.url;
  const contentType = getContentType(url); // contentType을 가져옵니다.
  console.log(req.url)
  let fileName;
  switch (true) {
    case url === "/":
      sendFile(path.join(htmlPath, "manager.html"), contentType, res);
      break;

    case url === "/HTML/index.html":
      sendFile(path.join(htmlPath, "index.html"), contentType, res);
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

    case url.includes('/modules/'):
      sendFile(path.join("./public", req.url), contentType, res);
      break;

    case url.includes('/SCSS/'):
      sendFile(path.join("./public", req.url), contentType, res);
      break;

    case url.includes('/manager_source/'):
      console.log(path.join(".", req.url))
      sendFile(path.join(".", req.url), contentType, res);
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
      break;
  }
};

module.exports = getMethodHandler;
