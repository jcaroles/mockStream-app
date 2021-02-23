import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import AuthReducer from "./AuthReducer";
import streamReducer from "./streamReducer";

export default combineReducers({
  auth: AuthReducer,
  streams: streamReducer,
  form: formReducer,
});
