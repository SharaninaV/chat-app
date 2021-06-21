import {call, put, takeLatest} from "redux-saga/effects";
import {ENTER_DIALOG_REQUEST} from "./types";
import firebase from "../../firebase/firebase";
import {enterDialogFailure, enterDialogSuccess} from "./actionCreator";

function* enterDialogSaga(action) {
    try {
        const ref = firebase.database().ref('dialogs/' + action.payload.key)
        const operatorID = action.payload.operatorID
        yield call(() => ref.update({operatorID, status: 'active'}))
        yield put(enterDialogSuccess())
    } catch (error) {
        yield put(enterDialogFailure(error))
    }
}

function* enterDialogSagaWatcher(){
    yield takeLatest(ENTER_DIALOG_REQUEST, enterDialogSaga)
}

export default enterDialogSagaWatcher()
