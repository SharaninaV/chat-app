import { call, put, takeLatest } from 'redux-saga/effects'
import firebase from '../../firebase/firebase'

import { RESET_PASSWORD_REQUEST } from './types'
import { resetPasswordFailure, resetPasswordSuccess } from './actionCreator'

function* resetPasswordSaga(action) {
    try {
        yield call(() =>
            firebase
                .auth()
                .confirmPasswordReset(
                    action.payload.code,
                    action.payload.password
                )
        )
        yield put(resetPasswordSuccess())
    } catch (error) {
        console.log(error)
        yield put(resetPasswordFailure(error))
    }
}

function* resetPasswordSagaWatcher() {
    yield takeLatest(RESET_PASSWORD_REQUEST, resetPasswordSaga)
}

export default resetPasswordSagaWatcher()
