export const isPhoneNumberValid = (p) => {
<<<<<<< HEAD
  var phoneRe = /^[7-9][0-9]{9}$/;
  // var digits = p.replace(/\D/g, "");
  return phoneRe.test(p);
=======
  var phoneRe =
    /^\d{10,11}$/;
  var digits = p.replace(/\D/g, "");
  return phoneRe.test(digits);
>>>>>>> 9ca00d883b893115f12383e56f332d4b4b9edf5c
};
