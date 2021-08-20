import {
    SWITCH_QUEUED,
    SWITCH_FINISHED,
    SWITCH_SAVED,
    SWITCH_ACTIVE,
} from './types'

export const switchQueued = () => ({ type: SWITCH_QUEUED })
export const switchActive = () => ({ type: SWITCH_ACTIVE })
export const switchFinished = () => ({ type: SWITCH_FINISHED })
export const switchSaved = () => ({ type: SWITCH_SAVED })
