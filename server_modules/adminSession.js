const crypto = require('crypto');
const sqlite3 = require('sqlite3');

const generateSessionKey = () => {
  return crypto.randomBytes(16).toString('hex');
}

const processRequestAdminLogin = (res) => {
  const sessionKey = generateSessionKey();
  res.setHeader('Set-Cookie', `sessionKey=${sessionKey}; HttpOnly`);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Logged in successfully');
}

const insertSessionTable = (name) => {
  const key = generateSessionKey();
  const db = new sqlite3.Database('./admin.db');
  const query = `
  UPDATE session
  SET sessionKey = ?, createAT = ?
  WHERE name = ?
`;
  crea
  db.run(query, [key, name])
  prepare.run('1', '터검니', key, '2000-12-12', '2000-12-12', 'on', '5');
  db.close();
}

const parseSessionKey = (req) => {
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

const checkCookie = (data) => {
  if (data.sessionKey) {
    const db = new sqlite3.Database('./database_modules/admin.db');
    db.serialize(() => {
      const prepare = db.prepare('SELECT * FROM session WHERE sessionKey = ?');
      const result = prepare.run(data.sessionKey);
      console.log(result)
    })
  } else {
    console.error(new Error('CheckCookie Error'));
  }
}
