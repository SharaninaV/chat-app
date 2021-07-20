import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Picker from 'emoji-picker-react';
import {usePubNub} from "pubnub-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSmile} from "@fortawesome/free-regular-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {AutocompleteInput} from "./Autocomplete";
import {addMessage, clearMessage} from "../redux/addMessage/actionCreator";
import {sendMessageRequest} from "../redux/sendMessage/actionCreator";
import {fetchCurrentDialogRequest} from "../redux/currentDialog/actionCreator";

const WriteMessage = ({clientID, userEmail}) => {

    const dispatch = useDispatch()
    const message = useSelector((state) => state.addMessage.message)
    const currentDialog = useSelector((state) => state.fetchCurrentDialog.currentDialog)

    const [isShowEmoji, setIsShowEmoji] = useState(false)
    const [currentMessage, setCurrentMessage] = useState('')
    const [isTyping, setIsTyping] = useState(false)

    const iconSmile = <FontAwesomeIcon icon={faSmile}/>

    const client = usePubNub()
    const isTypingChannel = clientID + 'is-typing'
    const currentChannel = clientID + 'Chat'
    client.subscribe({channels: [isTypingChannel, currentChannel]})

    const handleSendMessage = event => {
        if (currentMessage.length > 0) {
            const sentMessage = {
                content: currentMessage,
                timestamp: Date.now(),
                writtenBy: 'operator'
            }
            dispatch(sendMessageRequest(clientID, sentMessage))
            dispatch(fetchCurrentDialogRequest(clientID))
            client.publish({channel: currentChannel, message: sentMessage})
            setCurrentMessage('')
        }
    }

    const onEmojiClick = (event, emojiObject) => {
        dispatch(addMessage(emojiObject.emoji))
    }

    const handleOnChange = event => {
        setCurrentMessage(event.target.value)
        const inputHasText = event.target.value.length > 0;
        client.signal({
            channel: isTypingChannel,
            message: inputHasText ? '1' : '0'
        });
    }

    const hideTypingIndicator = () => {
        setIsTyping(false);
    };

    const handleSignal = (s) => {
        setIsTyping(s.message === '2');
        setTimeout(hideTypingIndicator, 5000)
        if (s.message === '0' || s.publisher === userEmail) {
            hideTypingIndicator();
        }
    }

    const handleMessage = (m) => {

    }

    const toggleShowEmoji = event => {
        setIsShowEmoji(!isShowEmoji)
    }

    useEffect(() => {
        const listener = {
            signal: handleSignal,
            message: handleMessage
        }
        client.addListener(listener)
        setCurrentMessage(currentMessage + message)
        dispatch(clearMessage())
        return (() => {
            client.removeListener(listener)
        })
    }, [message, isTyping])

    return (
        <Container>
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <Form>
                                <Form.Group controlId="writeMessage">
                                    <Form.Label>Отправьте ответ</Form.Label>
                                    <Form.Control as="textarea" placeholder="Введите сообщение..." rows={3}
                                                  value={currentMessage}
                                                  onChange={handleOnChange}
                                    />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    {isTyping && currentDialog &&
                    <p><span>{currentDialog.clientName}</span> печатает...</p>}
                    <Row>
                        <Col>
                            {isShowEmoji &&
                            <Picker
                                onEmojiClick={onEmojiClick}
                                disableSearchBar="false"
                                pickerStyle={{height: "200px"}}
                                groupNames={{
                                    smileys_people: 'смайлики и люди',
                                    animals_nature: 'животные и природа',
                                    food_drink: 'еда и напитки',
                                    travel_places: 'путешествия',
                                    activities: 'занятия',
                                    objects: 'объекты',
                                    symbols: 'символы',
                                    flags: 'флаги',
                                    recently_used: 'недавно использованные',
                                }}
                                groupVisibility={{
                                    flags: false
                                }}
                                native
                            />
                            }
                        </Col>
                        <Col md={4}>
                            <Button variant="light" onClick={toggleShowEmoji}>{iconSmile}</Button>
                            <Button variant="info" onClick={handleSendMessage}>Отправить</Button>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <AutocompleteInput/>
                </Col>
            </Row>
        </Container>
    )
}
export {WriteMessage}
