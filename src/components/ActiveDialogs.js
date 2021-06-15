import React, {useEffect, useState} from "react";
import {Button, Col, Container, ListGroup, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {SaveButton} from "./SaveButton";
import moment from 'moment'
import 'moment/locale/ru'
import {SearchInMessages} from "./SearchInMessages";

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
                                        <SaveButton dialog={dialog}/>
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