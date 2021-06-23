import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import {WriteMessage} from "./WriteMessage";
import {UpperMenu} from "./UpperMenu";
import {CurrentDialog} from "./CurrentDialog";
import {GoBackButton} from "./GoBackButton";
import {useLocation} from "react-router-dom";

export const ShowDialog = () => {

    const location = useLocation()
    const clientID = location.pathname.split(':')[1]

    return(
        <Container>
            <Row>
                <Col md={10}>
                    <UpperMenu/>
                </Col>
                <Col>
                    <GoBackButton />
                </Col>
            </Row>
            <h3>{clientID}</h3>
            <CurrentDialog />
            <WriteMessage/>
        </Container>
    )
}
