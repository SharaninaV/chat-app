import React from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {connect, useSelector} from "react-redux";
import {loginRequest} from "../auth/sagas/actionCreator";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignInAlt, faEnvelope, faKey} from '@fortawesome/free-solid-svg-icons'

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

const AuthForm = ({loginRequest,submitErrors,successful,requesting}) => {

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
                <div className="row">
                    <div className="alert-danger col-sm-11">
                        {submitErrors.message}
                    </div>
                </div>
            }
            {successful && !requesting &&
                <div className="row">
                    <div className="alert-success col-sm-11">
                        Авторизация прошла успешно!
                    </div>
                </div>
            }
            <div className="input form-group row">
                <label htmlFor="email" className="col-sm-2 col-form-label d-flex">Email:
                </label>
                <div className="col-sm-10 d-flex">
                    <div className="me-3">
                        <i className="align-middle">{iconEmail}</i>
                    </div>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        placeholder="Email"
                        class="form-control"
                    />
                </div>
                {formik.touched.email && formik.errors.email &&
                    <div className="alert-danger">
                        {formik.errors.email}
                    </div>
                }
            </div>
            <div className="input form-group row">
                <label htmlFor="password" className="col-sm-2 col-form-label">Пароль:
                </label>
                <div className="col-sm-10 d-flex">
                    <div className="me-3">
                        <i className="align-middle">{iconPassword}</i>
                    </div>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        class="form-control"
                    />
                </div>
                {formik.touched.password && formik.errors.password &&
                    <div className="alert-danger">
                        {formik.errors.password}
                    </div>
                }
            </div>
            <div className="btn-submit">
                <button type="submit" className="btn btn-primary">
                    Войти
                    <i className="ms-2">{iconSignIn}</i>
                </button>
            </div>
        </form>
    );
};

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        requesting: state.auth.requesting,
        successful: state.auth.successful,
        submitErrors: state.auth.errors,
    }
}


const mapDispatchToProps = {loginRequest}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
