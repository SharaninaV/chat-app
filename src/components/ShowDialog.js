import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useLocation } from 'react-router-dom'
import PubNub from 'pubnub'
import { PubNubProvider } from 'pubnub-react'
import { useSelector } from 'react-redux'
import { WriteMessage } from './WriteMessage'
import { UpperMenu } from './UpperMenu'
import { CurrentDialog } from './CurrentDialog'
import { GoBackButton } from './GoBackButton'
import { LeftMenu } from './LeftMenu'
import { operatorEmailSelector } from '../redux/auth/selectors'
import { fetchCurrentDialogSelector } from '../redux/currentDialog/selectors'

export const ShowDialog = () => {
    const location = useLocation()

    const userEmail = useSelector(operatorEmailSelector)
    const fetchedDialog = useSelector(fetchCurrentDialogSelector)

    const clientID = location.pathname.split(':')[1]

    const pubnub = new PubNub({
        publishKey: process.env.REACT_APP_PUBLISH_KEY,
        subscribeKey: process.env.REACT_APP_SUBSCRIBE_KEY,
        uuid: userEmail,
    })

    return (
        <Container className="showDialog">
            <Row>
                <Col md={12}>
                    <UpperMenu />
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <LeftMenu />
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <h2>{fetchedDialog && fetchedDialog.clientName}</h2>
                        </Col>
                        <Col md={2}>
                            <GoBackButton />
                        </Col>
                    </Row>
                    <PubNubProvider client={pubnub}>
                        <Row>
                            <Col md={8}>
                                <CurrentDialog clientID={clientID} />
                            </Col>
                            <Col>
                                <WriteMessage
                                    userEmail={userEmail}
                                    clientID={clientID}
                                />
                            </Col>
                        </Row>
                    </PubNubProvider>
                </Col>
            </Row>
        </Container>
    )
}
