import {combineReducers} from "redux";
import authReducer from "./authReducer";
import taskReducer from "./taskReducer";

export default combineReducers({admin: authReducer, tasks: taskReducer});