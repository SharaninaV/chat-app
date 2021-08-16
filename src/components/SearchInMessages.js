import React from 'react'
import { Container, Input, InputGroup, Row } from 'reactstrap'
import { useDispatch } from 'react-redux'
import debounce from 'lodash.debounce'
import {
    resetMessagesFound,
    searchInMessagesRequest,
    setSearchMessages,
} from '../redux/searchInMessages/actionCreator'

export const SearchInMessages = () => {
    const dispatch = useDispatch()

    const handleInputChange = (event) => {
        if (!event.target.value.length) {
            dispatch(resetMessagesFound())
        } else {
            dispatch(searchInMessagesRequest(event.target.value))
        }
    }

    const handleOnBlur = event => {
        dispatch(setSearchMessages(false))
        event.target.value = ''
    }

    return (
        <Container className='search'>
            <Row>
                <InputGroup className='mb-3'>
                    <Input
                        type='text'
                        placeholder='Поиск в сообщениях...'
                        onChange={debounce(handleInputChange, 500)}
                        onFocus={() => dispatch(setSearchMessages(true))}
                        onBlur={handleOnBlur}
                    />
                </InputGroup>
            </Row>
        </Container>
    )
}
