import React from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {connect} from "react-redux";
import firebase from '../firebase/firebase'

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


const AuthForm = () => {

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        autocomplete: 'off',

        onSubmit(values) {
            alert(JSON.stringify(values, null, 2));

            firebase.auth().signInWithEmailAndPassword(formik.values.email, formik.values.password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    alert('success')
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert('failed')
                });
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

    console.log(state)
    return {
        email: state.auth.email,
        password: state.auth.password
    }
}

export default connect(mapStateToProps,null)(AuthForm);