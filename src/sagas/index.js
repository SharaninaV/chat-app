import {authSaga} from "./authSaga";
import { all,call } from "redux-saga/effects"

export default function* rootSaga() {
    yield all([
        call(authSaga)
    ])
}