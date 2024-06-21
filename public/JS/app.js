const http = require('http');
const fs =require('fs');
const querystring =require('querystring');

const port =8080;
const formHTML = `
  <html>
    <body>
      <form action="/submit" method="post">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name"><br><br>
        <label for="age">Age:</label>
        <input type="text" id="age" name="age"><br><br>
        <input type="submit" value="Submit">
      </form>
    </body>
  </html>
`;
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    // GET 요청 처리
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(formHTML);
  } else if (req.method === 'POST' && req.url === '/submit') {
    // POST 요청 처리
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const postData = querystring.parse(body);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(`<h1>Form Submitted</h1><p>Name: ${postData.name}</p><p>Age: ${postData.age}</p>`);
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});