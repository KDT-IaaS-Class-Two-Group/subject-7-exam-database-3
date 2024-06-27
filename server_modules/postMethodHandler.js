const postLoginProcessor = require("./postLoginProcessor")
const postMethodHandler = (req, res) => {
    switch (req.url) {
        case "/signup":
        postLoginProcessor(req, res);
        break;
    }
}
module.exports = postMethodHandler;