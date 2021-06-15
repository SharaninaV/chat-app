import React from "react";
import {Col, Container, ListGroup, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import moment from 'moment'
import 'moment/locale/ru'

const SavedDialogs = () => {

    const operatorID = useSelector((state) => state.auth.email)
        .split('@')[0]
    const savedDialogs = useSelector((state) => state.fetchDialogs.fetchedDialogs)
        .filter(dialog => dialog.data.saved === true && dialog.data.operatorID === operatorID)

    return (
        <ListGroup>

            {savedDialogs.length > 0 ?
                (savedDialogs.map(dialog => (

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

export {SavedDialogs}