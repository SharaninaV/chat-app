import React from "react";
import {Col, Container, ListGroup, Row} from "react-bootstrap";
import moment from "moment";
import {SaveDialogButton} from "./SaveDialogButton";
import {useSelector} from "react-redux";
import {EnterDialogButton} from "./EnterDialogButton";

const QueuedDialogs = () => {

    const queuedDialogs = useSelector((state) => state.fetchDialogs.fetchedDialogs)
        .filter(dialog => dialog.data.status === 'queued')

    return (
        <ListGroup>
            {queuedDialogs.length > 0 ?
                (queuedDialogs.map(dialog => (
                        <ListGroup.Item action>
                            <Container>
                                <Row>
                                    <Col>
                                        {dialog.key}
                                    </Col>
                                    <Col>
                                        ({moment(dialog.data.latestActivity).locale('ru').format('LLL')})
                                    </Col>
                                    <Col>
                                        <EnterDialogButton dialog={dialog}/>
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

export {QueuedDialogs}