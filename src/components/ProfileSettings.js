import React from "react";
import ReactModal from 'react-modal'
import {Button, Form, FormGroup} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {hideSettings} from "../redux/profileSettings/actionCreator";

const ProfileSettings = (props) => {

    const dispatch = useDispatch()
    const handleHideSettings = event => {
        dispatch(hideSettings())
    }

    return (
        <ReactModal
            isOpen={props.isShowSettings}
            contentLabel={"Настройки диалогов"}
            portalClassName={"ReactModalPortal"}
        >
            <h2>Настройки профиля</h2>
            <Form>
                <FormGroup>
                    <Form.Label>Имя:</Form.Label>
                    <Form.Control type="text" placeholder=""/>
                </FormGroup>
                <FormGroup>
                    <Form.Label>Аватар:</Form.Label>
                    <Button>Загрузить новый</Button>
                </FormGroup>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Пароль:</Form.Label>
                    <Form.Control type="password" placeholder="" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Подтверждение пароля:</Form.Label>
                    <Form.Control type="password" placeholder="" />
                </Form.Group>
                <Button type="submit">Обновить профиль</Button>
            </Form>
            <Button onClick={handleHideSettings} style={{marginTop: "50px"}}>Закрыть</Button>
        </ReactModal>
    )
}

export {ProfileSettings}
