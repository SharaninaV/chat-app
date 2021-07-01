import React from "react";
import ReactModal from 'react-modal'
import {Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {hideDialogsSettings} from "../redux/dialogsSettings/actionCreator";

const DialogsSettings = ({isShowSettings}) => {

    const dispatch = useDispatch()

    const handleHideSettings = event => {
        dispatch(hideDialogsSettings())
    }

    return(
        <ReactModal
            isOpen={isShowSettings}
            contentLabel={"Настройки диалогов"}
            portalClassName={"ReactModalPortal"}
        >
            <Button onClick={handleHideSettings} style={{marginTop: "50px"}}>Закрыть</Button>
        </ReactModal>
    )
}

export {DialogsSettings}
