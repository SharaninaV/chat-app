import {REGISTRATION_FAILURE, REGISTRATION_REQUEST, REGISTRATION_SUCCESS} from "./types";

export const registrationRequest = ({email,password,name}) => ({type: REGISTRATION_REQUEST, payload:{email, password, name}})
export const registrationSuccess = (data) => ({type: REGISTRATION_SUCCESS, payload: {data}})
export const registrationFailure = (error) => ({type: REGISTRATION_FAILURE, error: error})
