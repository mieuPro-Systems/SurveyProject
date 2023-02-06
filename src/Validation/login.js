const Validators = require("validator");
const { default: isEmpty } = require("./isEmpty");

export const validateLoginInput = (data) => {
  let errors = {};
  const userDetailsValidate = { username: "admin", password: "admin" };

  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validators.isEmpty(data.username)) {
    errors.username = "Username field is required";
  } else {
    if (data.username === userDetailsValidate.username) {
      if (data.password !== userDetailsValidate.password) {
        errors.password = "Incorrect password";
      }
    } else {
      errors.username = "Username is invalid";
    }
  }

  if (Validators.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export const validateLoginInputEmployee = (data) => {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validators.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  if (Validators.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
