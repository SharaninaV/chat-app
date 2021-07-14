import {SWITCH_ACTIVE, SWITCH_FINISHED, SWITCH_QUEUED, SWITCH_SAVED} from "./types";


const initialState = {
    filter: 'queued'
}

export const leftMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case SWITCH_QUEUED: return {...state, filter: 'queued'}
        case SWITCH_ACTIVE: return {...state, filter: 'active'}
        case SWITCH_FINISHED: return {...state, filter: 'finished'}
        case SWITCH_SAVED: return {...state, filter: 'saved'}
        default: return state
    }
}
