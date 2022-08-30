export const isPhoneNumberValid = (p) => {
  var phoneRe = /^\d{10,11}$/;
  var digits = p.replace(/\D/g, "");
  return phoneRe.test(digits);
};

export function validatePassword(password) {
  let errors = [];
  if (password.length < 8) {
    errors.push("Your password must be at least 8 characters");
  }
  if (password.search(/[a-z]/i) < 0) {
    errors.push("Your password must contain at least one letter.");
  }
  if (password.search(/[0-9]/) < 0) {
    errors.push("Your password must contain at least one digit.");
  }
  if (errors.length > 0) {
    return errors.join("\n");
  }
  return null;
}
