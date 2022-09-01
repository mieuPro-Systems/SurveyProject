import isEmpty from "./isEmpty";
const Validators = require("validator");

export default function validateMachineInput(data) {
    let errors = {};
    console.log(data);

    data.type = !isEmpty(data.type) ? data.type : "";
    data.subType = !isEmpty(data.subType) ? data.subType : "";
    data.farmerId = !isEmpty(data.farmerId) ? data.farmerId : "";
    data.attachments = !isEmpty(data.attachments) ? data.attachments : "";
    data.brand = !isEmpty(data.brand) ? data.brand : "";
    data.count = !isEmpty(data.count) ? data.count : "";
    data.rentalBasis = !isEmpty(data.rentalBasis) ? data.rentalBasis : "";
    data.rent = !isEmpty(data.rent) ? data.rent : "";


    if (Validators.isEmpty(data.type)) {
        errors.type = "Type field is Required";
    }

    if (Validators.isEmpty(data.subType)) {
        errors.subType = "SubType field is Required";
    }

    if (Validators.isEmpty(data.attachments)) {
        errors.attachments = "Attachments field is Required"
    }

    if (Validators.isEmpty(data.farmerId)) {
        errors.farmerId = "Farmer ID is Required"
    }

    if (Validators.isEmpty(data.brand)) {
        errors.brand = "Brand field is Required"
    }

    if (Validators.isEmpty(data.count)) {
        errors.count = "Count field is Required"
    }

    if (Validators.isEmpty(data.rentalBasis)) {
        errors.rentalBasis = "RentalBasis field is Required"
    }
    if (!Validators.isLength(data.rent, { min: 0, max: 9 })) {
        errors.rent = "Enter a Proper Price Value"
    }

    if (Validators.isEmpty(data.rent)) {
        errors.rent = "Rent field is Required"
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
}