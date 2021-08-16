import React from "react";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {
    Alert,
    Button,
    Col,
    Container, Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row
} from "reactstrap";
import {sendResetEmailRequest} from "../redux/forgotPassword/actionCreator";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";

const iconEmail = < FontAwesomeIcon icon={faEnvelope}/>

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

    const formik = useFormik({
        initialValues,
        autocomplete: 'off',
        validationSchema: validationSchema,

        onSubmit(values) {
            dispatch(sendResetEmailRequest(values.email))
            sendEmailNotification()
        },
    });

    const sendEmailNotification = () => toast.success("Письмо отправлено на почту");

    return (
        <Container className="forgotPassword">
            <Form onSubmit={formik.handleSubmit} >
                <h1 className="logo">ChatApp</h1>
                {formik.touched.email && formik.errors.email &&
                <Row>
                    <Col>
                        <Alert color="danger">
                            {formik.errors.email}
                        </Alert>
                    </Col>
                </Row>
                }
                <FormGroup>
                    <Row className="form-input justify-content-center">
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
                <Button className="form-button" outline color="primary" type="submit">Сбросить пароль</Button>
                <Row className="justify-content-center">
                    <Col md={5}>
                        <a href="/">
                            <p>Войти</p>
                        </a>
                    </Col>
                    <Col md={5}>
                        <a href="/registration">
                            <p>Регистрация</p>
                        </a>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}
