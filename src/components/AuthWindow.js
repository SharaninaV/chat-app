import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom"
import {Button, Col, Container, Row} from "react-bootstrap";
import AuthForm from "./AuthForm";
import {githubProvider, googleProvider} from "../firebase/authMethods";
import {setTokenIsValid} from "../redux/main/sagas/actionCreator";
import {smAuthRequest} from "../redux/auth/sagas/actionCreator";

const AuthWindow = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const isTokenValid = useSelector((state) => state.main.isTokenValid)

    const handleOnClick = (provider) => {
        dispatch(smAuthRequest(provider))
    }

    useEffect(() => {
        if (isTokenValid) {
            history.push("/main")
        }
    }, [isTokenValid])

    return (
        <Container className="auth">
            <h1>ChatApp</h1>
            <AuthForm/>
            <Row  className="justify-content-center">
                <Col md={3}>
                    Войти через:
                </Col>
            </Row>
            <Row className="d-flex justify-content-center">
                <Col md={4}>
                    <Button onClick={() => handleOnClick(googleProvider)}>Google</Button>
                    <Button onClick={() => handleOnClick(githubProvider)}>GitHub</Button>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={3}>
                    <a href="/registration">
                        <p>Регистрация</p>
                    </a>
                </Col>
                <Col md={3}>
                    <a href="#">
                        <p>Забыли пароль?</p>
                    </a>
                </Col>
            </Row>
        </Container>
    )
}

export {AuthWindow}
