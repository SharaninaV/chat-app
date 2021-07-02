import {
    FETCH_CURRENT_DIALOG_REQUEST,
    FETCH_CURRENT_DIALOG_FAILURE,
    FETCH_CURRENT_DIALOG_SUCCESS
} from "./types";

const initialState = {
    currentDialog: [],
    fetchCurrentDialogErrors: []
}

export const fetchCurrentDialogReducer = (state= initialState, action)  => {
    switch (action.type) {
        case FETCH_CURRENT_DIALOG_REQUEST: return state
        case FETCH_CURRENT_DIALOG_SUCCESS: return {...state, currentDialog: action.payload.data, continueRefresh: true}
        case FETCH_CURRENT_DIALOG_FAILURE: return {...state, fetchCurrentDialogErrors: action.error}
        default: return state
    }
}