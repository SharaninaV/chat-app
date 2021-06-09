import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./sagas/rootReducer";
import {Provider} from "react-redux";
import createSagaMiddleware from "redux-saga"
import rootSaga from "./sagas";
import {composeWithDevTools} from "redux-devtools-extension";
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from "redux-persist";
import {PersistGate} from "redux-persist/integration/react";

const persistConfig = {
    key: 'root',
    storage
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
            <App/>
        </PersistGate>
    </Provider>
)

ReactDOM.render(
    app, document.getElementById('root')
);

reportWebVitals();
