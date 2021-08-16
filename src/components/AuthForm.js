import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignInAlt, faEnvelope, faKey, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import {
    Alert,
    Button,
    Col,
    Row,
    Form,
    FormGroup,
    Input,
    Container,
    InputGroupAddon,
    InputGroupText, InputGroup
} from 'reactstrap'
import {loginRequest, resetAuthErrors} from "../redux/auth/sagas/actionCreator";

const iconSignIn = <FontAwesomeIcon icon={faSignInAlt}/>
const iconEmail = < FontAwesomeIcon icon={faEnvelope}/>
const iconPassword = < FontAwesomeIcon icon={faKey}/>
const iconShowPassword = < FontAwesomeIcon icon={faEye}/>
const iconHidePassword = < FontAwesomeIcon icon={faEyeSlash}/>

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Email должен иметь общепринятый вид адреса электронной почты.")
        .required('Email должен быть введен.'),
    password: Yup.string()
        .required('Пароль должен быть введен.')
})

const initialValues = {
    email: '',
    password: '',
}

export const AuthForm = () => {

        const dispatch = useDispatch()
        const submitErrors = useSelector((state) => state.auth.errors)

    const [isShowPassword, setIsShowPassword] = useState(false);

        const formik = useFormik({
            initialValues,
            validationSchema: validationSchema,
            autocomplete: 'off',

            onSubmit(values) {
                dispatch(loginRequest(values))
            },
        });

        useEffect(() => {
            dispatch(resetAuthErrors())
        }, [])

        return (
            <Container className="authForm">
                <Form onSubmit={formik.handleSubmit}>
                    {submitErrors.message &&
                    <Row>
                        <Col>
                            <Alert color="danger">
                                Неверный email или пароль
                            </Alert>
                        </Col>
                    </Row>
                    }
                    <FormGroup>
                        <Row className="justify-content-center">
                            <Col md={10}>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText><i>{iconEmail}</i></InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        placeholder="Email"
                                        className="form-control"
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                    </FormGroup>
                    {formik.touched.email && formik.errors.email &&
                    <Row>
                        <Col>
                            <Alert variant="danger">
                                {formik.errors.email}
                            </Alert>
                        </Col>
                    </Row>
                    }
                    <FormGroup>
                        <Row className="justify-content-center">
                            <Col md={10}>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText><i>{iconPassword}</i></InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id="password"
                                        name="password"
                                        type={isShowPassword ? "text" : "password"}
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                        className="form-control"
                                        placeholder="Пароль"
                                    />
                                    <InputGroupAddon addonType="append" onClick={() => setIsShowPassword(prevState => !prevState)}>
                                        <InputGroupText>
                                            {isShowPassword ? iconHidePassword : iconShowPassword}
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Col>
                        </Row>
                    </FormGroup>
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
                        <Col>
                            <Button type="submit" outline color="primary" className="form-button">
                                Войти
                                <i className="btn-icon">{iconSignIn}</i>
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        );
    }
;
