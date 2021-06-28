import {SHOW_SETTINGS, HIDE_SETTINGS} from "./types";

const initialState = {
    isShowSettings: false
}

export const profileSettingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_SETTINGS:
            return {...state, isShowSettings: true}
        case HIDE_SETTINGS:
            return {...state, isShowSettings: false}
        default: return state
    }
}