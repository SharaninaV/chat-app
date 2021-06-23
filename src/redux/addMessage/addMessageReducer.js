import {ADD_MESSAGE} from "./types";

const initialState = {
    message: ''
}

export const addMessageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {...state, message: state.message + action.payload}
        default: return state
    }
}