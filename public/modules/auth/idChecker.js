import { ValidationManager } from "./loginValidation.js";
import { Checker } from "./abstract/checker.js"

export class IdChecker extends Checker {
  constructor(validationManager) {
    super();
    if (validationManager instanceof ValidationManager) {
      this.validationManager = validationManager;
    } else {
      throw new Error('주입 실패');
    }
  }

  check() {
    document.getElementById('id').addEventListener('input', (e) => {
      const isValid = this.validationManager.idValidation(e.target.value);
      e.target.style.borderColor = isValid ? "green" : "red";
    });
  }
}