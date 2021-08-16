import { call, put, takeLatest } from 'redux-saga/effects'
import { smAuthFailure, smAuthSuccess } from './actionCreator'
import { SM_AUTH_REQUEST } from './types'
import firebase from '../../../firebase/firebase'
import { setTokenIsValid } from '../../main/sagas/actionCreator'

function* smAuthSaga(action) {
    try {
        const user = yield call(() => {
            return firebase
                .auth()
                .signInWithPopup(action.payload.provider)
                .then((response) => {
                    return response.user
                })
        })
        const operatorID = user.email
        const operatorName = user.displayName.split(' ')[0]
        const newOperator = {
            avatar: 'https://tatcar.ru/assets/img/avatar1.png',
            name: operatorName,
            dialogsSettings: {
                greeting: '',
                phrases: [],
            },
        }
        const ref = firebase
            .database()
            .ref('operators/' + window.btoa(operatorID))
        yield call(() => ref.set(newOperator))
        yield put(smAuthSuccess(user))
        yield put(setTokenIsValid())
    } catch (error) {
        yield put(smAuthFailure(error))
    }
}

function* smAuthSagaWatcher() {
    yield takeLatest(SM_AUTH_REQUEST, smAuthSaga)
}

export default smAuthSagaWatcher()
