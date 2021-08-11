import React from "react";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {Alert, Button, Col, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {sendResetEmailRequest} from "../redux/forgotPassword/actionCreator";

const initialValues = {
    email: ''
}

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Email должен иметь общепринятый вид адреса электронной почты.")
        .required('Email должен быть введен.')
})

export const ForgotPassword = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const formik = useFormik({
        initialValues,
        autocomplete: 'off',
        validationSchema: validationSchema,

        onSubmit(values) {
            dispatch(sendResetEmailRequest(values.email))
            // history.push('/newPassword')
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="registerForm">
            <h1>ChatApp</h1>
            <h2>Восстановление пароля</h2>
            {formik.touched.email && formik.errors.email &&
            <Row>
                <Col>
                    <Alert variant="danger">
                        {formik.errors.email}
                    </Alert>
                </Col>
            </Row>
            }
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
            <Button className="form-btn" type="submit">Отправить ссылку для восстановления</Button>
        </form>
    )
}
