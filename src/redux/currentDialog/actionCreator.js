import {
    FETCH_CURRENT_DIALOG_REQUEST,
    FETCH_CURRENT_DIALOG_SUCCESS,
    FETCH_CURRENT_DIALOG_FAILURE,
} from './types'

export const fetchCurrentDialogRequest = (key) => ({
    type: FETCH_CURRENT_DIALOG_REQUEST,
    payload: { key },
})

export const fetchCurrentDialogSuccess = (data) => ({
    type: FETCH_CURRENT_DIALOG_SUCCESS,
    payload: { data },
})

export const fetchCurrentDialogFailure = (error) => ({
    type: FETCH_CURRENT_DIALOG_FAILURE,
    payload: { error },
})
