export const isPhoneNumberValid = (p) => {
  var phoneRe = /^[7-9][0-9]{9}$/;
  // var digits = p.replace(/\D/g, "");
  return phoneRe.test(p);
};
