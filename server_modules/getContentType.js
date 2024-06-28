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
    } else if (url === "/vending.js" || url.includes("/JS") || url.includes('.js')) {
      return "application/javascript";
    } else if (url.includes("/img")) {
      const ext = url.split('.').pop();
      if (ext === "jpg" || ext === "jpeg") {
        return "image/jpeg";
      } else if (ext === "gif") {
        return "image/gif";
      } else if (ext === "svg") {
        return "image/svg+xml";
      }
      return "image/png"; // 기본값으로 PNG
    } else if (url.includes("css")) {
      return "text/css";
    } else if (url === "/index.html" || url === "/HTML/index.html") {
      return "text/html";
    }else if(url.includes('css.map')){
      return 'application/json'
    }
     else {
      return "application/octet-stream"; // 기본값으로 이진 데이터
    }
  } catch (error) {
    console.error("Error in getContentType:", error);
    return "application/octet-stream"; // 에러 발생 시 기본값
  }
};

module.exports = getContentType;
