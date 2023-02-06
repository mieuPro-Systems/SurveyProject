import { SET_ADDED_EMPLOYEES } from "../../actions/types";

const initialState = {
  addedEmployees: [],
  loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ADDED_EMPLOYEES:
      return {
        ...state,
        addedEmployees: action.payload,
      };

    default:
      return state;
  }
}
