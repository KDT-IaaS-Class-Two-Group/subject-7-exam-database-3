let coinCount = 0; // 코인 카운트 변수 추가

const postMethodHandler = (req, res) => {
  console.log("Handling POST request for:", req.url);

  if (req.method === "POST") {
    switch (req.url) {
      case "/login":
        postLoginProcessor(req, res);
        break;
      case "/Gologin":
        let body = "";
        req.on("data", (data) => {
          body += data;
        });
        req.on("end", () => {
          try {
            const data = JSON.parse(body);
            console.log(data);
            const filePath = path.join(
              __dirname,
              "..",
              "public",
              "HTML",
              "index.html"
            );
            const contentType = "text/html";
            sendFile(filePath, contentType, res);
          } catch (error) {
            console.error("Error parsing JSON:", error);
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Invalid JSON" }));
          }
        });
        break;
      case "/insert-coin": // insert-coin 엔드포인트 추가
        let coinBody = "";
        req.on("data", (data) => {
          coinBody += data;
        });
        req.on("end", () => {
          try {
            const coinData = JSON.parse(coinBody);
            console.log("Received coin data:", coinData);
            coinCount++; // 코인 카운트 증가
            console.log("Total coins inserted:", coinCount);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ coinCount }));
          } catch (error) {
            console.error("Error parsing JSON:", error);
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Invalid JSON" }));
          }
        });
        break;
      default:
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
        break;
    }
  } else {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method Not Allowed");
  }
};

module.exports = postMethodHandler;
