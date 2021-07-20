import React from "react";
import {Container, FormControl, InputGroup, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import debounce from 'lodash.debounce'
import {resetUsersFound, searchInUsersRequest, setSearchUsers} from "../redux/searchInUsers/actionCreator"

export const SearchInUsers = () => {

    const dispatch = useDispatch()

    const handleInputChange = event => {
        if (!event.target.value.length) {
            dispatch(resetUsersFound())
        } else {
            dispatch(searchInUsersRequest(event.target.value))
        }
    }

    return (
        <Container>
            <Row>
                <InputGroup className="mb-3">
                    <FormControl
                        type="text"
                        placeholder="Поиск по пользователям..."
                        onChange={debounce(handleInputChange, 500)}
                        onFocus={() => dispatch(setSearchUsers(true))}
                        onBlur={() => dispatch(setSearchUsers(false))}
                    />
                </InputGroup>
            </Row>
        </Container>
    )
}
