import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import {WriteMessage} from "./WriteMessage";
import {UpperMenu} from "./UpperMenu";
import {CurrentDialog} from "./CurrentDialog";
import {GoBackButton} from "./GoBackButton";
import {useLocation} from "react-router-dom";
import PubNub from "pubnub";
import {PubNubProvider} from "pubnub-react";
import {useSelector} from "react-redux";

export const ShowDialog = () => {

    const location = useLocation()
    const clientID = location.pathname.split(':')[1]
    const userEmail = useSelector((state) => state.auth.email)

    const pubnub = new PubNub({
        publishKey: process.env.REACT_APP_PUBLISH_KEY,
        subscribeKey: process.env.REACT_APP_SUBSCRIBE_KEY,
        uuid: userEmail
    })

    return(
        <Container>
            <Row>
                <Col md={10}>
                    <UpperMenu/>
                </Col>
                <Col>
                    <GoBackButton />
                </Col>
            </Row>
            <h3>{clientID}</h3>
            <CurrentDialog />
            <PubNubProvider client={pubnub}>
            <WriteMessage  userEmail={userEmail}/>
            </PubNubProvider>
        </Container>
    )
}
