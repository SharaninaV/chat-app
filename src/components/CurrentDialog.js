import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchCurrentDialogRequest} from "../redux/currentDialog/actionCreator";
import {useLocation} from "react-router-dom";
import moment from "moment";
import 'moment/locale/ru'
import {Container, Row, Col} from "react-bootstrap";

export const CurrentDialog = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const mountedRef = useRef(true)
    const dialogRef = useRef()

    const fetchedDialog = useSelector((state) => state.fetchCurrentDialog.currentDialog)
    const [needRefresh, setNeedRefresh] = useState(false)

    const fetchedMessages = fetchedDialog.messages

    const key = location.pathname.split(':')[1]
    const isFinished = fetchedDialog.status === 'finished'

    const fetchMessages = () => {
        dispatch(fetchCurrentDialogRequest(key))
        const interval = setInterval(() => {
            if (!mountedRef.current) {
                clearInterval(interval)
            }
            dispatch(fetchCurrentDialogRequest(key))
            setNeedRefresh(!needRefresh)
        }, 30000)
    }

    useEffect(() => {
        fetchMessages()
        return () => {
            mountedRef.current = false
        }
    }, [])

    useEffect(() => {

    }, [needRefresh])

    useEffect(() => {

            dialogRef.current.scrollIntoView({ behavior: "smooth" });

    }, [fetchedMessages])

    return (
        <Container className="currentDialog">
            {fetchedMessages && Object.values(fetchedMessages).map(message => (
                message.writtenBy === "operator" ?
                    <Row className="operator-message-row">
                        <Col md={5}>
                        </Col>
                        <Col className="operator-message" md={5}>
                            {/\.(gif|jpg|webp|png)$/i.test(message.content) ?
                                <img alt="Изображение" height="200px" src={message.content}/>
                                : (
                                    (message.content)
                                )}
                        </Col>
                        <Col md={2}>
                            <p>Вы:</p>
                            {moment(message.timestamp).calendar()}
                        </Col>
                    </Row> :
                    <Row className="client-message-row">
                        <Col md={2}>
                            <p>{fetchedDialog.clientName}:</p>
                            {moment(message.timestamp).calendar()}
                        </Col>
                        <Col className="client-message" md={5}>
                            {/\.(gif|jpg|webp|png)$/i.test(message.content) ?
                                <img alt="Изображение" height="200px" src={message.content}/>
                                : (
                                    (message.content)
                                )}
                        </Col>
                        <Col md={5}>
                        </Col>
                    </Row>
            ))}
            <div ref={dialogRef}></div>
            {isFinished &&
            <p>Диалог завершился {moment(fetchedDialog.latestActivity).calendar()}</p>}
        </Container>
    )
}
