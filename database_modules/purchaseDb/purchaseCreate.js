const purchaseCreate = (db, tableName) => {
  return new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, productName TEXT NOT NULL, FOREIGN KEY (id) REFERENCES login(id))`,
      (err) => {
        if (err) {
          reject("오류 : ", err);
        } else {
          console.log(`${tableName} 생성됨`);
          resolve();
        }
      }
    );
  });
};

module.exports = purchaseCreate;
