import React from "react";
import {Button} from "react-bootstrap";
import firebase from "../firebase/firebase";
import {fetchDialogsRequest} from "../dialogs/actionCreator";
import {useDispatch, useSelector} from "react-redux";

const EnterDialogButton = (props) => {

    const dispatch = useDispatch()
    const operatorID = useSelector((state) => state.auth.email).split('@')[0]
    const handleEnterDialog = event => {
            const ref = firebase.database().ref('dialogs/' + props.dialog.key)
            ref.update({operatorID:operatorID,status:'active'}).then(dispatch(fetchDialogsRequest()))
        }

    return(
        <Button onClick={handleEnterDialog}>Войти в диалог</Button>
    )
}

export {EnterDialogButton}
