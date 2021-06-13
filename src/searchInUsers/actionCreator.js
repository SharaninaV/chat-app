import {SEARCH_USERS_REQUEST, SEARCH_USERS_SUCCESS, SEARCH_USERS_FAILURE} from "./types";

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