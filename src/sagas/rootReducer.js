import {combineReducers} from "redux";
import {authFormReducer} from "../auth/authFormReducer";

export const rootReducer = combineReducers({
    auth: authFormReducer
})