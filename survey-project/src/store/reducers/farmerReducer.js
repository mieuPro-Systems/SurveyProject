import {
  SET_FARMER_DETAILS,
  SET_LIVESTOCK_DETAILS,
  SET_LABOUR_DETAILS,
  SET_ALL_FARMERS,
  SET_LAND_DETAILS,
  SET_UPDATED_LAND_DETAILS
} from "../../actions/types";

const initialState = {
  farmers: {
    farmerDetails: {},
    landDetails: [],
    cropDetails: {},
    garderDetails: {},
    livestockDetails: [],
    labourDetails: {},
    machineDetails: {},
  },
  loading: false,
  addedFarmers: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FARMER_DETAILS:
      return {
        ...state,
        farmers: { ...state.farmers, farmerDetails: action.payload },
      };

    case SET_LIVESTOCK_DETAILS:
      return {
        ...state,
        farmers: { ...state.farmers, livestockDetails: action.payload },
      };

    case SET_LABOUR_DETAILS:
      return {
        ...state,
        farmers: { ...state.farmers, labourDetails: action.payload },
      };
    case SET_ALL_FARMERS:
      return {
        ...state,
        addedFarmers: [...action.payload],
      };
    case SET_LAND_DETAILS:
      return {
        ...state,
        farmers: { ...state.farmers, landDetails: [...state.farmers.landDetails, action.payload] }

      }
    case SET_UPDATED_LAND_DETAILS:
      return {
        ...state,
        farmers: { ...state.farmers, landDetails: action.payload }
      }
    default:
      return state;
  }
}
