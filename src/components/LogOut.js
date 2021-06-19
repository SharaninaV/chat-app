import React from "react";
import {Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {logOut} from "../redux/auth/sagas/actionCreator";
import {setTokenNotValid} from "../redux/main/sagas/actionCreator";

const LogOut = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const handleLogOut = event => {
        dispatch(logOut())
        dispatch(setTokenNotValid())
        history.push("/")
    }
    return(
    <Button variant="danger" onClick={handleLogOut}>Выйти</Button>
    )
}
export {LogOut}
