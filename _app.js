//#region
const http = require('http');
const fs = require('fs');
const publicPath =  "public/HTML/";
//#endregion





const server = http.createServer((req, res) => {
  console.log(req.url)

  if (req.method === "GET") {
    getMethodHandler(req, res);
  };

});


const getMethodHandler = (req, res) => {

  switch (req.url) {
    case "/":
      const contentType = getContentType(req.url);
      sendFile(`${publicPath}index.html`, contentType, res);
      break;

    default:
      break;
  }


};


const sendFile = (fileName, contentType, res) => {

  fs.readFile(fileName, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("500 ERROR");
      return;
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  })

};


const getContentType = (url) => {
  if (url === "/") {
    return "text/html";
  }
}


server.listen(3000, () => { console.log('SERVER START : PORT 3000') });