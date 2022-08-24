import { SET_FARMER_DETAILS, SET_LIVESTOCK_DETAILS, SET_LABOUR_DETAILS } from "../../actions/types";



const initialState = {
    farmers: {
        farmerDetails: {},
        landDetails: {},
        cropDetails: {},
        gardenDetails: {},
        livestockDetails: [],
        labourDetails: {},
        machineDetails: {}
    },
    loading: false,
};


export default function (state = initialState, action) {
    switch (action.type) {
        case SET_FARMER_DETAILS:
            return { ...state, farmers: { ...state.farmers, farmerDetails: action.payload } }

        case SET_LIVESTOCK_DETAILS:
            return { ...state, farmers: { ...state.farmers, livestockDetails: action.payload } }

        case SET_LABOUR_DETAILS:
            return { ...state, farmers: { ...state.farmers, labourDetails: action.payload } }
        default:
            return state;
    }
}
