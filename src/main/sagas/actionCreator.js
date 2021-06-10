import {TOKEN_IS_VALID, TOKEN_NOT_VALID} from './types'

export function setTokenIsValid() {

    return {
        type: TOKEN_IS_VALID
    }
}

export function setTokenNotValid() {

    return {
        type: TOKEN_NOT_VALID
    }
}