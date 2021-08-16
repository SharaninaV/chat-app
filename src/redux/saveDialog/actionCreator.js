import {
    SAVE_DIALOG_REQUEST,
    SAVE_DIALOG_SUCCESS,
    SAVE_DIALOG_FAILURE,
} from './types'

export function saveDialogRequest(key) {
    return {
        type: SAVE_DIALOG_REQUEST,
        payload: { key },
    }
}

export const saveDialogSuccess = () => ({ type: SAVE_DIALOG_SUCCESS })

export function saveDialogFailure(error) {
    return {
        type: SAVE_DIALOG_FAILURE,
        payload: { error },
    }
}
