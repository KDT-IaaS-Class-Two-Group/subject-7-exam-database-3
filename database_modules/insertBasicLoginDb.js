const insertBasicLoginDb =(tableName)=>{

  const database = require("sqlite3").verbose();
  
  const db = new database.Database("./database/login.db")
  
  const insertDb = (id) => {
    const insert = db.prepare(`INSERT INTO ${tableName} (id) VALUES (?)`);
    insert.run(id);
  }
  
  const id = ["panda", "alpaca", "penguin", "marmot", "cheetah"]
  for (let i = 0; i < id.length; i++) {
    insertDb(tableName, id[i])
  }
}
module.exports=insertBasicLoginDb;