import React from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

const WriteMessage = () => {
    return(
        <Container>
            <Row>
                <Col lg={8}>
                    <Form>
                        <Form.Group controlId="writeMessage">
                            <Form.Control as="textarea" placeholder="Введите сообщение..." rows={3} />
                        </Form.Group>
                    </Form>
                </Col>
                <Col>
                    <Button variant="info">Отправить</Button>
                </Col>
            </Row>
        </Container>
    )
}
export {WriteMessage}