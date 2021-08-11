import {SEND_RESET_EMAIL_FAILURE, SEND_RESET_EMAIL_REQUEST, SEND_RESET_EMAIL_SUCCESS} from "./types";

export const sendResetEmailRequest = (email) => ({type: SEND_RESET_EMAIL_REQUEST, payload: {email}})
export const sendResetEmailSuccess = () => ({type: SEND_RESET_EMAIL_SUCCESS})
export const sendResetEmailFailure = (error) => ({type: SEND_RESET_EMAIL_FAILURE, payload: {error}})
