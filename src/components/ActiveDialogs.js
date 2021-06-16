import React from "react";
import {Col, Container, ListGroup, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {SaveDialogButton} from "./SaveDialogButton";
import moment from 'moment'
import 'moment/locale/ru'

const ActiveDialogs = () => {

    const operatorID = useSelector((state) => state.auth.email)
        .split('@')[0]
    const activeDialogs = useSelector((state) => state.fetchDialogs.fetchedDialogs)
        .filter(dialog => dialog.data.status === 'active' && dialog.data.operatorID === operatorID)


    return (
        <ListGroup>
            {activeDialogs.length > 0 ?
                (activeDialogs.map(dialog => (
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
                                        <SaveDialogButton dialog={dialog}/>
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

export {ActiveDialogs}