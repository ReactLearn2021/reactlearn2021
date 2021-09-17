import { combineReducers } from "redux";
import authReducer from "./auth";
import profileReducer from "./profile";
import addresses from "./addresses";
import errors from "./errors";

export default combineReducers({ auth : authReducer, profile : profileReducer, addresses, errors });