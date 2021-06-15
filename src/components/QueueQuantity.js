import React from "react";
import {Col, Container, Row} from "react-bootstrap";

const QueueQuantity = () => {

    return (
        <Container>
            <Row>
                <Col lg={8}>
                    <p>Количество диалогов в очереди:</p>
                </Col>
                <Col lg={4}>

                </Col>
            </Row>
        </Container>
    )
}

export {QueueQuantity}