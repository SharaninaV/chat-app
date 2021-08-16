import {
    ENTER_DIALOG_REQUEST,
    ENTER_DIALOG_SUCCESS,
    ENTER_DIALOG_FAILURE,
} from './types'

export const enterDialogRequest = (key, operatorID) => ({
    type: ENTER_DIALOG_REQUEST,
    payload: { key, operatorID },
})

export const enterDialogSuccess = () => ({ type: ENTER_DIALOG_SUCCESS })

export const enterDialogFailure = (error) => ({
    type: ENTER_DIALOG_FAILURE,
    payload: { error },
})
