import React from "react";
import {Container} from "react-bootstrap";
import {WriteMessage} from "./WriteMessage";

const ShowDialog = () => {

    return(
        <Container>
            <h3>Активный диалог</h3>
            <WriteMessage/>
        </Container>
    )
}
export {ShowDialog}