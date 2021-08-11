import {call, put, takeLatest} from "redux-saga/effects";
import firebase from "../../firebase/firebase";
import {sendResetEmailFailure, sendResetEmailSuccess} from "./actionCreator";
import {SEND_RESET_EMAIL_REQUEST} from "./types";

function* sendResetEmailSaga(action) {

    try {
        console.log(action.payload.email)
        yield call(() => firebase.auth()
            .sendPasswordResetEmail(action.payload.email))

        yield put(sendResetEmailSuccess())
    } catch (error) {
        console.log(error)
        yield put(sendResetEmailFailure(error))
    }
}

function* sendResetEmailSagaWatcher() {
    yield takeLatest(SEND_RESET_EMAIL_REQUEST, sendResetEmailSaga)
}

export default sendResetEmailSagaWatcher()
