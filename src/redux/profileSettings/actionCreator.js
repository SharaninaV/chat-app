import {
    SHOW_SETTINGS,
    HIDE_SETTINGS,
    PROFILE_DATA_FAILURE,
    PROFILE_DATA_REQUEST,
    PROFILE_DATA_SUCCESS,
    UPDATE_NAME_REQUEST,
    UPDATE_NAME_SUCCESS,
    UPDATE_NAME_FAILURE,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAILURE,
    UPDATE_AVATAR_REQUEST,
    UPDATE_AVATAR_SUCCESS,
    UPDATE_AVATAR_FAILURE,
    RESET_PROFILE_UPDATED_STATE,
} from './types'

export const showSettings = () => ({ type: SHOW_SETTINGS })
export const hideSettings = () => ({ type: HIDE_SETTINGS })

export const fetchProfileDataRequest = (id) => ({
    type: PROFILE_DATA_REQUEST,
    id: id,
})
export const fetchProfileDataSuccess = (data) => ({
    type: PROFILE_DATA_SUCCESS,
    payload: { data },
})

export const fetchProfileDataFailure = (error) => ({
    type: PROFILE_DATA_FAILURE,
    payload: { error },
})

export const updateNameRequest = ({ id, name }) => ({
    type: UPDATE_NAME_REQUEST,
    payload: { id, name },
})

export const updateNameSuccess = () => ({ type: UPDATE_NAME_SUCCESS })

export const updateNameFailure = (error) => ({
    type: UPDATE_NAME_FAILURE,
    payload: { error },
})

export const updatePasswordRequest = ({ id, newPassword, oldPassword }) => ({
    type: UPDATE_PASSWORD_REQUEST,
    payload: { id, newPassword, oldPassword },
})

export const updatePasswordSuccess = () => ({ type: UPDATE_PASSWORD_SUCCESS })

export const updatePasswordFailure = (error) => ({
    type: UPDATE_PASSWORD_FAILURE,
    payload: { error },
})

export const updateAvatarRequest = ({ id, avatar }) => ({
    type: UPDATE_AVATAR_REQUEST,
    payload: { id, avatar },
})

export const updateAvatarSuccess = () => ({ type: UPDATE_AVATAR_SUCCESS })

export const updateAvatarFailure = (error) => ({
    type: UPDATE_AVATAR_FAILURE,
    payload: { error },
})

export const resetProfileUpdatedState = () => ({
    type: RESET_PROFILE_UPDATED_STATE,
})
