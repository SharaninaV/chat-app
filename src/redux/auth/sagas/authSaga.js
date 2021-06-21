import { put, call, takeLatest} from "redux-saga/effects"
import {loginFailure, loginSuccess} from "./actionCreator";
import {FETCH_LOGIN_REQUEST} from "./types";
import firebase from "../../../firebase/firebase";
import {setTokenIsValid} from "../../main/sagas/actionCreator";

function* authSaga(action) {

    try {
        const data = yield call(() => firebase.auth().signInWithEmailAndPassword(action.payload.email,action.payload.password))
        yield put(loginSuccess(data))
        yield put(setTokenIsValid())
    } catch (error) {
        yield put(loginFailure(error))
    }
}

function* authSagaWatcher() {
    yield takeLatest(FETCH_LOGIN_REQUEST, authSaga)
}

export default authSagaWatcher()