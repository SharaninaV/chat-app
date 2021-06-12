import React, {useState} from "react";
import {Button, Col, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import firebase from "../firebase/firebase";

const SearchInMessages = () => {

    const [searchText, setSearchText] = useState('')

    const handleInputChange = event => {
        setSearchText(event.target.value)
    }

    const handleSearchInMessages = event => {
        const ref = firebase.database().ref('dialogs')
        ref.on('value', (snapshot) => {
            let result = []
            snapshot.forEach(childSnapshot => {
                childSnapshot.val().messages.forEach(message => {
                    const content = message.content.toLowerCase()
                    if (content.includes(searchText.toLowerCase())) {
                        result.push({user: childSnapshot.key, content: content})
                    }
                })
            })
            console.log(result)
        })
    }

    return (
        <Container>
            <Row>
                <InputGroup className="mb-3">
                    <FormControl
                        type="text"
                        placeholder="Поиск в сообщениях..."
                        value={searchText}
                        onChange={handleInputChange}
                    />
                    <InputGroup.Append>
                        <Button variant="outline-primary" onClick={handleSearchInMessages}
                                disabled={searchText === ''}>Искать</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Row>
        </Container>
    )
}
export {SearchInMessages}
