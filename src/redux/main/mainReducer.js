import {
    TOKEN_IS_VALID,
    TOKEN_NOT_VALID
} from "./sagas/types";

const initialState = {
    isTokenValid: false
}

export const mainReducer = (state = initialState, action) => {
    switch(action.type) {
        case TOKEN_IS_VALID: return {
            ...state, isTokenValid: true
        }
        case TOKEN_NOT_VALID: return {
            ...state, isTokenValid: false
        }
        default: return state
    }
}