import {ADD_MESSAGE, CLEAR_MESSAGE} from "./types";


export function addMessage(message) {
    return {
        type: ADD_MESSAGE,
        payload: message
    }
}

export const clearMessage =() => ({type: CLEAR_MESSAGE})