import AuthSaga from "../auth/sagas/authSaga";
import {all} from "redux-saga/effects"

export default function* rootSaga() {
    yield all([
        AuthSaga,
    ])
}