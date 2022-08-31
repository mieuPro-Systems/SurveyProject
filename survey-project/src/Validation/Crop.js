import isEmpty from "./isEmpty";
const Validators = require("validator");

export default function validateCropInput(data) {
    let errors = {};
    console.log(data);

    data.farmerId = !isEmpty(data.farmerId) ? data.farmerId : "";
    data.type = !isEmpty(data.type) ? data.type : "";
    data.variety = !isEmpty(data.variety) ? data.variety : "";
    data.name = !isEmpty(data.name) ? data.name : "";
    data.brand = !isEmpty(data.brand) ? data.brand : "";
    data.area = !isEmpty(data.area) ? data.area : "";
    data.croppedAt = !isEmpty(data.croppedAt) ? data.croppedAt : "";
    data.organic = !isEmpty(data.organic) ? data.organic : "";
    data.seedingType = !isEmpty(data.seedingType) ? data.seedingType : "";
    data.harvestPeriod = !isEmpty(data.harvestPeriod) ? data.harvestPeriod : "";


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

    if (Validators.isEmpty(data.croppedAt)) {
        errors.croppedAt = "CroppedAt field is Required"
    }

    if (Validators.isEmpty(data.organic)) {
        errors.organic = "Organic field is Required"
    }

    if (Validators.isEmpty(data.seedingType)) {
        errors.seedingType = "SeedingType field is Required"
    }

    if (Validators.isEmpty(data.harvestPeriod)) {
        errors.harvestPeriod = "HarvestPeriod field is Required"
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
}