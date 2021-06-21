import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom"
import AuthForm from "./AuthForm";

const AuthWindow = () => {

    const isTokenValid = useSelector((state) => state.main.isTokenValid)
    const history = useHistory()
    useEffect(() => {
        if(isTokenValid) {
            history.push("/main")
        }
    },[isTokenValid])

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