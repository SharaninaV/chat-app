import React from "react";
import {Button, Col, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";

const SearchInUsers = () => {


    return(
        <Container>
            <Row>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Поиск по пользователям..."
                        aria-label="searchInUsers"
                    />
                    <InputGroup.Append>
                        <Button variant="outline-primary">Искать</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Row>
        </Container>
    )
}
export {SearchInUsers}
