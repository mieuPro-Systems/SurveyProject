import isEmpty from "./isEmpty";
const Validators = require("validator");

export default function validateSellInput(data) {
    let errors = {};
    console.log(data);

    data.farmerId = !isEmpty(data.farmerId) ? data.farmerId : "";
    data.productName = !isEmpty(data.productName) ? data.productName : "";
    data.variety = !isEmpty(data.variety) ? data.variety : "";
    data.organic = !isEmpty(data.organic) ? data.organic : "";
    data.quantity = !isEmpty(data.quantity) ? data.quantity : "";
    data.price = !isEmpty(data.price) ? data.price : "";
    data.date = !isEmpty(data.date) ? data.date : "";


    if (Validators.isEmpty(data.farmerId)) {
        errors.farmerId = "Farmer ID is Required"
    }

    if (Validators.isEmpty(data.productName)) {
        errors.productName = "Product Name field is Required"
    }

    if (Validators.isEmpty(data.variety)) {
        errors.variety = "Variety field is Required"
    }

    if (Validators.isEmpty(data.organic)) {
        errors.organic = "Organic field is Required"
    }

    if (Validators.isEmpty(data.quantity)) {
        errors.quantity = "Quantity field is Required"
    }

    if (Validators.isEmpty(data.price)) {
        errors.price = "Price field is Required"
    }

    if (Validators.isEmpty(data.date)) {
        errors.date = "Date field is Required"
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
}