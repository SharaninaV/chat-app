import {call, put, takeLatest} from "redux-saga/effects";
import firebase from "../../../firebase/firebase";
import {updateAvatarFailure, updateAvatarSuccess} from "../actionCreator";
import {UPDATE_AVATAR_REQUEST} from "../types";

function* updateAvatarSaga(action) {

    try{
        const ref = yield call(() => firebase.database().ref('operators/' + action.payload.id))
        yield call(() => ref.update({avatar:action.payload.avatar}))
        yield put(updateAvatarSuccess())
        alert('Аватар успешно обновлен.')
    } catch(error) {
        yield put(updateAvatarFailure(error))
    }
}

function* updateAvatarSagaWatcher(){
    yield takeLatest(UPDATE_AVATAR_REQUEST, updateAvatarSaga)
}

export default updateAvatarSagaWatcher()