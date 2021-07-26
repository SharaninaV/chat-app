import React from "react";
import {Button, Col, Row} from "react-bootstrap";
import {useFormik} from "formik";

const initialValues = {
    email: '',
    password: '',
}

export const Registration = () => {

    const formik = useFormik({
        initialValues,
        autocomplete: 'off',

        onSubmit(values) {
            // registrationRequest(values)
        },
    });
    return (
            <form onSubmit={formik.handleSubmit} className="registerForm">
                <h1>ChatApp</h1>
                <Row className="form-input">
                    <Col md={2}>
                        <label htmlFor="email" className="align-middle">Email:</label>
                    </Col>
                    <Col md={10}>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            placeholder="Email"
                            className="form-control"
                        />
                    </Col>
                </Row>
                <Row className="form-input">
                    <Col md={2}>
                        <label htmlFor="password">Пароль:</label>
                    </Col>
                    <Col md={10}>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            className="form-control"
                        />
                    </Col>
                </Row>
                <Row className="form-input">
                    <Col md={2}>
                        <label htmlFor="confirmPassword">Подтверждение <br/> пароля:</label>
                    </Col>
                    <Col md={10}>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            className="form-control"
                        />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={3}>
                    <Button className="form-button">Регистрация</Button>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={3}>
                        <a href="#">
                            <p className="text-end">Войти</p>
                        </a>
                    </Col>
                    <Col md={3}>
                        <a href="#">
                            <p>Забыли пароль?</p>
                        </a>
                    </Col>
                </Row>
            </form>
    )
}
