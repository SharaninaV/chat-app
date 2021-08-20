import { combineReducers } from 'redux'
import { authFormReducer } from '../auth/authFormReducer'
import { mainReducer } from '../main/mainReducer'
import { searchInUsersReducer } from '../searchInUsers/searchInUsersReducer'
import { searchInMessagesReducer } from '../searchInMessages/searchInMessagesReducer'
import { fetchDialogsReducer } from '../dialogs/fetchDialogsReducer'
import { fetchCurrentDialogReducer } from '../currentDialog/fetchCurrentDialogReducer'
import { addMessageReducer } from '../addMessage/addMessageReducer'
import { profileSettingsReducer } from '../profileSettings/profileSettingsReducer'
import { dialogsSettingsReducer } from '../dialogsSettings/dialogsSettingsReducer'
import { leftMenuReducer } from '../leftMenu/leftMenuReducer'
import { registrationReducer } from '../registration/registrationReducer'
import { resetPasswordReducer } from '../resetPassword/resetPasswordReducer'

export const rootReducer = combineReducers({
    auth: authFormReducer,
    main: mainReducer,
    searchInUsers: searchInUsersReducer,
    searchInMessages: searchInMessagesReducer,
    fetchDialogs: fetchDialogsReducer,
    fetchCurrentDialog: fetchCurrentDialogReducer,
    addMessage: addMessageReducer,
    profileSettings: profileSettingsReducer,
    dialogsSettings: dialogsSettingsReducer,
    leftMenu: leftMenuReducer,
    registration: registrationReducer,
    resetPassword: resetPasswordReducer,
})
