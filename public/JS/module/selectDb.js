const database = require("sqlite3").verbose()
//경로는 일단 제가 임시적으로 지정하였습니다.
const db = new database.Database("./public/JS/module/db")
const selectDb = (wantSelect, tableName, ifSelectName,value) =>{
  //wantSelect는 내가 찾길 원하는 데이터를 적으면 된다.
  //tableName은 내가 원하는 테이블 이름을 적는다.
  //ifSelectName은 조건이다. ifSelectName이 ?일때
  //[value]는 '?'로 지정된 플레이스홀더는 [value] 배열의 값으로 대체되어서 []로 적은 것이다.
  db.all(`SELECT ${wantSelect} FROM ${tableName} ${ifSelectName} = ?`,[value], (err,rows)=>{
    if(err){
      throw new Error("select 에러났음")
    }
    else{
      rows.forEach((row)=>{
        //어떤걸로 불러와야하는지 아직 모르겠어서 id로 지정해줬음
        console.log(`${row.id}`);
      });
    }
  });
}
//users라는 테이블에서 id가 1값인 데이터를 모두 가져와라
selectDb('*','users','id',1)
module.exports=selectDb;