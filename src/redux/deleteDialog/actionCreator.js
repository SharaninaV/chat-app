import {
    DELETE_DIALOG_REQUEST,
    DELETE_DIALOG_SUCCESS,
    DELETE_DIALOG_FAILURE,
} from './types'

export const deleteDialogRequest = (key) => ({
    type: DELETE_DIALOG_REQUEST,
    payload: { key },
})

export const deleteDialogSuccess = () => ({ type: DELETE_DIALOG_SUCCESS })

export const deleteDialogFailure = (error) => ({
    type: DELETE_DIALOG_FAILURE,
    payload: { error },
})
