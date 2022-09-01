import isEmpty from "./isEmpty";
import { isPhoneNumberValid } from "./Common";
const Validators = require("validator");

export default function validateFarmerAddInput(data) {
    let errors = {};
    console.log(data);
    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";

    return {
        errors,
        isValid: isEmpty(errors),
    };
}