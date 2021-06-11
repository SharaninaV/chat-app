import React from "react";
import {Button, Col, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";

const SearchInThisDialog = () => {

    return(
        <Container>
            <Row>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Поиск в сообщениях..."
                        aria-label="searchInThisDialog"
                    />
                    <InputGroup.Append>
                        <Button variant="outline-primary">Искать</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Row>
        </Container>
    )
}
export {SearchInThisDialog}
