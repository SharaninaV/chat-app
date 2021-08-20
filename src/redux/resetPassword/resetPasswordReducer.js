import { RESET_PASSWORD_FAILURE, RESET_PASSWORD_SUCCESS } from './types'

const initialState = {
    isResetSuccessful: false,
}

export const resetPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_PASSWORD_SUCCESS:
            return { ...state, isResetSuccessful: true }
        case RESET_PASSWORD_FAILURE:
            return { ...state, isResetSuccessful: false }
        default:
            return state
    }
}
