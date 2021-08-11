import React from "react";
import {Alert, Button, Col, Row} from "react-bootstrap";
import {useFormik} from "formik";
import * as Yup from "yup";
import {registrationRequest} from "../redux/registration/actionCreator";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
}

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Email должен иметь общепринятый вид адреса электронной почты.")
        .required('Email должен быть введен.'),
    password: Yup.string()
        .required('Пароль должен быть введен.')
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$/,
            {message: 'Пароль должен содержать цифру, буквы в нижнем и верхнем регистре и иметь длину не менее 8 знаков'}),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null])
        .required('Password confirm is required')
})

export const Registration = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const formik = useFormik({
        initialValues,
        autocomplete: 'off',
        validationSchema: validationSchema,

        onSubmit(values) {
            dispatch(registrationRequest(values))
            history.push('/main')
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className="registerForm">
            <h1>ChatApp</h1>
            <h2>Регистрация</h2>
            {formik.touched.email && formik.errors.email &&
            <Row>
                <Col>
                    <Alert variant="danger">
                        {formik.errors.email}
                    </Alert>
                </Col>
            </Row> ||
            formik.touched.password && formik.errors.password &&
            <Row>
                <Col>
                    <Alert variant="danger">
                        {formik.errors.password}
                    </Alert>
                </Col>
            </Row> ||
            formik.touched.confirmPassword && formik.errors.confirmPassword &&
            <Row>
                <Col>
                    <Alert variant="danger">
                        {formik.errors.confirmPassword}
                    </Alert>
                </Col>
            </Row>
            }
            <Row className="form-input">
                <Col md={2}>
                    <label htmlFor="name" className="align-middle">Имя:</label>
                </Col>
                <Col md={10}>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        placeholder="Имя"
                        className="form-control"
                    />
                </Col>
            </Row>
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
                        value={formik.values.confirmPassword}
                        className="form-control"
                    />
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={3}>
                    <Button type="submit" variant="primary" className="form-button">Регистрация</Button>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={3}>
                    <a href="/">
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
