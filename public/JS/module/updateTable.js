const database = require("sqlite3").verbose();
//경로는 일단 제가 임시적으로 지정하였습니다.
const db = new database.Database("./public/JS/module/db");
//tableName = 테이블명 , change = 바꾸고 싶은 행이름 , changeValue = 어떤걸로 변경할건지
//select = 어떤 위치 행의 이름인지 , selectValue = 이 행의 이름의 값 쪽의 change를 changeValue할 것인지
const updateDb = (tableName,change,changeValue,select,selectValue) =>{
  const update = db.prepare(`UPDATE INTO ${tableName} SET ${change} = ? WHERE ${select} = ?`);
  update.run(changeValue,selectValue);
  update.finalize();
}
module.exports=updateDb;