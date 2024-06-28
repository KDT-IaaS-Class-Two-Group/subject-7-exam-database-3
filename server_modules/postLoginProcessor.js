/**
 * ? postLoginProcessor : req객체에 포함되어있는 id값을 추출하여 콘솔에 출력하는 모듈
 * @param {*} req : 요청객체
 * @param {*} res : 응답객체
 */
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

      // 응답
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Login request received", id: id }));
    } catch (error) {
      console.error("Error parsing JSON:", error);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid JSON" }));
    }
  });
};

module.exports = postLoginProcessor;
