const sqlite3 = require('sqlite3');


const selectDB = (name) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('./database_modules/database/all.db');
    const query = 'SELECT * FROM purchase WHERE id = ?';
    db.all(query, name, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
      db.close();
    });
  });
};

const searchUser = async (data, res) => {
  // ! TODO : session key 확인 모듈 추가
  try {
    const id = data.name;
    const DBdata = await selectDB(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(DBdata));
  } catch (err) {
    console.error(err);
  }
}


module.exports = searchUser

