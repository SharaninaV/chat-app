import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import PubNub from "pubnub";
import {PubNubProvider} from "pubnub-react";
import {useSelector} from "react-redux";
import {WriteMessage} from "./WriteMessage";
import {UpperMenu} from "./UpperMenu";
import {CurrentDialog} from "./CurrentDialog";
import {GoBackButton} from "./GoBackButton";
import {LeftMenu} from "./LeftMenu";

export const ShowDialog = () => {

    const location = useLocation()
    const clientID = location.pathname.split(':')[1]
    const userEmail = useSelector((state) => state.auth.email)
    const fetchedDialog = useSelector((state) => state.fetchCurrentDialog.currentDialog)

    const pubnub = new PubNub({
        publishKey: process.env.REACT_APP_PUBLISH_KEY,
        subscribeKey: process.env.REACT_APP_SUBSCRIBE_KEY,
        uuid: userEmail
    })

    return (
        <Container className='main'>
            <Row>
                <Col md={12}>
                    <UpperMenu/>
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <LeftMenu/>
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <h3>{fetchedDialog && fetchedDialog.clientName}</h3>
                        </Col>
                        <Col md={2}>
                            <GoBackButton/>
                        </Col>
                    </Row>
                    <PubNubProvider client={pubnub}>
                        <CurrentDialog clientID={clientID}/>
                        <WriteMessage userEmail={userEmail} clientID={clientID}/>
                    </PubNubProvider>
                </Col>
            </Row>
        </Container>
    )
}
