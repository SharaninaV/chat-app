import React, { useEffect, useState } from 'react'
import {
    Alert,
    Button,
    Col,
    Container,
    Row,
    Form,
    InputGroup,
    FormGroup,
    Label,
    Input,
    InputGroupText,
    InputGroupAddon,
} from 'reactstrap'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as queryString from 'query-string'
import { useHistory, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { resetPasswordRequest } from '../redux/resetPassword/actionCreator'
import { isResetSuccessfulSelector } from '../redux/resetPassword/selectors'

const iconShowPassword = <FontAwesomeIcon icon={faEye} />
const iconHidePassword = <FontAwesomeIcon icon={faEyeSlash} />

const initialValues = {
    password: '',
    confirmPassword: '',
}

const validationSchema = Yup.object({
    password: Yup.string()
        .required('Пароль должен быть введен.')
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$/, {
            message:
                'Пароль должен содержать цифру, буквы в нижнем и верхнем регистре и иметь длину не менее 8 знаков',
        }),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
        .required('Повторите пароль.'),
})

export const ResetPassword = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()

    const isResetSuccessful = useSelector(isResetSuccessfulSelector)

    const [isShowPassword, setIsShowPassword] = useState(false)

    const formik = useFormik({
        initialValues,
        autocomplete: 'off',
        validationSchema: validationSchema,

        onSubmit(values) {
            const code = queryString.parse(location.search).oobCode
            dispatch(resetPasswordRequest(code, values.password))
        },
    })

    useEffect(() => {
        if (isResetSuccessful) {
            toast.success('Пароль успешно изменен! Войдите под новым паролем.')
            history.push('/')
        }
    }, [isResetSuccessful])

    return (
        <Container>
            <Form onSubmit={formik.handleSubmit} className="registerForm">
                <h1 className="logo">ChatApp</h1>
                {(formik.touched.password && formik.errors.password && (
                    <Row>
                        <Col>
                            <Alert color="danger">
                                {formik.errors.password}
                            </Alert>
                        </Col>
                    </Row>
                )) ||
                    (formik.touched.confirmPassword &&
                        formik.errors.confirmPassword && (
                            <Row>
                                <Col>
                                    <Alert color="danger">
                                        {formik.errors.confirmPassword}
                                    </Alert>
                                </Col>
                            </Row>
                        ))}
                <FormGroup className="item">
                    <Col md={11}>
                        <InputGroup>
                            <Col md={4}>
                                <Label htmlFor="password">Новый пароль:</Label>
                            </Col>
                            <Input
                                id="password"
                                name="password"
                                type={isShowPassword ? 'text' : 'password'}
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                className="form-control"
                            />
                            <InputGroupAddon
                                addonType="append"
                                onClick={() =>
                                    setIsShowPassword((prevState) => !prevState)
                                }
                            >
                                <InputGroupText>
                                    {isShowPassword
                                        ? iconHidePassword
                                        : iconShowPassword}
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup className="item">
                    <Col md={11}>
                        <InputGroup>
                            <Col md={4}>
                                <label htmlFor="confirmPassword">
                                    Подтверждение <br /> пароля:
                                </label>
                            </Col>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={isShowPassword ? 'text' : 'password'}
                                onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                                className="form-control"
                            />
                            <InputGroupAddon
                                addonType="append"
                                onClick={() =>
                                    setIsShowPassword((prevState) => !prevState)
                                }
                            >
                                <InputGroupText>
                                    {isShowPassword
                                        ? iconHidePassword
                                        : iconShowPassword}
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <Row className="justify-content-center">
                    <Col md={3}>
                        <Button type="submit" outline className="form-button">
                            Обновить пароль
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}
