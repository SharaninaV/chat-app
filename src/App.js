import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';
import {AuthWindow} from "./components/AuthWindow";
import {Main} from "./components/Main";

const App = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={AuthWindow}/>
                <Route exact path="/main" component={Main} />
            </Switch>
        </BrowserRouter>
    );
}

export default App
