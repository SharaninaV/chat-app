import {FETCH_DIALOGS_REQUEST, FETCH_DIALOGS_FAILURE, FETCH_DIALOGS_SUCCESS} from "./types";

const initialState = {
    fetchedDialogs: [],
    fetchDialogsErrors: [],
    areDialogsFetched: false
}

export const fetchDialogsReducer = (state= initialState, action)  => {
    switch (action.type) {
        case FETCH_DIALOGS_REQUEST: return state
        case FETCH_DIALOGS_SUCCESS: return {...state, fetchedDialogs: action.payload.data, areDialogsFetched: true}
        case FETCH_DIALOGS_FAILURE: return {...state, fetchDialogsErrors: action.error}
        default: return state
    }
}