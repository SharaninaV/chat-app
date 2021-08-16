import {
    FETCH_DIALOGS_REQUEST,
    FETCH_DIALOGS_SUCCESS,
    FETCH_DIALOGS_FAILURE,
} from './types'

export const fetchDialogsRequest = () => ({ type: FETCH_DIALOGS_REQUEST })

export const fetchDialogsSuccess = (data) => ({
    type: FETCH_DIALOGS_SUCCESS,
    payload: { data },
})

export const fetchDialogsFailure = (error) => ({
    type: FETCH_DIALOGS_FAILURE,
    payload: { error },
})
