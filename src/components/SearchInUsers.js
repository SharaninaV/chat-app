import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {searchInUsersRequest} from "../searchInUsers/actionCreator";
import debounce from 'lodash.debounce'

const SearchInUsers = () => {

    const usersFound = useSelector((state) => state.searchInUsers.usersFound)
    const dispatch = useDispatch()

    useEffect(() =>{
        console.log(usersFound)
    }, [usersFound])

    const handleInputChange = event => {
        console.log(event.target.value)
        dispatch(searchInUsersRequest(event.target.value))
    }

    return (
        <Container>
            <Row>
                <InputGroup className="mb-3">
                    <FormControl
                        type="text"
                        placeholder="Поиск по пользователям..."
                        onChange={debounce(handleInputChange,500)}
                    />
                </InputGroup>
            </Row>
        </Container>
    )
}
export {SearchInUsers}
