import { call, put, takeLatest } from 'redux-saga/effects'
import firebase from '../../firebase/firebase'
import { loginRequest } from '../auth/sagas/actionCreator'
import { registrationFailure } from './actionCreator'
import { REGISTRATION_REQUEST } from './types'

function* registrationSaga(action) {
    try {
        yield call(() =>
            firebase
                .auth()
                .createUserWithEmailAndPassword(
                    action.payload.email,
                    action.payload.password
                )
        )
        const operatorID = action.payload.email
        const ref = firebase
            .database()
            .ref('operators/' + window.btoa(operatorID))
        const newOperator = {
            avatar: 'https://tatcar.ru/assets/img/avatar1.png',
            name: action.payload.name,
            dialogsSettings: {
                greeting: '',
                phrases: 'empty',
            },
        }
        yield call(() => ref.set(newOperator))
        yield put(
            loginRequest({
                email: action.payload.email,
                password: action.payload.password,
            })
        )
    } catch (error) {
        yield put(registrationFailure(error))
    }
}

function* registrationSagaWatcher() {
    yield takeLatest(REGISTRATION_REQUEST, registrationSaga)
}

export default registrationSagaWatcher()
