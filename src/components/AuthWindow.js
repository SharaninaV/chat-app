import React from "react";
import AuthForm from "./AuthForm";


const AuthWindow = () => {

    return (
        <div>
            <h1>ChatApp</h1>
            <AuthForm/>
            <a href="#">Забыли пароль?</a>
            <a href="#">Регистрация</a>
        </div>
    )
}

export { AuthWindow }