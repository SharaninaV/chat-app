import React from "react";
import {Col, Container, ListGroup, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import moment from 'moment'
import 'moment/locale/ru'
import {useHistory} from "react-router-dom";
import {DeleteButton} from "./DeleteButton";

export const SavedDialogs = () => {

    const operatorEmail = useSelector((state) => state.auth.email)
    const fetchedDialogs = useSelector((state) => state.fetchDialogs.fetchedDialogs)

    const operatorID = operatorEmail.split('@')[0]
    const savedDialogs = fetchedDialogs.filter(dialog => dialog.data.saved === true && dialog.data.operatorID === operatorID)

    const history = useHistory()

    const getLastMessage = (dialog) => {
        let lastMessage = {content: '', writtenBy: ''}
        Object.values(dialog.data.messages).forEach(message => {
            if (message.timestamp === dialog.data.latestActivity) {
                lastMessage.writtenBy = message.writtenBy
                lastMessage.content = message.content
            }
        })
        return lastMessage
    }

    const handleShowDialog = (event) => {
        history.push('/current/:' + event.currentTarget.id)
    }

    return (
        <ListGroup className="dialogs">
            {savedDialogs.length > 0 ?
                (savedDialogs.map(dialog => (
                        <ListGroup.Item action onClick={handleShowDialog} id={dialog.key}>
                            <Container>
                                <Row>
                                    <Col>
                                        {dialog.data.clientName}
                                        <br/>
                                        ({moment(dialog.data.latestActivity).calendar()})
                                    </Col>
                                    <Col>
                                        {getLastMessage(dialog).writtenBy === 'operator' ?
                                            <p>Вы:</p> : <p>{dialog.data.clientName}:</p>}
                                        <p className="overflow-text">
                                            {getLastMessage(dialog).content}
                                        </p>
                                    </Col>
                                    <Col>
                                        <DeleteButton dialog={dialog}/>
                                    </Col>
                                </Row>
                            </Container>
                        </ListGroup.Item>

                    ))
                ) : (
                    <ListGroup.Item>
                        Диалогов не найдено
                    </ListGroup.Item>
                )}
        </ListGroup>
    )
}
