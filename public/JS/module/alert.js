class Alert{
  constructor(contentId, msg){
    this.contentId = document.getElementById(contentId);
    this.msg = msg;
    this.init()
  }

  init(alertDivId){
    //경고창 요소 가져오기
    const alertDiv = document.getElementById(alertDivId);
    //&times는 닫기 버튼 표시를 생성함
    alertDiv.innerHTML=`
      <div id="alert-content">
        <span id="close-btn">&times;</span>
        <h3>${this.msg}</h3>
      </div>
    `;
    const closeBtn = document.getElementById('close-btn');
    //경고창이 떠서 닫고 싶다면 x를 클릭하여 hide()함수 실행
    closeBtn.addEventListener('click',()=>{
      this.hide();
    });
    this.alertDiv = alertDiv;
  }
  hide(){
    this.alertDiv.style.display="none";
  }
  show(){
    this.alertDiv.style.display="block"
  }
}
//경고창마다 하나씩 달아줘야함
const alert = new Alert()
btn.addEventListener('click',()=>{
  alert.show();
})