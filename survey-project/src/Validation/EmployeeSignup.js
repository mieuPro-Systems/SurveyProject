import { validatePassword } from "./Common";
import isEmpty from "./isEmpty";
const Validators = require("validator");

export default function validateEmployeeUsernameInput(data) {
  let errors = {};
  console.log(data);

  data.userName = !isEmpty(data.userName) ? data.userName : "";

  if (Validators.isEmpty(data.userName)) {
    errors.userName = "Username field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

export function validateEmployeePasswordInput(data) {
  let errors = {};
  console.log(data);

  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : "";

  if (Validators.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validators.isEmpty(data.password)) {
    let error = validatePassword(data.password);
    if (error !== null) {
      errors.password = error;
    }
  }

  if (Validators.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm Password field is required";
  }

  if (data.password != data.confirmPassword) {
    errors.confirmPassword = "Should match with Password";
    if (!Validators.isEmpty(data.confirmPassword)) {
      let error = validatePassword(data.confirmPassword);
      if (error !== null) {
        errors.confirmPassword = error;
      }
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
