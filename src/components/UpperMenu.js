import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {LogOut} from "./LogOut";

export const UpperMenu = () => {

    const operatorEmail = useSelector((state) => state.auth.email)
    const operatorID = operatorEmail.split('@')[0]

    return (
        <Container>
            <Row>
                <Col>
                    <h1>ChatApp</h1>
                </Col>
                <Col>
                    <h3>{operatorID}</h3>
                </Col>
                <Col>
                    <LogOut />
                </Col>
            </Row>
        </Container>
    )
}
