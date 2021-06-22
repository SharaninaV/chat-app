import {combineReducers} from "redux";
import { authFormReducer } from "../auth/authFormReducer";
import {mainReducer} from "../main/mainReducer";
import {searchInUsersReducer} from "../searchInUsers/searchInUsersReducer";
import {searchInMessagesReducer} from "../searchInMessages/searchInMessagesReducer";
import {fetchDialogsReducer} from "../dialogs/fetchDialogsReducer";
import {fetchCurrentDialogReducer} from "../currentDialog/fetchCurrentDialogReducer";
import {autocompleteReducer} from "../autocomplete/autocompleteReducer";

export const rootReducer = combineReducers({
    auth: authFormReducer,
    main: mainReducer,
    searchInUsers: searchInUsersReducer,
    searchInMessages: searchInMessagesReducer,
    fetchDialogs: fetchDialogsReducer,
    fetchCurrentDialog: fetchCurrentDialogReducer,
    autocomplete: autocompleteReducer
})