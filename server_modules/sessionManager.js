const crypto = require('crypto');
const sqlite3 = require('sqlite3');

class SessionManager {
  constructor() {
    this.session = this.generateSessionKey();
  }

  generateSessionKey() {
    return crypto.randomBytes(16).toString('hex');
  }

  processRequestAdminLogin(res) {
    res.setHeader('Set-Cookie', `sessionKey=${this.session}; HttpOnly`);
    res.writeHead(200, {"Content-Type" : "text/plain"});
    res.end('Logged in successfully');
  }

  insertSessionTable(name) {
    const db = new sqlite3.Database('./admin.db');
    const query = `
    UPDATE session
    SET sessionKey = ?
    WHERE name = ?
  `;
    db.run(query, [this.session, name]);
    db.close();
  }

  getParseSessionKey = (req) => {
    const list = {};
    const cookieHeader = req.headers.cookie;
    if (cookieHeader) {
      cookieHeader.split(';').forEach(cookie => {
        const parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
      });
    }
    return list;
  }

  checkSession = (data) => {
    if (data.sessionKey) {
      const db = new sqlite3.Database('./admin.db');
      db.serialize(() => {
        const prepare = db.prepare('SELECT * FROM session WHERE sessionKey = ?');
        const result = prepare.run(data.sessionKey);
        if (result) {
          return true;
        } else {
          return false;
        }
      })
    } else {
      console.error(new Error('CheckCookie Error'));
    }
  }


}









module.exports = SessionManager;