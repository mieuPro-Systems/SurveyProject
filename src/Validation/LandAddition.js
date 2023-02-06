import isEmpty from "./isEmpty";
const Validators = require("validator");

export default function validateLandInput(data) {
    let errors = {};
    console.log(data);

    data.category = !isEmpty(data.category) ? data.category : "";
    data.area = !isEmpty(data.area) ? data.area : "";
    data.addons = !isEmpty(data.addons) ? data.addons : "";
    data.farmerId = !isEmpty(data.farmerId) ? data.farmerId : "";
    data.ownerId = !isEmpty(data.ownerId) ? data.ownerId : "";

    if (Validators.isEmpty(data.category)) {
        errors.category = "Category field is Required";
    }

    if (Validators.isEmpty(data.area)) {
        errors.area = " Area field is Required"
    }

    if (Validators.isEmpty(data.addons)) {
        errors.addons = "Add-ons field is Required"
    }

    if (Validators.isEmpty(data.farmerId)) {
        errors.farmerId = "Farmer ID is Required"
    }

    if (Validators.isEmpty(data.ownerId)) {
        errors.ownerId = "Owner Id is Required"
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
}