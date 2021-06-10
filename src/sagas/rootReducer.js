import {combineReducers} from "redux";
import { authFormReducer } from "../auth/authFormReducer";
import {mainReducer} from "../main/mainReducer";

export const rootReducer = combineReducers({
    auth: authFormReducer,
    main: mainReducer
})