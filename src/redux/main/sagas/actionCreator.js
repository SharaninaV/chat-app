import {TOKEN_IS_VALID, TOKEN_NOT_VALID} from './types'

export const setTokenIsValid = () => ({ type: TOKEN_IS_VALID })

export const setTokenNotValid = () => ({ type: TOKEN_NOT_VALID })