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
    errors: [],
    token: {}
}

export const authFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LOGIN_REQUEST: return {...state,
            email: action.payload.email,
            password: action.payload.password,
            requesting: true,
            successful: false,
            errors: [],
            token: {}
        }
        case FETCH_LOGIN_SUCCESS: return {...state,
            requesting: false,
            successful: true,
            errors: [],
            token: action.payload.payload.user.getIdToken()
        }
        case FETCH_LOGIN_FAILURE: return {...state,
            requesting: false,
            successful: false,
            errors: action.payload.error,
            token: {}
        }
        default: return state
    }
}