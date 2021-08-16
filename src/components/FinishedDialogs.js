import React from "react";
import {useSelector} from "react-redux";
import {Col, Container, ListGroup, ListGroupItem, Row} from "reactstrap";
import moment from "moment";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {faStar as farStar} from "@fortawesome/free-regular-svg-icons"
import PrettyRating from "pretty-rating-react";
import {useHistory} from "react-router-dom";

export const FinishedDialogs = () => {

    const operatorEmail = useSelector((state) => state.auth.email)
    const fetchedDialogs = useSelector((state) => state.fetchDialogs.fetchedDialogs)

    const operatorID = window.btoa(operatorEmail)
    const finishedDialogs = fetchedDialogs.filter(dialog => dialog.data.status === 'finished' && dialog.data.operatorID === operatorID)

    const history = useHistory()

    const handleShowDialog = (event) => {
        history.push('/current/:' + event.currentTarget.id)
    }

    const getLastMessage = (dialog) => {
        let lastMessage = {content: '', writtenBy: ''}
        Object.values(dialog.data.messages).forEach(message => {
            if (message.timestamp === dialog.data.latestActivity) {
                lastMessage.writtenBy = message.writtenBy
                lastMessage.content = message.content
            }
        })
        return lastMessage
    }

    const icons = {
        star: {
            complete: faStar,
            empty: farStar
        }
    }
    const colors = {
        star: ['#d9ad26', '#434b4d']
    }



    return (
        <ListGroup className="dialogs">
            {finishedDialogs.length > 0 ?
                (finishedDialogs.map(dialog => (
                        <ListGroupItem action onClick={handleShowDialog} id={dialog.key}  className="list-item">
                            <Container>
                                <Row>
                                    <Col>
                                        {dialog.data.clientName}
                                        <br/>
                                        ({moment(dialog.data.latestActivity).calendar()})
                                    </Col>
                                    <Col>
                                        {getLastMessage(dialog).writtenBy === 'operator' ?
                                            <p>Вы:</p> : <p>{dialog.data.clientName}:</p>}
                                        <p className="overflow-text">
                                            {getLastMessage(dialog).content}
                                        </p>
                                    </Col>
                                    <Col md={2}>
                                        <PrettyRating value={dialog.data.rating} icons={icons.star} colors={colors.star}/>
                                    </Col>
                                </Row>
                            </Container>
                        </ListGroupItem>
                    ))
                ) : (
                    <ListGroupItem  className="list-item">
                        Диалогов не найдено
                    </ListGroupItem>
                )}
        </ListGroup>
    )
}
