import React, {useEffect} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {AutocompleteInput} from "./Autocomplete";
import {useSelector} from "react-redux";

const WriteMessage = () => {

    const message = useSelector(state => state.autocomplete.message)

    useEffect(() => {

    },[message])

    return (
        <Container>
            <Row>
                <Col>
                    <Row>
                        <Col md={8}>
                            <Form>
                                <Form.Group controlId="writeMessage">
                                    <Form.Label>Отправьте ответ</Form.Label>
                                    <Form.Control as="textarea" placeholder="Введите сообщение..." rows={3} value={message}/>
                                </Form.Group>
                            </Form>
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