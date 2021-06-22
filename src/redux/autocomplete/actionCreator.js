import {AUTOCOMPLETE_ADD_MESSAGE} from "./types";


export function autocompleteAddMessage(message) {
    return {
        type: AUTOCOMPLETE_ADD_MESSAGE,
        payload: message
    }
}