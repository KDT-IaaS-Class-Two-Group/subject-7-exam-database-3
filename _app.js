//#region
const http = require('http');
const fs = require('fs');
const publicPath = "public/HTML/";
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
  console.log(req.url)

  if (req.method === "GET") {
    getMethodHandler(req, res);
  }
  else if (req.method === "POST") {
    postMethodHandler(req, res);
  };

}).listen(3000, () => { console.log('SERVER START : PORT 3000') });;



/**
 * ? getMethodHandler : get 요청을 처리하는 모듈
 * @param {*} req : 사용자 요청
 * @param {*} res : 응답객체
 * 
 * ! 현재 진행한 작업 
 * switch case "/" 처리
 * 
 * ! 진행해야하는 작업
 * "login", "~~"과 같은 작업들을 수행해야할 필요가 있다. -> switch 구문에 모듈을 추가하는 방식으로 진행
 */

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

const postMethodHandler = (req, res) => {
  switch (req.url) {
    case "/signup":
      postLoginProcessor(req, res);
      break;
  }

}



const postLoginProcessor = (req, res) => {
  let body = "";
  req.on("data", (data) => {
    body += data;
  });

  req.on("end", () => {
    const data = JSON.stringify(body);
    
    const id = data.split("&")[0].split("id=")[1];
    const pw = data.split("&")[1].split("password=")[1];

    
    console.log(decodeURI(id));
    console.log(decodeURI(pw));
  })



};



/**
 * ? sendFile: 핸들러에서 받아온 fileName과 contentType을 기반으로 response 객체 전송
 * @param {*} fileName 
 * @param {*} contentType 
 * @param {*} res 
 */
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


