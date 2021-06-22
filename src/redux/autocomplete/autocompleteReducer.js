import {AUTOCOMPLETE_ADD_MESSAGE} from "./types";

const initialState = {
    message: ''
}

export const autocompleteReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTOCOMPLETE_ADD_MESSAGE:
            return {...state, message: state.message + action.payload}
        default: return state
    }
}