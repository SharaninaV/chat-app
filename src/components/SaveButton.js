import React from "react";
import {Button} from "react-bootstrap";
import firebase from "../firebase/firebase";
import {useDispatch} from "react-redux";
import {searchInUsersRequest} from "../searchInUsers/actionCreator";

const SaveButton = props => {

    const dispatch = useDispatch()
    let saved = false
    const changeDialogStatusToSave = (key) => {
        const ref = firebase.database().ref('dialogs/' + key)
        ref.update({saved:true}).then(dispatch(searchInUsersRequest('')))
    }

    const handleSave = event => {
        changeDialogStatusToSave(props.dialog.key)
    }

    return(
        <>
        {props.dialog.data.saved ?
            <Button disabled variant={'success'}>Сохранено</Button> :
        <Button onClick={handleSave}>
            Сохранить
        </Button>}
        </>
    )
}

export {SaveButton}