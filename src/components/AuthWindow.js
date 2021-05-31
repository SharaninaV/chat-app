import React from "react";
import AuthForm from "./AuthForm";


const AuthWindow = () => {

    return (
        <div className="app container">
            <h1>ChatApp</h1>
            <AuthForm/>
            <a href="#" className="passw-link">Забыли пароль?</a>
            <a href="#" className="reg-link">Регистрация</a>
        </div>
    )
}

export {AuthWindow}