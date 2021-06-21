import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchCurrentDialogRequest} from "../redux/currentDialog/actionCreator";
import {useLocation} from "react-router-dom";
import moment from "moment";
import 'moment/locale/ru'
import {Container, Row, Col} from "react-bootstrap";

export const CurrentDialog = () => {

    const dispatch = useDispatch()
    const location = useLocation()

    const fetchedMessages = useSelector((state) => state.fetchCurrentDialog.currentDialogMessages)

    const key = location.pathname.split(':')[1]


    useEffect(() => {
        dispatch(fetchCurrentDialogRequest(key))
    }, [])

    return (
        <Container>
            {fetchedMessages.map(message => (
                <Row>
                    <Col>
                        {message.content}
                    </Col>
                    <Col>
                        {moment(message.timestamp).calendar()}
                    </Col>
                </Row>
            ))}
        </Container>
    )
}