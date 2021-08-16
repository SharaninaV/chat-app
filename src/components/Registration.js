import React, {useEffect, useState} from "react";
import {
    Alert,
    Button,
    Col,
    Row,
    Container,
    Form,
    FormGroup,
    InputGroup,
    Label,
    Input,
    InputGroupAddon, InputGroupText
} from "reactstrap";
import {useFormik} from "formik";
import * as Yup from "yup";
import {registrationRequest} from "../redux/registration/actionCreator";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

const iconShowPassword = < FontAwesomeIcon icon={faEye}/>
const iconHidePassword = < FontAwesomeIcon icon={faEyeSlash}/>

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
        .oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
        .required('Password confirm is required')
})

export const Registration = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const isRegistrationSuccessful = useSelector((state) => state.registration.isRegistrationSuccessful)

    const [isShowPassword, setIsShowPassword] = useState(false);

    const formik = useFormik({
        initialValues,
        autocomplete: 'off',
        validationSchema: validationSchema,

        onSubmit(values) {
            dispatch(registrationRequest(values))
            history.push('/main')
        },
    });

    useEffect(() => {
        if (isRegistrationSuccessful)
            toast.success('Регистрация прошла успешно!')
    }, [isRegistrationSuccessful])

    return (
        <Container className="registerForm">
            <Form onSubmit={formik.handleSubmit}>
                <h1 className="logo">ChatApp</h1>
                {formik.touched.email && formik.errors.email &&
                <Row>
                    <Col>
                        <Alert color="danger">
                            {formik.errors.email}
                        </Alert>
                    </Col>
                </Row> ||
                formik.touched.password && formik.errors.password &&
                <Row>
                    <Col>
                        <Alert color="danger">
                            {formik.errors.password}
                        </Alert>
                    </Col>
                </Row> ||
                formik.touched.confirmPassword && formik.errors.confirmPassword &&
                <Row>
                    <Col>
                        <Alert color="danger">
                            {formik.errors.confirmPassword}
                        </Alert>
                    </Col>
                </Row>
                }
                <FormGroup className="item">
                    <Col md={11}>
                        <InputGroup>
                            <Col md={4}>
                                <Label htmlFor="name" className="align-middle">Имя:</Label>
                            </Col>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                className="form-control"
                            />
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup className="item">
                    <Col md={11}>
                        <InputGroup>
                            <Col md={4}>
                                <Label htmlFor="email" className="align-middle">Email:</Label>
                            </Col>
                            <Input
                                id="email"
                                name="email"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                className="form-control"
                            />
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup className="item">
                    <Col md={11}>
                        <InputGroup>
                            <Col md={4}>
                                <Label htmlFor="password">Пароль:</Label>
                            </Col>
                            <Input
                                id="password"
                                name="password"
                                type={isShowPassword ? "text" : "password"}
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                className="form-control"
                            />
                            <InputGroupAddon addonType="append"
                                             onClick={() => setIsShowPassword(prevState => !prevState)}>
                                <InputGroupText>
                                    {isShowPassword ? iconHidePassword : iconShowPassword}
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup className="item">
                    <Col md={11}>
                        <InputGroup>
                            <Col md={4}>
                                <Label htmlFor="confirmPassword">Подтверждение <br/> пароля:</Label>
                            </Col>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={isShowPassword ? "text" : "password"}
                                onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                                className="form-control"
                            />
                            <InputGroupAddon addonType="append"
                                             onClick={() => setIsShowPassword(prevState => !prevState)}>
                                <InputGroupText>
                                    {isShowPassword ? iconHidePassword : iconShowPassword}
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <Row className="justify-content-center">
                    <Col>
                        <Button type="submit" outline color="primary" className="form-button">Регистрация</Button>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={5}>
                        <a href="/">
                            <p className="text-end">Войти</p>
                        </a>
                    </Col>
                    <Col md={5}>
                        <a href="/forgotPassword">
                            <p>Забыли пароль?</p>
                        </a>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}
