import {
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAILURE,
} from './types'

export function sendMessageRequest(clientID, message) {
    return {
        type: SEND_MESSAGE_REQUEST,
        payload: { clientID, message },
    }
}

export const sendMessageSuccess = () => ({ type: SEND_MESSAGE_SUCCESS })

export function sendMessageFailure(error) {
    return {
        type: SEND_MESSAGE_FAILURE,
        payload: { error },
    }
}
