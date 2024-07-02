const Gologin = (req, res) => {
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
};

module.exports = Gologin;
