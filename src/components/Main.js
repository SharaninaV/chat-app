import React from "react";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import * as jwt from "jsonwebtoken"
import {useHistory} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import {setTokenNotValid} from "../main/sagas/actionCreator";
import {UpperMenu} from "./UpperMenu";
import {SearchInUsers} from "./SearchInUsers";
import {SearchInMessages} from "./SearchInMessages";
import {Dialogs} from "./Dialogs";

const Main = () => {

    const currentUserToken = useSelector((state) => state.auth.token)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
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
    }, [])

    return (
        <Container>
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

export {Main}
