import React from "react";
import {Alert, Button, Col, Row} from "react-bootstrap";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";

const initialValues = {
    password: '',
    confirmPassword: ''
}

const validationSchema = Yup.object({
    password: Yup.string()
        .required('Пароль должен быть введен.')
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$/,
            {message: 'Пароль должен содержать цифру, буквы в нижнем и верхнем регистре и иметь длину не менее 8 знаков'}),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null])
        .required('Password confirm is required')
})

export const ResetPassword = () => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues,
        autocomplete: 'off',
        validationSchema: validationSchema,

        onSubmit(values) {
            // dispatch(resetPasswordRequest(values))
            // history.push('/main')
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="registerForm">
            <h1>ChatApp</h1>
            <h2>Обновить пароль</h2>
            {formik.touched.password && formik.errors.password &&
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
                    <label htmlFor="password">Новый пароль:</label>
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
                    <Button type="submit" variant="primary" className="form-button">Обновить пароль</Button>
                </Col>
            </Row>
        </form>
    )
}
