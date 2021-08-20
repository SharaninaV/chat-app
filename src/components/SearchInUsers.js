import React from 'react'
import { Container, Input, InputGroup, Row } from 'reactstrap'
import { useDispatch } from 'react-redux'
import debounce from 'lodash.debounce'
import {
    resetUsersFound,
    searchInUsersRequest,
    setSearchUsers,
} from '../redux/searchInUsers/actionCreator'

export const SearchInUsers = () => {
    const dispatch = useDispatch()

    const handleInputChange = (event) => {
        if (!event.target.value.length) {
            dispatch(resetUsersFound())
        } else {
            dispatch(searchInUsersRequest(event.target.value))
        }
    }

    const handleOnBlur = (event) => {
        dispatch(setSearchUsers(false))
        event.target.value = ''
    }

    return (
        <Container className="search">
            <Row>
                <InputGroup className="mb-3">
                    <Input
                        type="text"
                        placeholder="Поиск по пользователям..."
                        onChange={debounce(handleInputChange, 500)}
                        onFocus={() => dispatch(setSearchUsers(true))}
                        onBlur={handleOnBlur}
                    />
                </InputGroup>
            </Row>
        </Container>
    )
}
