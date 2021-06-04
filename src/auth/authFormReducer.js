import {
    FETCH_LOGIN_FAILURE,
    FETCH_LOGIN_REQUEST,
    FETCH_LOGIN_SUCCESS
} from "./sagas/types";

const initialState = {
    email: '',
    password: '',
    requesting: false,
    successful: false,
    errors: []
}

export const authFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LOGIN_REQUEST: return {
            email: action.payload.email,
            password: action.payload.password,
            requesting: true,
            successful: false,
            errors: []
        }
        case FETCH_LOGIN_SUCCESS: return {
            requesting: false,
            successful: true,
            errors: []
        }
        case FETCH_LOGIN_FAILURE: return {
            requesting: false,
            successful: false,
            errors: action.payload.error
        }
        default: return state
    }
}