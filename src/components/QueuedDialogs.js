import React from 'react'
import { Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { EnterDialogButton } from './EnterDialogButton'

export const QueuedDialogs = () => {
    const fetchedDialogs = useSelector(
        (state) => state.fetchDialogs.fetchedDialogs,
    )

    const queuedDialogs = fetchedDialogs.filter(
        (dialog) => dialog.data.status === 'queued',
    )

    const getLastMessage = (dialog) => {
        let lastMessage = { content: '', writtenBy: '' }
        Object.values(dialog.data.messages).forEach((message) => {
            if (message.timestamp === dialog.data.latestActivity) {
                lastMessage.writtenBy = message.writtenBy
                lastMessage.content = message.content
            }
        })
        return lastMessage
    }

    return (
        <ListGroup className='dialogs'>
            {queuedDialogs.length > 0 ? (
                queuedDialogs.map((dialog) => (
                    <ListGroupItem className='list-item'>
                        <Container>
                            <Row>
                                <Col>
                                    {dialog.data.clientName}
                                    <br />(
                                    {moment(
                                        dialog.data.latestActivity,
                                    ).calendar()}
                                    )
                                </Col>
                                <Col>
                                    {getLastMessage(dialog).writtenBy ===
                                    'operator' ? (
                                        <div>Вы:</div>
                                    ) : (
                                        <div>{dialog.data.clientName}:</div>
                                    )}
                                    <div className='overflow-text'>
                                        {getLastMessage(dialog).content}
                                    </div>
                                </Col>
                                <Col md={2}>
                                    <EnterDialogButton dialog={dialog} />
                                </Col>
                            </Row>
                        </Container>
                    </ListGroupItem>
                ))
            ) : (
                <ListGroupItem className='list-item'>
                    Диалогов не найдено
                </ListGroupItem>
            )}
        </ListGroup>
    )
}
