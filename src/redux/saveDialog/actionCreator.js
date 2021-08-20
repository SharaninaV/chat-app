import {
    SAVE_DIALOG_REQUEST,
    SAVE_DIALOG_SUCCESS,
    SAVE_DIALOG_FAILURE,
} from './types'

export const saveDialogRequest = (key) => ({
    type: SAVE_DIALOG_REQUEST,
    payload: { key },
})

export const saveDialogSuccess = () => ({ type: SAVE_DIALOG_SUCCESS })

export const saveDialogFailure = (error) => ({
    type: SAVE_DIALOG_FAILURE,
    payload: { error },
})
