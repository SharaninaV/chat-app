import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {AuthWindow} from "./components/AuthWindow";
import {Main} from "./components/Main";
import {connect} from "react-redux";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

const App = (isLoggedIn) => {

    return (
        <BrowserRouter>
            <Route>
                {isLoggedIn &&
                    <Redirect to="/main"/>}
            </Route>

            <Switch>
                <Route exact path="/" component={AuthWindow}/>
                <Route exact path="/main" component={Main} />
            </Switch>
        </BrowserRouter>
    );
}

const mapStateToProps = state => {
    return {
        isLoggedIn: !state.auth.requesting && state.auth.successful
    }
}

export default connect(mapStateToProps, null)(App);
