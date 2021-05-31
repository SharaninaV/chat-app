import React from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {connect} from "react-redux";
import {loginRequest} from "../sagas/actionCreator";

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

const AuthForm = (props) => {

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        autocomplete: 'off',

        onSubmit(values) {
            props.loginRequest(values)
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="authForm">
            {props.submitErrors.message ? (
                <div className="row">
                    <div className="alert-danger col-sm-11">
                    {props.submitErrors.message}
                    </div>
                </div>
            ) : null}
            <div className="input form-group row">
                <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-12">
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
                {formik.touched.email && formik.errors.email ? (
                    <div className="alert-danger">
                        {formik.errors.email}
                    </div>) : null
                }
            </div>
            <div className="input form-group row">
                <label htmlFor="password" className="col-sm-2 col-form-label">Пароль</label>
                <div className="col-sm-12">
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    class="form-control"
                />
                </div>
                {formik.touched.password && formik.errors.password ? (
                    <div className="alert-danger">
                        {formik.errors.password}
                    </div>) : null
                }
            </div>
            <div className="btn-submit">
            <button type="submit" className="btn btn-primary">Войти</button>
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
        submitErrors: state.auth.errors
    }
}

const mapDispatchToProps = { loginRequest }

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
