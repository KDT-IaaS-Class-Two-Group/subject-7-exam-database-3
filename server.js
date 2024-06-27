//#region
const http = require('http');
const fs = require('fs');
const postMethodHandler = require("./server_modules/postMethodHandler");
const getMethodHandler = require("./server_modules/getMethodHandler")
//#endregion

/**
 *  * 2024_06_21 배성빈 : server 
 *  기본적인 request에 맞는 response를 반환할 수 있도록 연결장치, 중간다리 역할을 수행한다. 
 *  
 *  !현재까지 진행해둔 작업 
 *  GET 요청 처리 : index.html 전송
 *  
 */
const server = http.createServer((req, res) => {

  if (req.method === "GET") {
    getMethodHandler(req, res);
  }
  else if (req.method === "POST") {
    postMethodHandler(req, res);
  };

}).listen(3000, () => { console.log('SERVER START : PORT 3000') });;