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
        <Container>
            <Row>
                <Col md={10}>
                    <UpperMenu/>
                </Col>
                <Col>
                    <GoBackButton/>
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <LeftMenu/>
                </Col>
                <Col>
                    <h3>{fetchedDialog && fetchedDialog.clientName}</h3>
                    <CurrentDialog/>
                    <PubNubProvider client={pubnub}>
                        <WriteMessage userEmail={userEmail} clientID={clientID}/>
                    </PubNubProvider>
                </Col>
            </Row>
        </Container>
    )
}
