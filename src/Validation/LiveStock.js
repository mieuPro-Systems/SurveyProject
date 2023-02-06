import isEmpty from "./isEmpty";
const Validators = require("validator");

export default function validateLiveStockInput(data) {
    let errors = {};
    console.log(data);

    data.place = !isEmpty(data.place) ? data.place : "";
    data.type = !isEmpty(data.type) ? data.type : "";
    data.breed = !isEmpty(data.breed) ? data.breed : "";
    data.name = !isEmpty(data.name) ? data.name : "";
    data.count = !isEmpty(data.count) ? data.count : "";
    data.farmerId = !isEmpty(data.farmerId) ? data.farmerId : "";
    data.season = !isEmpty(data.season) ? data.season : "";

    if (Validators.isEmpty(data.place)) {
        errors.place = "Place field is Required";
    }

    if (Validators.isEmpty(data.type)) {
        errors.type = " Type field is Required"
    }

    if (Validators.isEmpty(data.breed)) {
        errors.breed = "Breed field is Required"
    }

    if (Validators.isEmpty(data.farmerId)) {
        errors.farmerId = "Farmer ID is Required"
    }

    if (Validators.isEmpty(data.name)) {
        errors.name = "Name field is Required"
    }

    if (Validators.isEmpty(data.count)) {
        errors.count = "Count field is Required"
    }

    if (Validators.isEmpty(data.season)) {
        errors.season = "Season field is Required"
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
}