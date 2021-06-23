import {FETCH_CURRENT_DIALOG_REQUEST, FETCH_CURRENT_DIALOG_SUCCESS, FETCH_CURRENT_DIALOG_FAILURE} from './types'

export function fetchCurrentDialogRequest(key) {
    return {
        type: FETCH_CURRENT_DIALOG_REQUEST,
        payload: {key}
    }
}

export function fetchCurrentDialogSuccess(data) {
    return {
        type: FETCH_CURRENT_DIALOG_SUCCESS,
        payload: {data}
    }
}

export function fetchCurrentDialogFailure(error) {
    return {
        type: FETCH_CURRENT_DIALOG_FAILURE,
        payload: {error}
    }
}