import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {SearchInThisDialog} from "./SearchInThisDialog";
import {LogOut} from "./LogOut";

const UpperMenu = () => {

    return (
        <Container>
            <Row>
                <Col xs={3}>
                    <h5>Имя</h5>
                </Col>
                <Col>
                    <SearchInThisDialog />
                </Col>
                <Col xs={3}>
                    <LogOut />
                </Col>
            </Row>
        </Container>
    )
}
export {UpperMenu}