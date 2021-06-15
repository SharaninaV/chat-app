import {FETCH_DIALOGS_REQUEST, FETCH_DIALOGS_SUCCESS, FETCH_DIALOGS_FAILURE} from './types'

export function fetchDialogsRequest() {

    return {
        type: FETCH_DIALOGS_REQUEST
    }
}

export function fetchDialogsSuccess(data) {
    return {
        type: FETCH_DIALOGS_SUCCESS,
        payload: {data}
    }
}

export function fetchDialogsFailure(error) {
    return {
        type: FETCH_DIALOGS_FAILURE,
        payload: {error}
    }
}