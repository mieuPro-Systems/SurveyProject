<<<<<<< HEAD
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
=======
import {
  SET_FARMER_DETAILS,
  SET_LIVESTOCK_DETAILS,
  SET_LABOUR_DETAILS,
  SET_ALL_FARMERS,
} from "../../actions/types";

const initialState = {
  farmers: {
    farmerDetails: {},
    landDetails: {},
    cropDetails: {},
    garderDetails: {},
    livestockDetails: [],
    labourDetails: {},
    machineDetails: {},
  },
  loading: false,
  addedFarmers: [],
>>>>>>> e87b86272489b14935af210e3d7f794f7098c8c1
};


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
    default:
      return state;
  }
}
