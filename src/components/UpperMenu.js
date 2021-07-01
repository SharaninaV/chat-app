import React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {LogOut} from "./LogOut";
import {ProfileSettings} from "./ProfileSettings";
import {fetchProfileDataRequest, showSettings} from "../redux/profileSettings/actionCreator";

export const UpperMenu = () => {

    const operatorEmail = useSelector((state) => state.auth.email)
    const isShowSettings = useSelector((state) => state.profileSettings.isShowSettings)
    const fetchedDialogs = useSelector((state) => state.fetchDialogs.fetchedDialogs)

    const dispatch = useDispatch()

    const queuedDialogsQuantity = fetchedDialogs.filter(dialog => dialog.data.status === 'queued').length
    const operatorID = operatorEmail.split('.')[0]

    const handleShowSettings = event => {
        dispatch(showSettings())
        dispatch(fetchProfileDataRequest(operatorID))
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h1>ChatApp</h1>
                </Col>
                <Col>
                    <Row>
                    <h3>{operatorEmail}</h3>
                    </Row>
                    <Row>
                        Количество диалогов в очереди: {queuedDialogsQuantity}
                    </Row>
                </Col>
                <Col>
                    <Button onClick={handleShowSettings}>Настройки</Button>
                </Col>
                <Col>
                    <LogOut />
                </Col>
            </Row>
            <ProfileSettings isShowSettings={isShowSettings}/>
        </Container>
    )
}
