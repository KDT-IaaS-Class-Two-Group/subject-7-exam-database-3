/**
 * ? getContentType : 을 통해 Content-Type 값을 지정해준다.
 * @param {*} url : req.url
 * @returns : content type
 *
 * ! 현재 진행한 작업
 * "/" 분기, html 지정
 *
 * ! 진행해야하는 작업
 * 다른 분기 설정
 */
const getContentType = (url) => {
  try {
    if (url === "/") {
      return "text/html";
    } else if (url.includes("/img")) {
      return "image/png";
    } else if (url.includes("/CSS")) {
      return "text/css";
    } else if (url.includes("/JS")) {
      return "application/javascript";
    }
  } catch {
    console.log(new Error());
  }
};
module.exports = getContentType;
