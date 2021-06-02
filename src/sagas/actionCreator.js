import {FETCH_LOGIN_REQUEST, FETCH_LOGIN_SUCCESS, FETCH_LOGIN_FAILURE} from './types'

export function loginRequest({email,password}) {

    return {
        type: FETCH_LOGIN_REQUEST,
        payload: { email: email,password: password }
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