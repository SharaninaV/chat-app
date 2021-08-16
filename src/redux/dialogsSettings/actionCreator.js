import {
    SHOW_DIALOGS_SETTINGS,
    HIDE_DIALOGS_SETTINGS,
    FETCH_DIALOGS_SETTINGS_REQUEST,
    FETCH_DIALOGS_SETTINGS_SUCCESS,
    FETCH_DIALOGS_SETTINGS_FAILURE,
    UPDATE_PHRASES_REQUEST,
    UPDATE_PHRASES_FAILURE,
    UPDATE_PHRASES_SUCCESS,
    UPDATE_GREETING_REQUEST,
    UPDATE_GREETING_SUCCESS,
    UPDATE_GREETING_FAILURE,
    RESET_DIALOGS_UPDATED_STATE,
} from './types'

export const showDialogsSettings = () => ({ type: SHOW_DIALOGS_SETTINGS })
export const hideDialogsSettings = () => ({ type: HIDE_DIALOGS_SETTINGS })

export const fetchDialogsSettingsRequest = (id) => ({
    type: FETCH_DIALOGS_SETTINGS_REQUEST,
    id,
})

export function fetchDialogsSettingsSuccess(data) {
    return {
        type: FETCH_DIALOGS_SETTINGS_SUCCESS,
        payload: { data },
    }
}

export function fetchDialogsSettingsFailure(error) {
    return {
        type: FETCH_DIALOGS_SETTINGS_FAILURE,
        payload: { error },
    }
}

export const updatePhrasesRequest = (phrases, id) => ({
    type: UPDATE_PHRASES_REQUEST,
    payload: { phrases, id },
})

export const updatePhrasesSuccess = () => ({ type: UPDATE_PHRASES_SUCCESS })

export function updatePhrasesFailure(error) {
    return {
        type: UPDATE_PHRASES_FAILURE,
        payload: { error },
    }
}

export const updateGreetingRequest = (greeting, id) => ({
    type: UPDATE_GREETING_REQUEST,
    payload: { greeting, id },
})

export const updateGreetingSuccess = () => ({ type: UPDATE_GREETING_SUCCESS })

export function updateGreetingFailure(error) {
    return {
        type: UPDATE_GREETING_FAILURE,
        payload: { error },
    }
}

export const resetDialogsUpdatedState = () => ({
    type: RESET_DIALOGS_UPDATED_STATE,
})
