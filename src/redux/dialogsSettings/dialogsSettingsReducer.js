import {
    SHOW_DIALOGS_SETTINGS,
    HIDE_DIALOGS_SETTINGS,
    FETCH_DIALOGS_SETTINGS_SUCCESS,
    UPDATE_PHRASES_SUCCESS,
    UPDATE_GREETING_SUCCESS,
    RESET_UPDATED_STATE
} from "./types";

const initialState = {
    isShowSettings: false,
    dialogsSettings: {},
    isSettingsUpdated: false
}

export const dialogsSettingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_DIALOGS_SETTINGS:
            return {...state, isShowSettings: true}
        case HIDE_DIALOGS_SETTINGS:
            return {...state, isShowSettings: false, isSettingsUpdated: false}
        case FETCH_DIALOGS_SETTINGS_SUCCESS:
            return {...state, dialogsSettings: action.payload.data}
        case UPDATE_PHRASES_SUCCESS:
            return {...state, isSettingsUpdated: true}
        case UPDATE_GREETING_SUCCESS:
            return {...state, isSettingsUpdated: true}
        default: return state
    }
}