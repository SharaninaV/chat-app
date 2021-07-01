import {call, put, takeLatest} from "redux-saga/effects";
import firebase from "../../../firebase/firebase";
import {updatePasswordFailure, updatePasswordSuccess} from "../actionCreator";
import {UPDATE_PASSWORD_REQUEST} from "../types";
import {logOut} from "../../auth/sagas/actionCreator";

function* updatePasswordSaga(action) {

    try {
        const currentUser = yield call(() => firebase.auth().currentUser)
        yield call(() => currentUser.updatePassword(action.payload.newPassword))
        yield put(updatePasswordSuccess())
    } catch (error) {
        switch (error.code) {
            case "auth/requires-recent-login": {
                alert("Пароль успешно изменен! Войдите в систему с новым паролем.")
                yield put(logOut())
                return
            }
            default:
                yield put(updatePasswordFailure(error))
        }
        yield put(updatePasswordFailure(error))
    }
}
function* updatePasswordSagaWatcher(){
    yield takeLatest(UPDATE_PASSWORD_REQUEST, updatePasswordSaga)
}

export default updatePasswordSagaWatcher()