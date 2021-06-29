import {
    SHOW_SETTINGS,
    HIDE_SETTINGS,
    PROFILE_DATA_REQUEST,
    PROFILE_DATA_SUCCESS,
    PROFILE_DATA_FAILURE,
    UPDATE_NAME_FAILURE,
    UPDATE_NAME_SUCCESS,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAILURE,
    CLEAR_FIELDS,
    UPDATE_AVATAR_SUCCESS
} from "./types";

const initialState = {
    isShowSettings: false,
    profileData: {},
    profileErrors: [],
    isProfileUpdated: false
}

export const profileSettingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_SETTINGS:
            return {...state, isShowSettings: true}
        case HIDE_SETTINGS:
            return {...state, isShowSettings: false}
        case PROFILE_DATA_REQUEST:
            return state
        case PROFILE_DATA_SUCCESS:
            return {...state, profileData: action.payload.data}
        case PROFILE_DATA_FAILURE:
            return {...state, profileErrors: action.payload.error}
        case UPDATE_NAME_SUCCESS:
            return {...state, isProfileUpdated: true}
        case UPDATE_PASSWORD_SUCCESS:
            return {...state, isProfileUpdated: true}
        case UPDATE_AVATAR_SUCCESS:
            return {...state, isProfileUpdated: true}
        default: return state
    }
}