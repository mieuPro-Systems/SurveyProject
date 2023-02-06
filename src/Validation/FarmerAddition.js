import isEmpty from "./isEmpty";
import { isPhoneNumberValid } from "./Common";
const Validators = require("validator");

export default function validateFarmerAddInput(data) {
    let errors = {};
    console.log(data);
    data.farmerName = !isEmpty(data.farmerName) ? data.farmerName : "";
    data.nickName = !isEmpty(data.nickName) ? data.nickName : "";
    data.fatherName = !isEmpty(data.fatherName) ? data.fatherName : "";
    data.age = !isEmpty(data.age) ? data.age.toString() : "";
    data.gender = !isEmpty(data.gender) ? data.gender : "";
    data.phoneNumber = !isEmpty(data.phoneNumber.toString()) ? data.phoneNumber.toString() : "";
    data.residentialType = !isEmpty(data.residentialType) ? data.residentialType : "";
    data.state = !isEmpty(data.state) ? data.state : "";
    data.district = !isEmpty(data.district) ? data.district : "";
    data.union = !isEmpty(data.union) ? data.union : "";
    data.panchayat = !isEmpty(data.panchayat) ? data.panchayat : "";
    data.village = !isEmpty(data.village) ? data.village : "";

    if (Validators.isEmpty(data.farmerName)) {
        errors.farmerName = "Farmer name field is required";
    }

    if (Validators.isEmpty(data.nickName)) {
        errors.nickName = "Nick name field is required";
    }

    if (Validators.isEmpty(data.fatherName)) {
        errors.fatherName = "Father name field is required";
    }
    console.log("type", typeof (data.age))
    if (Validators.isEmpty(data.age)) {
        errors.age = "Age field is required";
    }
    if (Validators.isEmpty(data.gender)) {
        errors.gender = "Gender field is required";
    }
    if (Validators.isEmpty(data.phoneNumber)) {
        errors.phoneNumber = "Phone Number field is required";
    }
    if (!isPhoneNumberValid(data.phoneNumber)) {
        errors.phoneNumber = "Phone Number field is invalid"
    }
    if (Validators.isEmpty(data.residentialType)) {
        errors.residentialType = "Residential Type field is required";
    }
    if (Validators.isEmpty(data.state)) {
        errors.state = "State field is required";
    }
    if (Validators.isEmpty(data.district)) {
        errors.district = "District field is required";
    }
    if (Validators.isEmpty(data.union)) {
        errors.union = "Union field is required";
    }
    if (Validators.isEmpty(data.panchayat)) {
        errors.panchayat = "Panchayat field is required";
    }

    if (Validators.isEmpty(data.village)) {
        errors.village = "Village field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
}