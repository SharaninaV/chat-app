import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom"
import {Button, Col, Container, Row} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGoogle, faGithub} from "@fortawesome/free-brands-svg-icons";
import {githubProvider, googleProvider} from "../firebase/authMethods";
import {AuthForm} from "./AuthForm";
import {smAuthRequest} from "../redux/auth/sagas/actionCreator";

const iconGoogle = <FontAwesomeIcon icon={faGoogle}/>
const iconGithub = <FontAwesomeIcon icon={faGithub}/>

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
                <Col>
                    <p>
                    Войти с помощью:
                    </p>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center">
                <Col>
                    <Button className="google-btn" onClick={() => handleOnClick(googleProvider)}>
                        Google
                        <i className="auth-icon">{iconGoogle}</i>
                    </Button>
                    <Button className="github-btn" onClick={() => handleOnClick(githubProvider)}>
                        GitHub
                        <i className="auth-icon">{iconGithub}</i>
                    </Button>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={5}>
                    <a href="/registration">
                        <p>Регистрация</p>
                    </a>
                </Col>
                <Col md={5}>
                    <a href="/forgotPassword">
                        <p>Забыли пароль?</p>
                    </a>
                </Col>
            </Row>
        </Container>
    )
}

export {AuthWindow}
