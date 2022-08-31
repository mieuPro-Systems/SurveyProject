import isEmpty from "./isEmpty";
const Validators = require("validator");

export default function validateBuyInput(data) {
    let errors = {};
    console.log(data);

    data.farmerId = !isEmpty(data.farmerId) ? data.farmerId : "";
    data.requirement = !isEmpty(data.requirement) ? data.requirement : "";
    data.name = !isEmpty(data.name) ? data.name : "";
    data.brandOrVariety = !isEmpty(data.brandOrVariety) ? data.brandOrVariety : "";
    data.quantity = !isEmpty(data.quantity) ? data.quantity : "";
    data.date = !isEmpty(data.date) ? data.date : "";


    if (Validators.isEmpty(data.farmerId)) {
        errors.farmerId = "Farmer ID is Required"
    }

    if (Validators.isEmpty(data.requirement)) {
        errors.requirement = " Requirement field is Required"
    }

    if (Validators.isEmpty(data.name)) {
        errors.name = "Name field is Required"
    }

    if (Validators.isEmpty(data.brandOrVariety)) {
        errors.brandOrVariety = "Brand Or Variety field is Required"
    }

    if (Validators.isEmpty(data.quantity)) {
        errors.quantity = "Quantity field is Required"
    }

    if (Validators.isEmpty(data.date)) {
        errors.date = "Date field is Required"
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
}