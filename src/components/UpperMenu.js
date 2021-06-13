import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {SearchInMessages} from "./SearchInMessages";
import {LogOut} from "./LogOut";

const UpperMenu = () => {

    return (
        <Container>
            <Row>
                <Col>
                    <SearchInMessages />
                </Col>
                <Col>
                    <LogOut />
                </Col>
            </Row>
        </Container>
    )
}
export {UpperMenu}