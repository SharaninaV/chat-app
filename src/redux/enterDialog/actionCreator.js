import {
    ENTER_DIALOG_REQUEST,
    ENTER_DIALOG_SUCCESS,
    ENTER_DIALOG_FAILURE,
} from './types'

export function enterDialogRequest(key, operatorID) {
    return {
        type: ENTER_DIALOG_REQUEST,
        payload: { key, operatorID },
    }
}

export const enterDialogSuccess = () => ({ type: ENTER_DIALOG_SUCCESS })

export function enterDialogFailure(error) {
    return {
        type: ENTER_DIALOG_FAILURE,
        payload: { error },
    }
}
