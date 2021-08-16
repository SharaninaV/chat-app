import React from 'react'
import { Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap'
import { useSelector } from 'react-redux'
import moment from 'moment'
import 'moment/locale/ru'
import { useHistory } from 'react-router-dom'
import { SaveDialogButton } from './SaveDialogButton'

export const ActiveDialogs = () => {
    const operatorEmail = useSelector((state) => state.auth.email)
    const fetchedDialogs = useSelector(
        (state) => state.fetchDialogs.fetchedDialogs,
    )

    const operatorID = window.btoa(operatorEmail)
    const activeDialogs = fetchedDialogs.filter(
        (dialog) =>
            dialog.data.status === 'active' &&
            dialog.data.operatorID === operatorID,
    )

    const history = useHistory()

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

    const handleShowDialog = (event) => {
        history.push('/current/:' + event.currentTarget.id)
    }

    return (
        <ListGroup className='dialogs'>
            {activeDialogs.length > 0 ? (
                activeDialogs.map((dialog) => (
                    <ListGroupItem
                        action
                        onClick={handleShowDialog}
                        className='list-item'
                        id={dialog.key}
                    >
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
                                        <p>Вы:</p>
                                    ) : (
                                        <p>{dialog.data.clientName}:</p>
                                    )}
                                    <p className='overflow-text'>
                                        {getLastMessage(dialog).content}
                                    </p>
                                </Col>
                                <Col md={2}>
                                    <SaveDialogButton dialog={dialog} />
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
