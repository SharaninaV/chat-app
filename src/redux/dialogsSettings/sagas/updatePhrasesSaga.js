import {call, put, takeLatest} from "redux-saga/effects";
import firebase from "../../../firebase/firebase";
import {updatePhrasesSuccess, updatePhrasesFailure} from "../actionCreator";
import {UPDATE_PHRASES_REQUEST} from "../types";

function* updatePhrasesSaga(action) {

    try{
        const ref = yield call(() => firebase.database()
            .ref('operators/' + action.payload.id + '/dialogsSettings'))
        yield call(() => ref.update({phrases: action.payload.phrases}))
        yield put(updatePhrasesSuccess())
    } catch(error) {
        yield put(updatePhrasesFailure(error))
    }
}

function* updatePhrasesSagaWatcher(){
    yield takeLatest(UPDATE_PHRASES_REQUEST, updatePhrasesSaga)
}

export default updatePhrasesSagaWatcher()
