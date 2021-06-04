import {loginFailure, loginSuccess} from "./actionCreator";
import { put, call, takeLatest} from "redux-saga/effects"
import {FETCH_LOGIN_REQUEST} from "./types";
import firebase from "../../firebase/firebase";

function* authSaga(action) {

    try {
        const data = yield call(() => firebase.auth().signInWithEmailAndPassword(action.payload.email,action.payload.password))
        yield put(loginSuccess(data))
    } catch (error) {
        yield put(loginFailure(error))
    }
}

function* authSagaWatcher() {
    yield takeLatest(FETCH_LOGIN_REQUEST, authSaga)
}

export default authSagaWatcher()