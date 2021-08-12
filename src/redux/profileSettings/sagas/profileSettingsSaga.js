import {call, put, takeLatest} from "redux-saga/effects";
import firebase from "../../../firebase/firebase";
import {fetchProfileDataSuccess, fetchProfileDataFailure} from "../actionCreator";
import {PROFILE_DATA_REQUEST} from "../types";

function* fetchProfileDataSaga(action) {

    try{
        const ref = yield call(() => firebase.database().ref('operators/' + action.id))
        const fetchedData = yield call(() => ref.once('value').then(snapshot => {
            return {key:snapshot.key, data:snapshot.val()}
        }))
        yield put(fetchProfileDataSuccess(fetchedData))
    } catch(error) {
        yield put(fetchProfileDataFailure(error))
    }
}

function* fetchProfileDataSagaWatcher(){
    yield takeLatest(PROFILE_DATA_REQUEST, fetchProfileDataSaga)
}

export default fetchProfileDataSagaWatcher()
