import {SEARCH_MESSAGES_FAILURE, SEARCH_MESSAGES_REQUEST, SEARCH_MESSAGES_SUCCESS} from "./types";


const initialState = {
    searchText: '',
    messagesFound: [],
    searchInMessagesError: []
}

export const searchInMessagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_MESSAGES_REQUEST:
            return {
                ...state,
                searchText: action.payload.searchText,
                searchInMessagesError: []
            }
        case SEARCH_MESSAGES_SUCCESS:
            return {
                ...state,
                searchText: action.payload.text,
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