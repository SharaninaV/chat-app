import React, {useEffect} from "react";
import {Container, ListGroup, Tab, Tabs} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {ActiveDialogs} from "./ActiveDialogs";
import {SavedDialogs} from "./SavedDialogs";
import {FinishedDialogs} from "./FinishedDialogs";
import {fetchDialogsRequest} from "../redux/dialogs/actionCreator";
import {QueuedDialogs} from "./QueuedDialogs";

export const Dialogs = () => {

    const isSearchingMessages = useSelector((state) => state.searchInMessages.searchMessagesNeeded)
    const foundMessages = useSelector((state) => state.searchInMessages.messagesFound)
    const isSearchingInUsers = useSelector((state) => state.searchInUsers.isUserSearching)
    const usersFound = useSelector((state) => state.searchInUsers.usersFound)

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
                    <Tabs defaultActiveKey="queued" id="dialogs">
                        <Tab eventKey="queued" title="Очередь">
                            <QueuedDialogs/>
                        </Tab>
                        <Tab eventKey="active" title="Активные">
                            <ActiveDialogs/>
                        </Tab>
                        <Tab eventKey="saved" title="Сохраненные">
                            <SavedDialogs/>
                        </Tab>
                        <Tab eventKey="finished" title="Завершенные">
                            <FinishedDialogs/>
                        </Tab>
                    </Tabs>
            }

        </Container>
    )
}

