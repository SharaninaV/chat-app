import {call, put, takeLatest} from "redux-saga/effects";
import {SEARCH_USERS_REQUEST} from "./types";
import firebase from "../../firebase/firebase";
import {searchInUsersFailure, searchInUsersSuccess} from "./actionCreator";

function* searchInUsersSaga(action) {
    try {
        const ref = yield call(() => firebase.database().ref('dialogs'))
        const usersFound = yield call(() => ref.once('value').then(snapshot => {
            let result = []
            snapshot.forEach(childSnapshot => {
                if (childSnapshot.key.toLowerCase().includes(action.payload.text.toLowerCase())) {
                    result.push({user:childSnapshot.key, data:childSnapshot.val()})
                }
            })
            return result
        }))
        yield put(searchInUsersSuccess({data: usersFound}))
    } catch (error) {
        yield put(searchInUsersFailure(error))
    }
}

function* searchInUsersSagaWatcher(){
    yield takeLatest(SEARCH_USERS_REQUEST, searchInUsersSaga)
}

export default searchInUsersSagaWatcher()
