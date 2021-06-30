import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Picker from 'emoji-picker-react';
import {usePubNub} from "pubnub-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSmile} from "@fortawesome/free-regular-svg-icons";
import {AutocompleteInput} from "./Autocomplete";
import {useDispatch, useSelector} from "react-redux";
import {addMessage, clearMessage} from "../redux/addMessage/actionCreator";

const WriteMessage = (props) => {

    const dispatch = useDispatch()
    const message = useSelector((state) => state.addMessage.message)

    const [isShowEmoji, setIsShowEmoji] = useState(false)

    const iconSmile = <FontAwesomeIcon icon={faSmile}/>

    const client = usePubNub()

    let timeoutCache = 0
    const isTypingChannel = 'is-typing'

    client.subscribe({channels: [isTypingChannel]})

    const [currentMessage, setCurrentMessage] = useState('')
    const [isTyping, setIsTyping] = useState(false)

    const onEmojiClick = (event, emojiObject) => {
        dispatch(addMessage(emojiObject.emoji))
    }

    const handleOnChange = event => {
        setCurrentMessage(event.target.value)

        const inputHasText = event.target.value.length > 0;
        if ((inputHasText && !isTyping) || (!inputHasText && isTyping)) {
            setIsTyping(!isTyping);
            client.signal({
                channel: isTypingChannel,
                message: inputHasText ? '1' : '0'
            });
        }
    }

    const hideTypingIndicator = () => {
        setIsTyping(false);
    };

    const handleSignal = (s) => {
        clearTimeout(timeoutCache)
        timeoutCache = setTimeout(hideTypingIndicator, 2000)
        if (s.message === '0' || s.publisher === props.userEmail) {
            hideTypingIndicator();
        }
    }

    const toggleShowEmoji = event => {
        setIsShowEmoji(!isShowEmoji)
    }

    useEffect(() => {
        client.addListener({signal: handleSignal})
        setCurrentMessage(currentMessage + message)
        dispatch(clearMessage())
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
                    {isTyping &&
                    <p>Сейчас печатает:<span>{props.userEmail}</span></p>}
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
                            <Button variant="info">Отправить</Button>
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