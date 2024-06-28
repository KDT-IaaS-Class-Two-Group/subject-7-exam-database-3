/**
 * ? postLoginProcessor : req객체에 포함되어있는 id,pw값을 추출하여 db에서 확인하는 모듈
 * @param {*} req : 요청객체
 * @param {*} res : 응답객체
 *
 * ! 현재 진행한 작업
 * id, pw값 추출
 *
 * ! 진행해야하는 작업
 * Database 모듈 접근, response 반환
 */
const postLoginProcessor = (req, res) => {
  let body = "";
  req.on("data", (data) => {
    body += data;
  });
  req.on("end", () => {
    const data = JSON.parse(body);
    // const id = data.split("&")[0].split("id=")[1];
    const id = data.id;
    console.log(body);
    console.log(data);
    console.log(id);

    //login DB 조회 후 맞다면,vending.html로 연결, 쿠키 설정 / database 쿠키 넣기
  });
};
module.exports = postLoginProcessor;
