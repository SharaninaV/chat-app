import AuthSaga from "../auth/sagas/authSaga";
import {all} from "redux-saga/effects"
import SearchInUsersSaga from "../searchInUsers/searchInUsersSaga";
import SearchInMessagesSaga from "../searchInMessages/searchInMessagesSaga";

export default function* rootSaga() {
    yield all([
        AuthSaga,
        SearchInUsersSaga,
        SearchInMessagesSaga
    ])
}