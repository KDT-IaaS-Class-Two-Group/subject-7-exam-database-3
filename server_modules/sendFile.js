const fs = require("fs");

/**
 * ? sendFile: 핸들러에서 받아온 fileName과 contentType을 기반으로 response 객체 전송
 * @param {*} fileName 
 * @param {*} contentType 
 * @param {*} res 
 */
const sendFile = (fileName, contentType, res) => {
    console.log(`Reading file: ${fileName}`); // 파일 경로 로그
    fs.readFile(fileName, (err, data) => {
        if (err) {
            console.error(`Error reading file: ${fileName}`, err);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("500 ERROR");
            return;
        }
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
    });
};

module.exports = sendFile;
