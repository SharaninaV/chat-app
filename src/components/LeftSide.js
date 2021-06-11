import React from "react";
import {SearchInUsers} from "./SearchInUsers";
import {Container} from "react-bootstrap";
import {Dialogs} from "./Dialogs";

const LeftSide = () => {

    return (
        <Container>
        <h1>ChatApp</h1>
        <SearchInUsers/>
            <Dialogs />
        </Container>
    )
}
export {LeftSide}
