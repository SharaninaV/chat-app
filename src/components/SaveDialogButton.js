import React from "react";
import {Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {fetchDialogsRequest} from "../redux/dialogs/actionCreator";
import {saveDialogRequest} from "../redux/saveDialog/actionCreator";

export const SaveDialogButton = props => {

    const dispatch = useDispatch()

    const handleSave = event => {
        dispatch(saveDialogRequest(props.dialog.key))
        dispatch((fetchDialogsRequest()))
        event.stopPropagation()
    }

    return(
        <>
        {props.dialog.data.saved ?
            <Button disabled variant='success'>Сохранено</Button> :
        <Button onClick={handleSave}>
            Сохранить
        </Button>}
        </>
    )
}
