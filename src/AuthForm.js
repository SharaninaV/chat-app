import React from "react";
import { useFormik } from "formik";

const AuthForm = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values,null,2));
        },
    });

    return(
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="Email"
            />
            <label htmlFor="password">Password</label>
            <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export { AuthForm };