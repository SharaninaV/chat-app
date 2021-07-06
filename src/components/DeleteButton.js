import React from "react";
import {Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {deleteDialogRequest} from "../redux/deleteDialog/actionCreator";
import {fetchDialogsRequest} from "../redux/dialogs/actionCreator";

export const DeleteButton = (props) => {

    const dispatch = useDispatch()
    const handleDelete = event => {
        dispatch(deleteDialogRequest(props.dialog.key))
        dispatch(fetchDialogsRequest())
        event.stopPropagation()
    }

    return(
        <Button variant="danger" onClick={handleDelete}>Удалить из сохраненных</Button>
    )
}
