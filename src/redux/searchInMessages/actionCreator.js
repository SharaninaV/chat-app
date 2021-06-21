import {
    SEARCH_MESSAGES_REQUEST,
    SEARCH_MESSAGES_SUCCESS,
    SEARCH_MESSAGES_FAILURE,
    IS_SEARCHING_MESSAGES
} from "./types";

export function setSearchMessages(isSearching) {
    return {
        type: IS_SEARCHING_MESSAGES,
        payload: isSearching
    }
}

export function searchInMessagesRequest(text){
    return {
        type: SEARCH_MESSAGES_REQUEST,
        payload: {text}
    }
}

export function searchInMessagesSuccess({data}) {
    return {
        type: SEARCH_MESSAGES_SUCCESS,
        payload: {data}
    }
}

export function searchInMessagesFailure(error) {
    return{
        type: SEARCH_MESSAGES_FAILURE,
        payload: {error}
    }
}