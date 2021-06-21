import {DELETE_DIALOG_REQUEST, DELETE_DIALOG_SUCCESS, DELETE_DIALOG_FAILURE} from "./types";

export function deleteDialogRequest(key){
    return {
        type: DELETE_DIALOG_REQUEST,
        payload: {key}
    }
}

export const deleteDialogSuccess = () => ({type: DELETE_DIALOG_SUCCESS})

export function deleteDialogFailure(error) {
    return{
        type: DELETE_DIALOG_FAILURE,
        payload: {error}
    }
}