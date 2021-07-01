import {
    SHOW_DIALOGS_SETTINGS,
    HIDE_DIALOGS_SETTINGS
} from "./types";

const initialState = {
    isShowSettings: false
}

export const dialogsSettingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_DIALOGS_SETTINGS:
            return {...state, isShowSettings: true}
        case HIDE_DIALOGS_SETTINGS:
            return {...state, isShowSettings: false}
        default: return state
    }
}