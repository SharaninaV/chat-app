import React from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {connect} from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignInAlt, faEnvelope, faKey} from '@fortawesome/free-solid-svg-icons'
import {loginRequest} from "../redux/auth/sagas/actionCreator";
import {Alert, Button, Col, Row} from "react-bootstrap";

const iconSignIn = <FontAwesomeIcon icon={faSignInAlt}/>
const iconEmail = < FontAwesomeIcon icon={faEnvelope}/>
const iconPassword = < FontAwesomeIcon icon={faKey}/>

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Email должен иметь общепринятый вид адреса электронной почты.")
        .required('Email должен быть введен.'),
    password: Yup.string().required('Пароль должен быть введен.'),
})

const initialValues = {
    email: '',
    password: '',
}

const AuthForm = ({loginRequest, submitErrors, successful, requesting}) => {

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        autocomplete: 'off',

        onSubmit(values) {
            loginRequest(values)
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="authForm">
            {submitErrors.message &&
            <Row>
                <Col>
                    <Alert variant="danger">
                        {submitErrors.message}
                    </Alert>
                </Col>
            </Row>
            }
            <Row className="form-input">
                <Col md={1}>
                    <label htmlFor="email" className="align-middle">Email:</label>
                </Col>
                <Col md={1} style={{textAlign: "right"}}>
                    <i className="align-middle">{iconEmail}</i>
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
                <Col md={1}>
                    <label htmlFor="password">Пароль:</label>
                </Col>
                <Col md={1} style={{textAlign: "right"}}>
                    <i className="align-middle">{iconPassword}</i>
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
            {formik.touched.password && formik.errors.password &&
            <Row>
                <Col>
                    <Alert variant="danger">
                        {formik.errors.password}
                    </Alert>
                </Col>
            </Row>
            }
            <Row className="justify-content-center">
                <Col md={3}>
                    <Button type="submit" variant="primary" className="form-button">
                        Войти
                        <i className="align-middle">{iconSignIn}</i>
                    </Button>
                </Col>
            </Row>
        </form>
    );
}
;

const mapStateToProps = state =>
{
    return {
        email: state.auth.email,
        password: state.auth.password,
        requesting: state.auth.requesting,
        successful: state.auth.successful,
        submitErrors: state.auth.errors,
    }
}


const mapDispatchToProps =
{
    loginRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
