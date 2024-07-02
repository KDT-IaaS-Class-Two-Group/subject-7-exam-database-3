let coinCount = 0; // 총 코인 카운트 변수
const coinTypeCounts = {}; // 코인 종류별 카운트를 저장할 객체
const insertCoin = (req, res) => {
  let coinBody = "";
  req.on("data", (data) => {
    coinBody += data;
  });
  req.on("end", () => {
    try {
      const coinData = JSON.parse(coinBody);
      console.log("Received coin data:", coinData);

      // 코인 종류별 카운트 증가
      const coinType = coinData.data.split("-")[1];
      if (!coinTypeCounts[coinType]) {
        coinTypeCounts[coinType] = 0;
      }
      coinTypeCounts[coinType]++;
      coinCount++; // 총 코인 카운트 증가

      // 코인 종류별 누적 카운트 및 총 카운트 출력
      console.log(`Total coins inserted: ${coinCount}`);
      Object.keys(coinTypeCounts).forEach((type) => {
        console.log(`${type} coins inserted: ${coinTypeCounts[type]}`);
      });

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ coinCount, coinTypeCounts }));
    } catch (error) {
      console.error("Error parsing JSON:", error);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid JSON" }));
    }
  });
};

module.exports = insertCoin;
