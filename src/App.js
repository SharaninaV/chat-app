import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';
import {AuthWindow} from "./components/AuthWindow";
import {Main} from "./components/Main";
import {ShowDialog} from "./components/ShowDialog";
import {Registration} from "./components/Registration";
import {ForgotPassword} from "./components/ForgotPassword";

const App = () => {

    return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={AuthWindow}/>
                    <Route exact path="/main" component={Main}/>
                    <Route path="/current" component={ShowDialog}/>
                    <Route path="/registration" component={Registration}/>
                    {/*<Route path="/"*/}
                    <Route path="/forgotPassword" component={ForgotPassword}/>
                </Switch>
            </BrowserRouter>
    );
}

export default App
