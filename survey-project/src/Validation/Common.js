export const isPhoneNumberValid = (p) => {
  var phoneRe =
    /^\d{10,11}$/;
  var digits = p.replace(/\D/g, "");
  return phoneRe.test(digits);
};
