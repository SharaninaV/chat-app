import {call, put, takeLatest} from "redux-saga/effects";
import firebase from "../../../firebase/firebase";
import {updateGreetingSuccess, updateGreetingFailure} from "../actionCreator";
import {UPDATE_GREETING_REQUEST} from "../types";

function* updateGreetingSaga(action) {

    try{
        const ref = yield call(() => firebase.database()
            .ref('operators/' + action.payload.id + '/dialogsSettings'))
        yield call(() => ref.set({greeting: action.payload.greeting}))
        yield put(updateGreetingSuccess())
    } catch(error) {
        yield put(updateGreetingFailure(error))
    }
}

function* updateGreetingSagaWatcher(){
    yield takeLatest(UPDATE_GREETING_REQUEST, updateGreetingSaga)
}

export default updateGreetingSagaWatcher()
