import React from "react";
import AuthForm from "./AuthForm";


const AuthWindow = () => {

    return (
        <div className="app container">
            <h1>ChatApp</h1>
            <AuthForm/>
            <div className="row justify-content-center">
                <div className="col-sm-6">
                    <a href="#" className="passw-link">
                        <p className="text-end">Забыли пароль?</p>
                    </a>
                </div>
                <div className="col-sm-6 reg-link">
                    <a href="#" className="">
                        <p>Регистрация</p>
                    </a>
                </div>
            </div>
        </div>
)
}

export {AuthWindow}