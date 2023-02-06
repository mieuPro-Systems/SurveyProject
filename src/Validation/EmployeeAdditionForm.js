import isEmpty from "./isEmpty";
import { isPhoneNumberValid } from "./Common";
const Validators = require("validator");

export default function validateEmployeeAddInput(data) {
  let errors = {};
  console.log(data);
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : "";
  if (Validators.isEmpty(data.firstName)) {
    errors.firstName = "First name field is required";
  }

  if (Validators.isEmpty(data.userName)) {
    errors.userName = "Username field is required";
  }
  if (data.email.length > 0) {
    if (!Validators.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }

    if (Validators.isEmpty(data.email)) {
      errors.email = "Email field is required";
    }
  }

  if (!isPhoneNumberValid(data.phoneNumber)) {
    errors.phoneNumber = "Phone number is Invalid";
  }

  if (Validators.isEmpty(data.phoneNumber)) {
    errors.phoneNumber = "Phone number field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
