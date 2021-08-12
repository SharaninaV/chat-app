import {RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE} from "./types";

export const resetPasswordRequest = (code, password) => ({type: RESET_PASSWORD_REQUEST, payload: {code, password}})
export const resetPasswordSuccess = () => ({type: RESET_PASSWORD_SUCCESS})
export const resetPasswordFailure = (error) => ({type: RESET_PASSWORD_FAILURE, payload: error})
