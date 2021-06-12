import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {searchInMessagesRequest} from "../searchInMessages/actionCreator";
import debounce from 'lodash.debounce'

const SearchInMessages = () => {

    const messagesFound = useSelector((state) => state.searchInMessages.messagesFound)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(messagesFound)
    }, [messagesFound])

    const handleInputChange = event => {
        dispatch(searchInMessagesRequest(event.target.value))
    }

    return (
        <Container>
            <Row>
                <InputGroup className="mb-3">
                    <FormControl
                        type="text"
                        placeholder="Поиск в сообщениях..."
                        onChange={debounce(handleInputChange,500)}
                    />
                </InputGroup>
            </Row>
        </Container>
    )
}
export {SearchInMessages}
