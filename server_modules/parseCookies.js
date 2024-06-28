function parseCookies(request) {
  const list = {};
  const rc = request.headers.cookie;
  rc &&
    rc.split(";").forEach((cookie) => {
      const parts = cookie.split("=");
      list[parts.shift().trim()] = decodeURIComponent(parts.join("="));
    });

  return list;
}
module.exports = parseCookies;
