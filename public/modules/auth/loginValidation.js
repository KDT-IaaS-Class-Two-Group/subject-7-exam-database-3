class ValidationInterface{
  idValidtion(){
    throw new Error('오버라이드 안 했음');
  };
  pwValidtion(){
    throw new Error('오버라이드 안 했음');
  };
};

class ValidationManager extends ValidationInterface{
  constructor(){
  }
  idValidation(value) {
    return /^[a-zA-Zㄱ-힣0-9.]{2,12}$/.test(value);
  }
  pwValidation(value) {
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,18}$/.test(value);
  }
}