const selectDb = require("../database_modules/loginDb/selectLoginDb");
const postLoginSelect = require("./postLoginSelect");
const sendFile = require("./sendFile"); // sendFile 모듈 로드

const postLoginProcessor = (data, res) => {
  const id = data.id;
  console.log("Received ID:", id);
  selectDb("*", "login", "id", id, (err, rows) => {
    postLoginSelect(res, id, err, rows);
  });

};

module.exports = postLoginProcessor;
