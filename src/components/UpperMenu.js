import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {LogOut} from "./LogOut";
import {QueueQuantity} from "./QueueQuantity";

const UpperMenu = () => {

    return (
        <Container>
            <Row>
                <Col>
                    <h1>ChatApp</h1>
                </Col>
                <Col>
                    <QueueQuantity/>
                </Col>
                <Col>
                    <h3>Operator1</h3>
                </Col>
                <Col>
                    <LogOut />
                </Col>
            </Row>
        </Container>
    )
}
export {UpperMenu}