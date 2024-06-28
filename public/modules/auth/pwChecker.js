import { ValidationManager } from "./loginValidation.js";
import { Checker } from "./abstract/checker.js";

export class PwChecker extends Checker {
  constructor(validationManager) {
    super(); // 부모 클래스의 constructor 호출
    if (validationManager instanceof ValidationManager) {
      this.validationManager = validationManager;
    } else {
      throw new Error('주입 실패');
    }
  }

  check() {
    document.getElementById('pw').addEventListener('input', (e) => {
      const isValid = this.validationManager.pwValidation(e.target.value);
      e.target.style.borderColor = isValid ? "green" : "red";
    });
  }
};