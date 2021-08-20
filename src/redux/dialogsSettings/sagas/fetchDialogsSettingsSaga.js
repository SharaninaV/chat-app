import { call, put, takeLatest } from 'redux-saga/effects'
import firebase from '../../../firebase/firebase'
import {
    fetchDialogsSettingsSuccess,
    fetchDialogsSettingsFailure,
} from '../actionCreator'
import { FETCH_DIALOGS_SETTINGS_REQUEST } from '../types'

function* fetchDialogsSettingsSaga(action) {
    try {
        const ref = yield call(() =>
            firebase
                .database()
                .ref('operators/' + action.id + '/dialogsSettings')
        )
        const data = yield call(() =>
            ref.once('value').then((snapshot) => {
                return { key: snapshot.key, data: snapshot.val() }
            })
        )
        yield put(fetchDialogsSettingsSuccess(data))
    } catch (error) {
        yield put(fetchDialogsSettingsFailure(error))
    }
}

function* fetchDialogsSettingsSagaWatcher() {
    yield takeLatest(FETCH_DIALOGS_SETTINGS_REQUEST, fetchDialogsSettingsSaga)
}

export default fetchDialogsSettingsSagaWatcher()
