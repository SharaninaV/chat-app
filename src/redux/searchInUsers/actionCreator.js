import {
    SEARCH_USERS_REQUEST,
    SEARCH_USERS_SUCCESS,
    SEARCH_USERS_FAILURE,
    IS_USER_SEARCHING,
    RESET_USERS_FOUND
} from "./types";

export function setSearchUsers(isSearching){
    return {
        type: IS_USER_SEARCHING,
        payload: isSearching
    }
}

export function searchInUsersRequest(text){
    return {
        type: SEARCH_USERS_REQUEST,
        payload: {text}
    }
}

export function searchInUsersSuccess({data}) {
    return {
        type: SEARCH_USERS_SUCCESS,
        payload: {data}
    }
}

export function searchInUsersFailure(error) {
    return{
        type: SEARCH_USERS_FAILURE,
        payload: {error}
    }
}

export function resetUsersFound() {
    return{
        type: RESET_USERS_FOUND
    }
}
