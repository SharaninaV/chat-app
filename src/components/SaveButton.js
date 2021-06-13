import React from "react";
import {Button} from "react-bootstrap";
import firebase from "../firebase/firebase";
import {useDispatch} from "react-redux";
import {searchInUsersRequest} from "../searchInUsers/actionCreator";

const SaveButton = props => {

    const dispatch = useDispatch()
    const changeDialogStatusToSave = (key) => {
        const ref = firebase.database().ref('dialogs/' + key)
        ref.update({status:'saved'}).then(dispatch(searchInUsersRequest('')))
    }

    const handleSave = event => {
        changeDialogStatusToSave(props.dialog.key)
    }

    return(
        <Button onClick={handleSave}>Сохранить</Button>
    )
}

export {SaveButton}