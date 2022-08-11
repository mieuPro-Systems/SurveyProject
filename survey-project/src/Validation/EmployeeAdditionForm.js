const Validators = require("validator");
const { default: isEmpty } = require("./isEmpty");

export default function validateEmployeeAddInput(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.email = !isEmpty(data.email) ? data.email : "";

  if (Validators.isEmpty(data.firstName)) {
    errors.firstName = "First name field is required";
  }

  if (Validators.isEmpty(data.userName)) {
    errors.userName = "Username field is required";
  }

  if (!Validators.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validators.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
