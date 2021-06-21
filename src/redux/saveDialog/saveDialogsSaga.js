import {call, put, takeLatest} from "redux-saga/effects";
import {SAVE_DIALOG_REQUEST} from "./types";
import firebase from "../../firebase/firebase";
import {saveDialogFailure, saveDialogSuccess} from "./actionCreator";

function* saveDialogSaga(action) {
    try {
        const ref = firebase.database().ref('dialogs/' + action.payload.key)
        yield call(() => ref.update({saved: true}))
        yield put(saveDialogSuccess())
    } catch (error) {
        yield put(saveDialogFailure(error))
    }
}

function* saveDialogSagaWatcher(){
    yield takeLatest(SAVE_DIALOG_REQUEST, saveDialogSaga)
}

export default saveDialogSagaWatcher()
