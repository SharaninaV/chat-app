import {loginFailure, loginRequest, loginSuccess} from "./actions";
import { put, call, takeLatest} from "redux-saga/effects"
import {FETCH_LOGIN_REQUEST} from "./types";

export function* authSaga() {
    try {
        yield put(loginRequest())
        const data = yield call(() => fetch('C:\\PROJECTS\\noorsoft-internship\\src\\json.json'))
        yield put(loginSuccess(data))
        console.log(data)
    } catch (error) {
        yield put(loginFailure())
        console.log('err')
    }
}

export function* authSagaWatcher() {
    yield takeLatest(FETCH_LOGIN_REQUEST, loginRequest)
}