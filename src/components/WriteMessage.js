import React, {useEffect} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Picker from 'emoji-picker-react';
import {AutocompleteInput} from "./Autocomplete";
import {useDispatch, useSelector} from "react-redux";
import {addMessage} from "../redux/addMessage/actionCreator";

const WriteMessage = () => {

    const dispatch = useDispatch()
    let message = useSelector(state => state.addMessage.message)

    const onEmojiClick = (event, emojiObject) => {
        dispatch(addMessage(emojiObject.emoji))
    }

    useEffect(() => {

    }, [message])

    return (
        <Container>
            <Row>
                <Col>
                    <Row>
                        <Col md={10}>
                            <Form>
                                <Form.Group controlId="writeMessage">
                                    <Form.Label>Отправьте ответ</Form.Label>
                                    <Form.Control as="textarea" placeholder="Введите сообщение..." rows={3}
                                                  value={message}/>
                                </Form.Group>
                            </Form>
                        </Col>

                    </Row>
                    <Row>
                        <Col>
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
                        </Col>
                        <Col>
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