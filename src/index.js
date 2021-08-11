import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./redux/sagas/rootReducer";
import {Provider} from "react-redux";
import createSagaMiddleware from "redux-saga"
import {composeWithDevTools} from "redux-devtools-extension";
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from "redux-persist";
import {PersistGate} from "redux-persist/integration/react";
import rootSaga from "./redux/sagas";
import App from './App';
import './index.css';
import {Container} from "react-bootstrap";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth','main']
}
const middleware = []
const enhancers = []

const saga = createSagaMiddleware()
middleware.push(saga)

enhancers.push(applyMiddleware(...middleware))

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, composeWithDevTools(...enhancers))
const persistor = persistStore(store)



saga.run(rootSaga)

const app = (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Container className="app">
            <App />
                <ToastContainer />
            </Container>
        </PersistGate>
    </Provider>
)

ReactDOM.render(
    app, document.getElementById('root')
);

reportWebVitals();
