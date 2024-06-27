const postMethodHandler = (req, res) => {
    switch (req.url) {
        case "/signup":
        postLoginProcessor(req, res);
        break;
    }
}