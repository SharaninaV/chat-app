import { ADD_MESSAGE, CLEAR_MESSAGE } from './types'

export const addMessage = (message) => ({
    type: ADD_MESSAGE,
    payload: message,
})

export const clearMessage = () => ({ type: CLEAR_MESSAGE })
