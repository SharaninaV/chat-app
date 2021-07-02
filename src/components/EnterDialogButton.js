import React from "react";
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchDialogsRequest} from "../redux/dialogs/actionCreator";
import {enterDialogRequest} from "../redux/enterDialog/actionCreator";
import {sendMessageRequest} from "../redux/sendMessage/actionCreator";
import {useHistory} from "react-router-dom";

export const EnterDialogButton = ({dialog}) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const operatorEmail = useSelector((state) => state.auth.email)
    const dialogsSettings = useSelector((state) => state.dialogsSettings.dialogsSettings)

    const operatorID = operatorEmail.split('@')[0]

    const handleEnterDialog = event => {
        dispatch(enterDialogRequest(dialog.key, operatorID))
        if (dialogsSettings.data.greeting) {
            const sentMessage = {
                content: dialogsSettings.data.greeting,
                timestamp: Date.now(),
                writtenBy: 'operator'
            }
            dispatch(sendMessageRequest(dialog.key, sentMessage))
        }
        dispatch(fetchDialogsRequest())
        history.push('/current/:' + dialog.key)
    }

    return(
        <Button onClick={handleEnterDialog}>Войти в диалог</Button>
    )
}
