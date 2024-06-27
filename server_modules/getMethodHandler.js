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

const getContentType = require("./getContentType");
const sendFile = require("./sendFile");
const htmlPath = "public/HTML/";
const cssPath = "public/CSS/";
const getMethodHandler = (req, res) => {

    const url = req.url;
    const contentType = getContentType(url);
    let fileName;

    switch (true) {
        case url === "/":
        sendFile(`./${htmlPath}vending.html`, contentType, res);
        break;
        
        case url.includes("/CSS"):
        fileName = url.split("/CSS/")[1];
        sendFile(`./${cssPath+fileName}`, contentType, res);
        break;
        
        case url.includes("/img/"):
        fileName = url.split('/img/')[1];
        sendFile(`./img/${fileName}`, contentType, res);
        break
        
        default:
        break;
    }
};

module.exports = getMethodHandler