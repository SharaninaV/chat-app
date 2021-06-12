import React, {useState} from "react";
import {Button, Col, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import firebase from "../firebase/firebase";

const SearchInUsers = () => {

    const [searchText,setSearchText] = useState('')

    const handleInputChange = event => {
        setSearchText(event.target.value)
    }

    const handleSearchInUsers = event => {
        const ref = firebase.database().ref('dialogs')
        ref.on('value', (snapshot) => {
            let result = []
            snapshot.forEach(childSnapshot => {
                if (childSnapshot.key.toLowerCase().includes(searchText.toLowerCase())){
                    result.push(childSnapshot.key)
                }
            })
            console.log(result)
        })
    }

    return(
        <Container>
            <Row>
                <InputGroup className="mb-3">
                    <FormControl
                        type="text"
                        placeholder="Поиск по пользователям..."
                        value={searchText}
                        onChange={handleInputChange}
                    />
                    <InputGroup.Append>
                        <Button variant="outline-primary" onClick={handleSearchInUsers} disabled={searchText===''}>Искать</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Row>
        </Container>
    )
}
export {SearchInUsers}
