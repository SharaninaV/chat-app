import {call, put, takeLatest} from "redux-saga/effects";
import {DELETE_DIALOG_REQUEST} from "./types";
import firebase from "../../firebase/firebase";
import {deleteDialogFailure, deleteDialogSuccess} from "./actionCreator";

function* deleteDialogSaga(action) {
    try {
        const ref = firebase.database().ref('dialogs/' + action.payload.key)
        yield call(() => ref.update({saved:false}))
        yield put(deleteDialogSuccess())
    } catch (error) {
        console.log(error)
        yield put(deleteDialogFailure(error))

    }
}

function* deleteDialogSagaWatcher(){
    yield takeLatest(DELETE_DIALOG_REQUEST, deleteDialogSaga)
}

export default deleteDialogSagaWatcher()
