import {
    AUTH_COMPLETE,
    AUTH_ON_PROGRESS,
    FETCH_LOGIN_FAILURE,
    FETCH_LOGIN_REQUEST,
    FETCH_LOGIN_SUCCESS
} from "../sagas/types";

const initialState = {
    email: '',
    password: ''
}

export const authFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LOGIN_REQUEST: return
        case FETCH_LOGIN_SUCCESS: return
        case FETCH_LOGIN_FAILURE: return
        case AUTH_ON_PROGRESS: return
        case AUTH_COMPLETE: return
        default: return state
    }
}