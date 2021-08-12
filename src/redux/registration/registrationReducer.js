import {REGISTRATION_SUCCESS, REGISTRATION_FAILURE} from "./types";

const initialState = {
    isRegistrationSuccessful: false
}

export const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTRATION_SUCCESS:
            return {
                ...state, isRegistrationSuccessful: true
            }
        case REGISTRATION_FAILURE:
            return {
                ...state, isRegistrationSuccessful: false
            }
        default:
            return state
    }
}
