import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchCurrentDialogRequest} from "../redux/currentDialog/actionCreator";
import {useLocation} from "react-router-dom";
import moment from "moment";
import 'moment/locale/ru'
import {Container, Row, Col} from "reactstrap";
import {usePubNub} from "pubnub-react";

export const CurrentDialog = ({clientID}) => {

    const dispatch = useDispatch()
    const location = useLocation()
    const mountedRef = useRef(true)
    const dialogRef = useRef()
    const pubnub = usePubNub()

    const fetchedDialog = useSelector((state) => state.fetchCurrentDialog.currentDialog)
    const [needRefresh, setNeedRefresh] = useState(false)
    const [messages, setMessages] = useState([])

    const key = location.pathname.split(':')[1]
    const isFinished = fetchedDialog.status === 'finished'

    const currentChannel = clientID + 'Chat';

    const fetchMessages = () => {
        dispatch(fetchCurrentDialogRequest(key))
        const interval = setInterval(() => {
            if (!mountedRef.current) {
                clearInterval(interval)
                return
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
        if (fetchedDialog && Object.keys(fetchedDialog).length) {
            setMessages(Object.values(fetchedDialog.messages))
        }
    }, [fetchedDialog])

    useEffect(() => {
    }, [needRefresh])

    useEffect(() => {
        if (pubnub) {
            pubnub.setUUID(clientID);
            const listener = {
                message: (envelope) => {
                    setMessages((msgs) => [
                        ...msgs,
                        {
                            writtenBy: envelope.message.writtenBy,
                            content: envelope.message.content,
                            timestamp: envelope.message.timestamp,
                            isNew: true
                        }
                    ]);
                }
            };

            pubnub.addListener(listener);
            pubnub.subscribe({channels: [currentChannel]});

            return () => {
                pubnub.removeListener(listener);
                pubnub.unsubscribeAll();
            };
        }
    }, [currentChannel, pubnub]);

    useEffect(() => {
        dialogRef.current.scrollIntoView({behavior: "auto"});
    }, [pubnub, messages])

    return (
        <Container className="currentDialog">
            {messages.length && messages.map(message => (
                message.writtenBy === "operator" ?
                    <Row className="operator-message-row">
                        <Col>
                        </Col>
                        <Col className="operator-message">
                            {message.content}
                        </Col>
                        <Col md={3}>
                            <p>Вы<br/>
                                {moment(message.timestamp).calendar()}
                            </p>
                        </Col>
                    </Row> :
                    <Row className="client-message-row">
                        <Col md={3}>
                            <p>{fetchedDialog.clientName}<br/>
                                {moment(message.timestamp).calendar()}
                            </p>
                        </Col>
                        <Col className="client-message">
                            {message.content.startsWith('data:image') ?
                                <img alt="Изображение" height="200px" src={message.content}/>
                                : (message.content)
                            }
                        </Col>
                        <Col>
                        </Col>
                    </Row>
            ))}
            <div ref={dialogRef}></div>
            {isFinished &&
            <p>Диалог завершился {moment(fetchedDialog.latestActivity).calendar()}</p>}
        </Container>
    )
}
