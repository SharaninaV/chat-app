import {
    SHOW_SETTINGS, HIDE_SETTINGS, PROFILE_DATA_FAILURE, PROFILE_DATA_REQUEST, PROFILE_DATA_SUCCESS,
    UPDATE_NAME_REQUEST, UPDATE_NAME_SUCCESS, UPDATE_NAME_FAILURE,
    UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAILURE,
    UPDATE_AVATAR_REQUEST, UPDATE_AVATAR_SUCCESS, UPDATE_AVATAR_FAILURE, RESET_PROFILE_UPDATED_STATE
} from "./types";

export const showSettings =() => ({type: SHOW_SETTINGS})
export const hideSettings =() => ({type: HIDE_SETTINGS})

export const fetchProfileDataRequest = (id) => ({type: PROFILE_DATA_REQUEST, id: id})
export function fetchProfileDataSuccess(data) {
    return {
        type: PROFILE_DATA_SUCCESS,
        payload: {data}
    }
}

export function fetchProfileDataFailure(error) {
    return {
        type: PROFILE_DATA_FAILURE,
        payload: {error}
    }
}

export function updateNameRequest({id, name}) {
    return {
        type: UPDATE_NAME_REQUEST,
        payload: {id, name}
    }
}

export const updateNameSuccess = () => ({type: UPDATE_NAME_SUCCESS})

export function updateNameFailure(error) {
    return {
        type: UPDATE_NAME_FAILURE,
        payload: {error}
    }
}

export function updatePasswordRequest({id, newPassword, oldPassword}) {
    return {
        type: UPDATE_PASSWORD_REQUEST,
        payload: {id, newPassword, oldPassword}
    }
}

export const updatePasswordSuccess = () => ({type: UPDATE_PASSWORD_SUCCESS})

export function updatePasswordFailure(error) {
    return {
        type: UPDATE_PASSWORD_FAILURE,
        payload: {error}
    }
}

export function updateAvatarRequest({id, avatar}) {
    return {
        type: UPDATE_AVATAR_REQUEST,
        payload: {id, avatar}
    }
}

export const updateAvatarSuccess = () => ({type: UPDATE_AVATAR_SUCCESS})

export function updateAvatarFailure(error) {
    return {
        type: UPDATE_AVATAR_FAILURE,
        payload: {error}
    }
}

export const resetProfileUpdatedState = () => ({type: RESET_PROFILE_UPDATED_STATE})
