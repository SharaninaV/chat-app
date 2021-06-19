import React from "react";
import {Col, Container, ListGroup, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import moment from 'moment'
import 'moment/locale/ru'
import {DeleteButton} from "./DeleteButton";

const SavedDialogs = () => {

    const operatorID = useSelector((state) => state.auth.email)
        .split('@')[0]
    const savedDialogs = useSelector((state) => state.fetchDialogs.fetchedDialogs)
        .filter(dialog => dialog.data.saved === true && dialog.data.operatorID === operatorID)

    const getLastMessage = (dialog) => {
        let lastMessage = {content: '', writtenBy: ''}
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

            {savedDialogs.length > 0 ?
                (savedDialogs.map(dialog => (

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

export {SavedDialogs}