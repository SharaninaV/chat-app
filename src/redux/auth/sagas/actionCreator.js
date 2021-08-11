import {
    FETCH_LOGIN_REQUEST,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_FAILURE,
    LOG_OUT,
    SM_AUTH_REQUEST,
    SM_AUTH_SUCCESS,
    SM_AUTH_FAILURE, RESET_AUTH_FORM
} from './types'

export function loginRequest({email, password}) {

    return {
        type: FETCH_LOGIN_REQUEST,
        payload: {email: email, password: password}
    }
}

export function loginSuccess(payload) {
    return {
        type: FETCH_LOGIN_SUCCESS,
        payload: {payload}
    }
}

export function loginFailure(error) {
    return {
        type: FETCH_LOGIN_FAILURE,
        payload: {error}
    }
}

export const resetAuthForm = () => ({type: RESET_AUTH_FORM})

export const logOut = () => ({type: LOG_OUT})

export const smAuthRequest = (provider) => ({type: SM_AUTH_REQUEST, payload: {provider}})
export const smAuthSuccess = (user) => ({type: SM_AUTH_SUCCESS, payload: {user}})
export const smAuthFailure = (error) => ({type: SM_AUTH_FAILURE, payload: {error}})
