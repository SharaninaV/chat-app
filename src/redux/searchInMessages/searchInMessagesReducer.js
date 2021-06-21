import {
    IS_SEARCHING_MESSAGES,
    SEARCH_MESSAGES_FAILURE,
    SEARCH_MESSAGES_REQUEST,
    SEARCH_MESSAGES_SUCCESS
} from "./types";


const initialState = {
    searchText: '',
    messagesFound: [],
    searchInMessagesError: [],
    searchMessagesNeeded: false
}

export const searchInMessagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_SEARCHING_MESSAGES:
            return {
                ...state,
                searchMessagesNeeded: action.payload
            }
        case SEARCH_MESSAGES_REQUEST:
            return {
                ...state,
                searchText: action.payload.searchText,
                searchInMessagesError: []
            }
        case SEARCH_MESSAGES_SUCCESS:
            return {
                ...state,
                messagesFound: action.payload.data,
                searchInMessagesError: []
            }
        case SEARCH_MESSAGES_FAILURE:
            return {
                ...state,
                searchText: [],
                messagesFound: [],
                searchInMessagesError: action.payload.error
            }
        default:
            return state
    }
}