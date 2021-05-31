import {combineReducers} from "redux";
import {authFormReducer} from "./authFormReducer";

export const rootReducer = combineReducers({
    auth: authFormReducer
})