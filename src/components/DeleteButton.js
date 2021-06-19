import React from "react";
import {Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import firebase from "../firebase/firebase";
import {fetchDialogsRequest} from "../redux/dialogs/actionCreator";

export const DeleteButton = (props) => {

    const dispatch = useDispatch()
    const deleteSavedStatus = (key) => {
        const ref = firebase.database().ref('dialogs/' + key)
        ref.update({saved:false}).then(dispatch(fetchDialogsRequest()))
    }
    const handleDelete = event => {
        console.log(props.dialog.key)
        deleteSavedStatus(props.dialog.key)
    }

    return(
        <Button variant="danger" onClick={handleDelete}>Удалить из сохраненных</Button>
    )
}
