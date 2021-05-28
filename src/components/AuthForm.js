import React from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {connect} from "react-redux";
import '../firebase/authFirebase'
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
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder="Email"
                />
                {formik.touched.email && formik.errors.email ? (
                    <div>
                        {formik.errors.email}
                    </div>) : null
                }
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div>
                        {formik.errors.password}
                    </div>) : null
                }
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

const mapStateToProps = state => {
    return {
        email: state.email,
        password: state.password
    }
}

const mapDispatchToProps = { loginRequest }

export default connect(mapStateToProps,mapDispatchToProps)(AuthForm);
