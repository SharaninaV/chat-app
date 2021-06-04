import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./sagas/rootReducer";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga"
import rootSaga from "./sagas";

const saga = createSagaMiddleware()

const store = createStore(rootReducer, compose(
    applyMiddleware(saga),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

saga.run(rootSaga)

const app = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(
    app, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
