export const isPhoneNumberValid = (p) => {
  var phoneRe =
    /^(?:(?:\+|0{0,2})91(\s*|[-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;
  var digits = p.replace(/\D/g, "");
  return phoneRe.test(digits);
};
