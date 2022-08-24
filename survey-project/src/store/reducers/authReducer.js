import {
  SET_CURRENT_USER,
  SET_LOADING_FALSE,
  SET_LOADING_TRUE,
  SET_SHOW_SNACKBAR_FALSE,
  SET_SHOW_SNACKBAR_TRUE,
} from "../../actions/types";
import isEmpty from "../../Validation/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  showSnackBar: false,
  snackBarContent: {
    message: "",
    color: "info",
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };

    case SET_LOADING_TRUE:
      return {
        ...state,
        loading: true,
      };

    case SET_LOADING_FALSE:
      return {
        ...state,
        loading: false,
      };

    case SET_SHOW_SNACKBAR_FALSE:
      return {
        ...state,
        showSnackBar: false,
      };

    case SET_SHOW_SNACKBAR_TRUE:
      return {
        ...state,
        showSnackBar: true,
        snackBarContent: {
          message: action.payload.snackBarMessage,
          color: action.payload.snackBarColor,
        },
      };

    default:
      return state;
  }
}
