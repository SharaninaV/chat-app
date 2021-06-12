import {SEARCH_MESSAGES_REQUEST, SEARCH_MESSAGES_SUCCESS, SEARCH_MESSAGES_FAILURE} from "./types";

export function searchInMessagesRequest(text){
    return {
        type: SEARCH_MESSAGES_REQUEST,
        payload: {text}
    }
}

export function searchInMessagesSuccess({text, data}) {
    return {
        type: SEARCH_MESSAGES_SUCCESS,
        payload: {text, data}
    }
}

export function searchInMessagesFailure(error) {
    return{
        type: SEARCH_MESSAGES_FAILURE,
        payload: {error}
    }
}