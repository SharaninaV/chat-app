import React, { useEffect } from 'react'
import { Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ActiveDialogs } from './ActiveDialogs'
import { SavedDialogs } from './SavedDialogs'
import { FinishedDialogs } from './FinishedDialogs'
import { fetchDialogsRequest } from '../redux/dialogs/actionCreator'
import { QueuedDialogs } from './QueuedDialogs'
import { LeftMenu } from './LeftMenu'
import {
    foundMessagesSelector,
    isSearchingMessagesSelector,
} from '../redux/searchInMessages/selectors'
import {
    isSearchingInUsersSelector,
    usersFoundSelector,
} from '../redux/searchInUsers/selectors'
import { filterSelector } from '../redux/leftMenu/selectors'

export const Dialogs = () => {
    const isSearchingMessages = useSelector(isSearchingMessagesSelector)
    const foundMessages = useSelector(foundMessagesSelector)
    const isSearchingInUsers = useSelector(isSearchingInUsersSelector)
    const usersFound = useSelector(usersFoundSelector)
    const filter = useSelector(filterSelector)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchDialogsRequest())
    }, [isSearchingMessages, isSearchingInUsers])

    const renderFoundMessages = (foundMessages) => {
        return (
            <Container>
                <ListGroup className="foundItems">
                    {!!foundMessages.length ? (
                        foundMessages.map((message) => (
                            <Row>
                                <Col>
                                    <ListGroupItem action>
                                        {message.user} <br /> {message.content}
                                    </ListGroupItem>
                                </Col>
                            </Row>
                        ))
                    ) : (
                        <Row>
                            <Col>
                                <ListGroupItem>
                                    <p>Диалогов не найдено</p>
                                </ListGroupItem>
                            </Col>
                        </Row>
                    )}
                </ListGroup>
            </Container>
        )
    }

    return (
        <Container>
            {isSearchingMessages &&
                renderFoundMessages(foundMessages) ||
             isSearchingInUsers &&
                renderFoundMessages(usersFound) ||
                <Row>
                    <Col md={3}>
                        <LeftMenu />
                    </Col>
                    <Col>
                        {filter === 'queued' && (
                            <div>
                                <h2>Очередь</h2>
                                <QueuedDialogs />
                            </div>
                        )}
                        {filter === 'active' && (
                            <div>
                                <h2>Активные</h2>
                                <ActiveDialogs />
                            </div>
                        )}
                        {filter === 'saved' && (
                            <div>
                                <h2>Сохраненные</h2>
                                <SavedDialogs />
                            </div>
                        )}
                        {filter === 'finished' && (
                            <div>
                                <h2>Завершенные</h2>
                                <FinishedDialogs />
                            </div>
                        )}
                    </Col>
                </Row>
            }
        </Container>
    )
}
