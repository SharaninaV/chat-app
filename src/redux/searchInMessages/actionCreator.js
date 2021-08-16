import {
    SEARCH_MESSAGES_REQUEST,
    SEARCH_MESSAGES_SUCCESS,
    SEARCH_MESSAGES_FAILURE,
    IS_SEARCHING_MESSAGES,
    RESET_MESSAGES_FOUND,
} from './types'

export const setSearchMessages = (isSearching) => ({
    type: IS_SEARCHING_MESSAGES,
    payload: isSearching,
})

export const searchInMessagesRequest = (text) => ({
    type: SEARCH_MESSAGES_REQUEST,
    payload: { text },
})

export const searchInMessagesSuccess = ({ data }) => ({
    type: SEARCH_MESSAGES_SUCCESS,
    payload: { data },
})

export const searchInMessagesFailure = (error) => ({
    type: SEARCH_MESSAGES_FAILURE,
    payload: { error },
})

export const resetMessagesFound = () => ({ type: RESET_MESSAGES_FOUND })
