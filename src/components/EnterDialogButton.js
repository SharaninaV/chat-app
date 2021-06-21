import React from "react";
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchDialogsRequest} from "../redux/dialogs/actionCreator";
import {enterDialogRequest} from "../redux/enterDialog/actionCreator";

export const EnterDialogButton = (props) => {

    const dispatch = useDispatch()
    const operatorEmail = useSelector((state) => state.auth.email)

    const operatorID = operatorEmail.split('@')[0]

    const handleEnterDialog = event => {
        dispatch(enterDialogRequest(props.dialog.key, operatorID))
        dispatch(fetchDialogsRequest())
    }

    return(
        <Button onClick={handleEnterDialog}>Войти в диалог</Button>
    )
}
