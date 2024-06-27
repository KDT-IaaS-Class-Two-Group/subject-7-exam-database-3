class Checker {
  check() { throw new Error('오버라이드 에러') };
}

class IdChecker extends Checker {
  constructor(validationManager) {
    if (validationManager instanceof ValidationManager) {
      this.validationManager = validationManager;
    } else {
      throw new Error('인스턴스 안 됨');
    }
  }
  check() {
    document.getElementById('id').addEventListener('input', (e) => {
      const valid = this.validationManager.idValidation(e.target.value);
      e.target.style.borderColor = isValid ? "green" : "red";
    })
  }
}