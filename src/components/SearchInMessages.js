import React from "react";
import {Container, FormControl, InputGroup, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import debounce from 'lodash.debounce'
import {
    resetMessagesFound,
    searchInMessagesRequest,
    setSearchMessages
} from "../redux/searchInMessages/actionCreator";

export const SearchInMessages = () => {

    const dispatch = useDispatch()

    const handleInputChange = event => {
        if (!event.target.value.length) {
            dispatch(resetMessagesFound())
        } else {
            dispatch(searchInMessagesRequest(event.target.value))
        }
    }

    return (
        <Container>
            <Row>
                <InputGroup className="mb-3">
                    <FormControl
                        type="text"
                        placeholder="Поиск в сообщениях..."
                        onChange={debounce(handleInputChange, 500)}
                        onFocus={() => dispatch(setSearchMessages(true))}
                        onBlur={() => dispatch(setSearchMessages(false))}
                    />
                </InputGroup>
            </Row>
        </Container>
    )
}
