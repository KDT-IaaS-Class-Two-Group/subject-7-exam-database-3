const postLoginProcessor = require("./postLoginProcessor");
const postMethodHandler = (req, res) => {
  switch (req.url) {
    case "/login":
      postLoginProcessor(req, res);
      break;
  }
};
module.exports = postMethodHandler;
