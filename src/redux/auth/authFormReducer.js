import {
    FETCH_LOGIN_FAILURE,
    FETCH_LOGIN_REQUEST,
    FETCH_LOGIN_SUCCESS,
    LOG_OUT, RESET_AUTH_FORM, SM_AUTH_FAILURE, SM_AUTH_SUCCESS
} from "./sagas/types";

const initialState = {
    email: '',
    password: '',
    requesting: false,
    successful: false,
    errors: [],
    token: {}
}

export const authFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LOGIN_REQUEST:
            return {
                ...state,
                email: action.payload.email,
                password: action.payload.password,
                requesting: true,
                successful: false,
                errors: [],
                token: {}
            }
        case FETCH_LOGIN_SUCCESS:
            return {
                ...state,
                requesting: false,
                successful: true,
                errors: [],
                token: action.payload.payload.user.getIdToken()
            }
        case FETCH_LOGIN_FAILURE:
            return {
                ...state,
                requesting: false,
                successful: false,
                errors: action.payload.error,
                token: {}
            }
        case RESET_AUTH_FORM:
            return {
                ...state,
                email: '',
                password: '',
                requesting: false,
                successful: false,
                errors: [],
                token: {}
            }
        case LOG_OUT:
            return {
                ...state,
                email: '',
                password: '',
                requesting: false,
                successful: false,
                errors: [],
                token: {}
            }
        case SM_AUTH_SUCCESS:
            return {
                ...state,
                email: action.payload.user.email,
                successful: true,
                token: action.payload.user.token
            }
        case SM_AUTH_FAILURE:
            return {
                ...state,
                errors: action.payload.error
            }
        default:
            return state
    }
}
