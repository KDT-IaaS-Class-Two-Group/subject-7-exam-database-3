import { ValidationInterface } from "./abstract/validation.js";

export class ValidationManager extends ValidationInterface {
  idValidation(value) {
    return /^[a-zA-Zㄱ-힣0-9.]{2,12}$/.test(value);
  }
  pwValidation(value) {
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,18}$/.test(value);
  }
}
