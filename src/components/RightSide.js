import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {UpperMenu} from "./UpperMenu";
import {ActiveDialog} from "./ActiveDialog";
import {WriteMessage} from "./WriteMessage";

const RightSide = () => {

    return (
        <Container>
            <UpperMenu/>
            <ActiveDialog />
            <WriteMessage/>
        </Container>
    )
}

export {RightSide}
