import {call, put, takeLatest} from "redux-saga/effects";
import {SEARCH_MESSAGES_REQUEST} from "./types";
import firebase from "../../firebase/firebase";
import {
    searchInMessagesFailure,
    searchInMessagesSuccess
} from "./actionCreator";

function* searchInMessagesSaga(action) {
    try {
        const ref = yield call(() => firebase.database().ref('dialogs'))
        const messagesFound = yield call(() => ref.once('value').then(snapshot => {
            let result = []
            snapshot.forEach(childSnapshot => {
                Object.values(childSnapshot.val().messages).forEach(message => {
                    const content = message.content.toLowerCase()
                    if (content.includes(action.payload.text.toLowerCase())) {
                        result.push({user: childSnapshot.val().clientName, content: content})
                    }
                })
            })
            return result
        }))
        yield put(searchInMessagesSuccess({data: messagesFound}))
    } catch (error) {
        yield put(searchInMessagesFailure(error))
    }
}

function* searchInMessagesSagaWatcher(){
    yield takeLatest(SEARCH_MESSAGES_REQUEST, searchInMessagesSaga)
}

export default searchInMessagesSagaWatcher()
