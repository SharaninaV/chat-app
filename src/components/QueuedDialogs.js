import React from "react";
import {Col, Container, ListGroup, Row} from "react-bootstrap";
import moment from "moment";
import {useSelector} from "react-redux";
import {EnterDialogButton} from "./EnterDialogButton";

const QueuedDialogs = () => {

    const queuedDialogs = useSelector((state) => state.fetchDialogs.fetchedDialogs)
        .filter(dialog => dialog.data.status === 'queued')

    const getLastMessage = (dialog) => {
        let lastMessage = {content: '', writtenBy: ''}
        console.log(lastMessage)
        dialog.data.messages.forEach(message => {
            if (message.timestamp === dialog.data.latestActivity) {
                lastMessage.writtenBy = message.writtenBy
                if (message.content.length > 40) {
                    lastMessage.content = message.content.slice(0, 40) + '...'
                } else {
                    lastMessage.content = message.content
                }
            }
        })
        return lastMessage
    }


    return (
        <ListGroup>
            {queuedDialogs.length > 0 ?
                (queuedDialogs.map(dialog => (
                        <ListGroup.Item action>
                            <Container>
                                <Row>
                                    <Col>
                                        {dialog.key}
                                    </Col>
                                    <Col>
                                        {getLastMessage(dialog).writtenBy}: <br/>
                                        {getLastMessage(dialog).content}
                                    </Col>
                                    <Col>
                                        ({moment(dialog.data.latestActivity).locale('ru').format('LLL')})
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

export {QueuedDialogs}