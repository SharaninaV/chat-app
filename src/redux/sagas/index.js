import {all} from "redux-saga/effects"
import AuthSaga from "../auth/sagas/authSaga";
import SearchInUsersSaga from "../searchInUsers/searchInUsersSaga";
import SearchInMessagesSaga from "../searchInMessages/searchInMessagesSaga";
import FetchDialogsSaga from '../dialogs/fetchDialogsSaga'
import DeleteDialogSaga from '../deleteDialog/deleteDialogsSaga'
import EnterDialogSaga from '../enterDialog/enterDialogsSaga'
import SaveDialogSaga from '../saveDialog/saveDialogsSaga'
import FetchCurrentDialogSaga from '../currentDialog/fetchCurrentDialogSaga'

export default function* rootSaga() {
    yield all([
        AuthSaga,
        SearchInUsersSaga,
        SearchInMessagesSaga,
        FetchDialogsSaga,
        DeleteDialogSaga,
        EnterDialogSaga,
        SaveDialogSaga,
        FetchCurrentDialogSaga
    ])
}
