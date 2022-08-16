// import { isValidPhoneNumber } from "react-phone-number-input";

const Validators = require("validator");
const { default: isEmpty } = require("./isEmpty");

function isValid(p) {
  var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
  var digits = p.replace(/\D/g, "");
  return phoneRe.test(digits);
}

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

  if (!Validators.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validators.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  const regex = new RegExp(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g);
  console.log(isValid(data.phoneNumber));
  if (!isValid(data.phoneNumber)) {
    errors.phoneNumber = "Phone number is invalid";
  }

  if (Validators.isEmpty(data.phoneNumber)) {
    errors.phoneNumber = "Phone number field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
