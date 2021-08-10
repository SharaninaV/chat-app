import React from "react";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import * as jwt from "jsonwebtoken"
import {useHistory} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import {setTokenNotValid} from "../redux/main/sagas/actionCreator";
import {UpperMenu} from "./UpperMenu";
import {SearchInUsers} from "./SearchInUsers";
import {SearchInMessages} from "./SearchInMessages";
import {Dialogs} from "./Dialogs";
import {fetchDialogsSettingsRequest} from "../redux/dialogsSettings/actionCreator";

export const Main = () => {

    const currentUserToken = useSelector((state) => state.auth.token)
    const operatorEmail = useSelector((state) => state.auth.email)
    const dispatch = useDispatch()
    const history = useHistory()

    const operatorID = window.btoa(operatorEmail)

    useEffect(() => {
        if (currentUserToken) {
            const decoded = jwt.decode(currentUserToken.i, {complete: true})
            if (!decoded) {
                dispatch(setTokenNotValid())
                history.push("/")
            } else {
                const expireTime = decoded.payload.exp
                const currentTime = Math.floor(Date.now() / 1000)
                if (currentTime >= expireTime) {
                    dispatch(setTokenNotValid())
                    history.push("/")
                }
            }
        }
        dispatch(fetchDialogsSettingsRequest(operatorID))
    }, [])

    return (
        <Container className="main">
            <UpperMenu/>
            <Row>
                <Col>
                    <SearchInUsers/>
                </Col>
                <Col>
                    <SearchInMessages/>
                </Col>
            </Row>
            <Dialogs/>
        </Container>
    )
}
