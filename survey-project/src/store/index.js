import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import errorsReducer from "./reducers/errorsReducer";
import employeeReducer from "./reducers/employeeReducer";

export default configureStore({
  reducer: {
    auth: authReducer,
    error: errorsReducer,
    employee: employeeReducer,
  },
});
