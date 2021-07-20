import React from "react";
import {Col, Container, ListGroup, Row} from "react-bootstrap";
import moment from "moment";
import {useSelector} from "react-redux";
import {EnterDialogButton} from "./EnterDialogButton";

export const QueuedDialogs = () => {

    const fetchedDialogs = useSelector((state) => state.fetchDialogs.fetchedDialogs)

    const queuedDialogs = fetchedDialogs.filter(dialog => dialog.data.status === 'queued')

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


    return (
        <ListGroup className="dialogs">
            {queuedDialogs.length > 0 ?
                (queuedDialogs.map(dialog => (
                        <ListGroup.Item>
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
                                        <EnterDialogButton dialog={dialog}/>
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
