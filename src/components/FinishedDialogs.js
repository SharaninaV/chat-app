import React from "react";
import {useSelector} from "react-redux";
import {Col, Container, ListGroup, Row} from "react-bootstrap";
import moment from "moment";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {faStar as farStar} from "@fortawesome/free-regular-svg-icons"
import PrettyRating from "pretty-rating-react";

const FinishedDialogs = () => {

    const operatorID = useSelector((state) => state.auth.email)
        .split('@')[0]
    const finishedDialogs = useSelector((state) => state.fetchDialogs.fetchedDialogs)
        .filter(dialog => dialog.data.status === 'finished' && dialog.data.operatorID === operatorID)

    const getLastMessage = (dialog) => {
        let lastMessage = {content: '', writtenBy: ''}
        dialog.data.messages.forEach(message => {
            if (message.timestamp === dialog.data.latestActivity) {
                lastMessage.writtenBy = message.writtenBy
                if (message.content.length > 40) {
                    lastMessage.content = message.content.slice(0, 40) + '...'
                } else {
                    lastMessage.content = message.content
                }
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
        <ListGroup>
            {finishedDialogs.length > 0 ?
                (finishedDialogs.map(dialog => (
                        <ListGroup.Item action>
                            <Container>
                                <Row>
                                    <Col>
                                        {dialog.key}
                                    </Col>
                                    <Col>
                                        {getLastMessage(dialog).writtenBy}: <br/>
                                        {getLastMessage(dialog).content}
                                    </Col>
                                    <Col>
                                        ({moment(dialog.data.latestActivity).locale('ru').format('LLL')})
                                    </Col>
                                    <Col>
                                        <PrettyRating value={dialog.data.rating} icons={icons.star} colors={colors.star}/>
                                    </Col>
                                </Row>
                            </Container>
                        </ListGroup.Item>
                    ))
                ) : (
                    <ListGroup.Item>
                        Диалогов не найдено
                    </ListGroup.Item>
                )}
        </ListGroup>
    )
}

export {FinishedDialogs}