import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import errorsReducer from "./reducers/errorsReducer";

export default configureStore({
  reducer: {
    auth: authReducer,
    error: errorsReducer,
  },
});
