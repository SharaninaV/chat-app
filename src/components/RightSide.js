import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {UpperMenu} from "./UpperMenu";
import {ShowDialog} from "./ShowDialog";
import {WriteMessage} from "./WriteMessage";
import {SearchInMessages} from "./SearchInMessages";

const RightSide = () => {

    return (
        <Container>
            <UpperMenu/>

            {/*<MessagesFound />*/}
            <ShowDialog />
            <WriteMessage/>
        </Container>
    )
}

export {RightSide}
