import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchCurrentDialogRequest} from "../redux/currentDialog/actionCreator";
import {useLocation} from "react-router-dom";
import moment from "moment";
import 'moment/locale/ru'
import {Container, Row, Col} from "react-bootstrap";

export const CurrentDialog = () => {

    const dispatch = useDispatch()
    const location = useLocation()

    const fetchedDialog = useSelector((state) => state.fetchCurrentDialog.currentDialog)
    const [needRefresh, setNeedRefresh] = useState(false)

    const fetchedMessages = fetchedDialog.messages

    const key = location.pathname.split(':')[1]
    const isFinished = fetchedDialog.status === 'finished'

    const fetchMessages = () => {
        dispatch(fetchCurrentDialogRequest(key))
        setInterval(() => {
            dispatch(fetchCurrentDialogRequest(key))
            setNeedRefresh(!needRefresh)
        }, 30000)
    }

    useEffect(() => {
        fetchMessages()
    }, [])

    useEffect(() => {

    }, [needRefresh])

    return (
        <Container>
            {fetchedMessages && fetchedMessages.map(message => (
                <Row className="my-3">
                    <Col>
                        {/\.(gif|jpg|webp|png)$/i.test(message.content) ?
                            <img height="200px" src={message.content}/>
                            : (
                                (message.content)
                            )}
                    </Col>
                    <Col>
                        {moment(message.timestamp).calendar()}
                    </Col>
                </Row>
            ))}
            {isFinished &&
            <p>Диалог завершился {moment(fetchedDialog.latestActivity).calendar()}</p>}
        </Container>
    )
}