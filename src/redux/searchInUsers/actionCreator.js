import {
    SEARCH_USERS_REQUEST,
    SEARCH_USERS_SUCCESS,
    SEARCH_USERS_FAILURE,
    IS_USER_SEARCHING,
    RESET_USERS_FOUND,
} from './types'

export const setSearchUsers = (isSearching) => ({
    type: IS_USER_SEARCHING,
    payload: isSearching,
})

export const searchInUsersRequest = (text) => ({
    type: SEARCH_USERS_REQUEST,
    payload: { text },
})

export const searchInUsersSuccess = ({ data }) => ({
    type: SEARCH_USERS_SUCCESS,
    payload: { data },
})

export const searchInUsersFailure = (error) => ({
    type: SEARCH_USERS_FAILURE,
    payload: { error },
})

export const resetUsersFound = () => ({
    type: RESET_USERS_FOUND,
})
