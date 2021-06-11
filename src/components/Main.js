import React from "react";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import * as jwt from "jsonwebtoken"
import {setTokenNotValid} from "../main/sagas/actionCreator";
import {useHistory} from "react-router-dom";
import {LeftSide} from "./LeftSide";
import {Col, Container, Row} from "react-bootstrap";
import {RightSide} from "./RightSide";

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
            <Row>
                <Col xs={4}>
                    <LeftSide/>
                </Col>
                <Col>
                    <RightSide/>
                </Col>
            </Row>
        </Container>
    )
}

export {Main}
