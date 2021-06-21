import React, {useEffect} from "react";
import {Container, FormControl, InputGroup, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import debounce from 'lodash.debounce'
import {searchInUsersRequest, setSearchUsers} from "../redux/searchInUsers/actionCreator"

export const SearchInUsers = () => {

    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(searchInUsersRequest(''))
    }, [])

    const handleInputChange = event => {
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
                        onFocus={() => dispatch(setSearchUsers(true))}
                        onBlur={() => dispatch(setSearchUsers(false))}
                    />
                </InputGroup>
            </Row>
        </Container>
    )
}
