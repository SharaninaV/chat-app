import {combineReducers} from "redux";
import { authFormReducer } from "../auth/authFormReducer";
import {mainReducer} from "../main/mainReducer";
import {searchInUsersReducer} from "../searchInUsers/searchInUsersReducer";
import {searchInMessagesReducer} from "../searchInMessages/searchInMessagesReducer";
import {fetchDialogsReducer} from "../dialogs/fetchDialogsReducer";

export const rootReducer = combineReducers({
    auth: authFormReducer,
    main: mainReducer,
    searchInUsers: searchInUsersReducer,
    searchInMessages: searchInMessagesReducer,
    fetchDialogs: fetchDialogsReducer
})