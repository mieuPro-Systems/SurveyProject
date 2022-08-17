import { SET_FARMER_DETAILS } from "../../actions/types";



const initialState = {
    farmers: {
        farmerDetails: {},
        landDetails: {},
        cropDetails: {},
        garderDetails: {},
        livestockDetails: {},
        workandmachineDetails: {}
    },
    loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_FARMER_DETAILS:
            return { ...state, farmers: { farmerDetails: action.payload } }
        default:
            return state;
    }
}
