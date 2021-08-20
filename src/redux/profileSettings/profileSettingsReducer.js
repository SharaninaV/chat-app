import {
    SHOW_SETTINGS,
    HIDE_SETTINGS,
    PROFILE_DATA_SUCCESS,
    PROFILE_DATA_FAILURE,
    UPDATE_NAME_SUCCESS,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_AVATAR_SUCCESS,
    RESET_PROFILE_UPDATED_STATE,
} from './types'

const initialState = {
    isShowSettings: false,
    profileData: {},
    profileErrors: [],
    isNameUpdated: false,
    isAvatarUpdated: false,
    isPasswordUpdated: false,
}

export const profileSettingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_SETTINGS:
            return { ...state, isShowSettings: true }
        case HIDE_SETTINGS:
            return { ...state, isShowSettings: false }
        case PROFILE_DATA_SUCCESS:
            return { ...state, profileData: action.payload.data }
        case PROFILE_DATA_FAILURE:
            return { ...state, profileErrors: action.payload.error }
        case UPDATE_NAME_SUCCESS:
            return { ...state, isNameUpdated: true }
        case UPDATE_PASSWORD_SUCCESS:
            return { ...state, isPasswordUpdated: true }
        case UPDATE_AVATAR_SUCCESS:
            return { ...state, isAvatarUpdated: true }
        case RESET_PROFILE_UPDATED_STATE:
            return {
                ...state,
                isAvatarUpdated: false,
                isPasswordUpdated: false,
                isNameUpdated: false,
            }
        default:
            return state
    }
}
