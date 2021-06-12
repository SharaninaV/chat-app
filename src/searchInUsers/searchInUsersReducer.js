import {SEARCH_USERS_FAILURE, SEARCH_USERS_REQUEST, SEARCH_USERS_SUCCESS} from "./types";


const initialState = {
    searchText: '',
    usersFound: [],
    searchInUsersError: []
}

export const searchInUsersReducer = (state = initialState, action) => {
    switch (action.type) {
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
        default:
            return state
    }
}