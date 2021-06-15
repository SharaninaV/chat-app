import {call, put, takeLatest} from "redux-saga/effects";
import firebase from "../firebase/firebase";
import {fetchDialogsFailure, fetchDialogsSuccess} from "./actionCreator";
import {FETCH_DIALOGS_REQUEST} from "./types";

function* fetchDialogsSaga(action) {

    try{
        const ref = yield call(() => firebase.database().ref('dialogs'))
        const fetchedDialogs = yield call(() => ref.orderByKey().once('value').then(snapshot => {
            const result = []
            snapshot.forEach(childSnapshot => {
                result.push({key:childSnapshot.key, data:childSnapshot.val()})
            })
            return result
        }))
        yield put(fetchDialogsSuccess(fetchedDialogs))
    } catch(error) {
        yield put(fetchDialogsFailure(error))
    }
}

function* fetchDialogsSagaWatcher(){
    yield takeLatest(FETCH_DIALOGS_REQUEST, fetchDialogsSaga)
}

export default fetchDialogsSagaWatcher()