import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom"
import {Col, Container, Row} from "react-bootstrap";
import AuthForm from "./AuthForm";

const AuthWindow = () => {

    const isTokenValid = useSelector((state) => state.main.isTokenValid)
    const history = useHistory()
    useEffect(() => {
        if (isTokenValid) {
            history.push("/main")
        }
    }, [isTokenValid])

    return (
        <Container className="app">
            <h1>ChatApp</h1>
            <AuthForm/>
            <Row className="justify-content-center">
                <Col md={3}>
                    <a href="#">
                        <p className="text-end">Забыли пароль?</p>
                    </a>
                </Col>
                <Col md={3}>
                    <a href="#">
                        <p>Регистрация</p>
                    </a>
                </Col>
            </Row>
        </Container>
    )
}

export {AuthWindow}