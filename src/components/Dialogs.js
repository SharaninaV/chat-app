import React, {useEffect} from "react";
import {Col, Container, ListGroup, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {ActiveDialogs} from "./ActiveDialogs";
import {SavedDialogs} from "./SavedDialogs";
import {FinishedDialogs} from "./FinishedDialogs";
import {fetchDialogsRequest} from "../redux/dialogs/actionCreator";
import {QueuedDialogs} from "./QueuedDialogs";
import {LeftMenu} from "./LeftMenu";

export const Dialogs = () => {

    const isSearchingMessages = useSelector((state) => state.searchInMessages.searchMessagesNeeded)
    const foundMessages = useSelector((state) => state.searchInMessages.messagesFound)
    const isSearchingInUsers = useSelector((state) => state.searchInUsers.isUserSearching)
    const usersFound = useSelector((state) => state.searchInUsers.usersFound)
    const filter = useSelector((state) => state.leftMenu.filter)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchDialogsRequest())
    }, [isSearchingMessages, isSearchingInUsers])

    const renderFoundMessages = (foundMessages) => {
        return (<ListGroup>
            {foundMessages.length > 0 ?
                (foundMessages.map(message => (
                        <ListGroup.Item action>
                            {message.user} <br/> {message.content}
                        </ListGroup.Item>
                    ))
                ) : (
                    <ListGroup.Item>
                        Диалогов не найдено
                    </ListGroup.Item>
                )}
        </ListGroup>)
    }

    return (
        <Container>
            {isSearchingMessages ?
                renderFoundMessages(foundMessages)
                : isSearchingInUsers ?
                    renderFoundMessages(usersFound)
                    :
                    <Row>
                        <Col md={3}>
                            <LeftMenu/>
                        </Col>
                        <Col>
                            {filter === "queued" &&
                            <div>
                                <h2>Очередь</h2>
                                <QueuedDialogs/>
                            </div>}
                            {filter === "active" &&
                            <div>
                                <h2>Активные</h2>
                                <ActiveDialogs/>
                            </div>}
                            {filter === "saved" &&
                            <div>
                                <h2>Сохраненные</h2>
                                <SavedDialogs/>
                            </div>}
                            {filter === "finished" &&
                            <div>
                                <h2>Завершенные</h2>
                                <FinishedDialogs/>
                            </div>}
                        </Col>
                    </Row>
            }
        </Container>
    )
}

