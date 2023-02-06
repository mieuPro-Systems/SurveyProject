import isEmpty from "./isEmpty";
const Validators = require("validator");

export default function validateGardenInput(data) {
    let errors = {};
    console.log(data);

    data.farmerId = !isEmpty(data.farmerId) ? data.farmerId : "";
    data.type = !isEmpty(data.type) ? data.type : "";
    data.name = !isEmpty(data.name) ? data.name : "";
    data.variety = !isEmpty(data.variety) ? data.variety : "";
    data.brand = !isEmpty(data.brand) ? data.brand : "";
    data.area = !isEmpty(data.area) ? data.area : "";
    data.age = !isEmpty(data.age) ? data.age : "";
    data.organic = !isEmpty(data.organic) ? data.organic : "";
    data.count = !isEmpty(data.count) ? data.count : "";
    data.sellingPeriod = !isEmpty(data.sellingPeriod) ? data.sellingPeriod : "";


    if (Validators.isEmpty(data.farmerId)) {
        errors.farmerId = "Farmer ID is Required"
    }

    if (Validators.isEmpty(data.type)) {
        errors.type = " Type field is Required"
    }

    if (Validators.isEmpty(data.variety)) {
        errors.variety = "Variety field is Required"
    }

    if (Validators.isEmpty(data.name)) {
        errors.name = "Name field is Required"
    }

    if (Validators.isEmpty(data.brand)) {
        errors.brand = "Brand field is Required"
    }

    if (Validators.isEmpty(data.area)) {
        errors.area = "Area field is Required"
    }

    if (Validators.isEmpty(data.age)) {
        errors.age = "Age field is Required"
    }

    if (Validators.isEmpty(data.organic)) {
        errors.organic = "Organic field is Required"
    }

    if (Validators.isEmpty(data.count)) {
        errors.count = "Count field is Required"
    }

    if (Validators.isEmpty(data.sellingPeriod)) {
        errors.sellingPeriod = "SellingPeriod field is Required"
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
}