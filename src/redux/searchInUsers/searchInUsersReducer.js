import {
    IS_USER_SEARCHING,
    RESET_USERS_FOUND,
    SEARCH_USERS_FAILURE,
    SEARCH_USERS_REQUEST,
    SEARCH_USERS_SUCCESS
} from "./types";


const initialState = {
    searchText: '',
    usersFound: [],
    searchInUsersError: [],
    isUserSearching: false
}

export const searchInUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_USER_SEARCHING:
            return {
                ...state,
                isUserSearching: action.payload
            }
        case SEARCH_USERS_REQUEST:
            return {
                ...state,
                searchText: action.payload.searchText,
                searchInUsersError: []
            }
        case SEARCH_USERS_SUCCESS:
            return {
                ...state,
                searchText: action.payload.text,
                usersFound: action.payload.data,
                searchInUsersError: []
            }
        case SEARCH_USERS_FAILURE:
            return {
                ...state,
                searchText: [],
                usersFound: [],
                searchInUsersError: action.payload.error
            }
        case RESET_USERS_FOUND:
            return {
                ...state,
                usersFound: []
            }
        default:
            return state
    }
}
