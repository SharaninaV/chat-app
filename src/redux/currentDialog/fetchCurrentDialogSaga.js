import { call, put, takeLatest } from 'redux-saga/effects'
import firebase from '../../firebase/firebase'
import {
    fetchCurrentDialogFailure,
    fetchCurrentDialogSuccess,
} from './actionCreator'
import { FETCH_CURRENT_DIALOG_REQUEST } from './types'

function* fetchCurrentDialogSaga(action) {
    try {
        const ref = yield call(() =>
            firebase.database().ref('dialogs/' + action.payload.key)
        )
        const fetchedMessages = yield call(() =>
            ref
                .orderByChild('/timestamp')
                .once('value')
                .then((snapshot) => snapshot.val())
        )
        yield put(fetchCurrentDialogSuccess(fetchedMessages))
    } catch (error) {
        yield put(fetchCurrentDialogFailure(error))
    }
}

function* fetchCurrentDialogSagaWatcher() {
    yield takeLatest(FETCH_CURRENT_DIALOG_REQUEST, fetchCurrentDialogSaga)
}

export default fetchCurrentDialogSagaWatcher()
