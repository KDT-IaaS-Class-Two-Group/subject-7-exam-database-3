const insertLoginDb = (db, tableName) => {
  const insertDb = (id) => {
    const insert = db.prepare(`INSERT INTO ${tableName} (id) VALUES (?)`);
    insert.run(id);
  };

  const id = ["panda", "alpaca", "penguin", "marmot", "cheetah"];
  for (let i = 0; i < id.length; i++) {
    insertDb(id[i]);
  }
};
module.exports = insertLoginDb;
