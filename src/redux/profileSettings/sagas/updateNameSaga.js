import {call, put, takeLatest} from "redux-saga/effects";
import firebase from "../../../firebase/firebase";
import {updateNameFailure, updateNameSuccess} from "../actionCreator";
import {UPDATE_NAME_REQUEST} from "../types";

function* updateNameSaga(action) {

    try{
        const ref = yield call(() => firebase.database().ref('operators/' + action.payload.id))
        console.log(action.payload)
        yield call(() => ref.update({name:action.payload.name}))
        yield put(updateNameSuccess())
    } catch(error) {
        yield put(updateNameFailure(error))
    }
}

function* updateNameSagaWatcher(){
    yield takeLatest(UPDATE_NAME_REQUEST, updateNameSaga)
}

export default updateNameSagaWatcher()