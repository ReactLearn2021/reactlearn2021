import React from "react";
import { Link } from "react-router-dom";
import { RegisterFormWithAuth } from "../Login/RegistrationForm";

export const Register = (props) => {
    return (
        <div className = "authorize__block">
            <RegisterFormWithAuth {...props}>
                <span>Уже зарегистрированы? 
                    <Link to = "/login">Войти</Link>
                </span>
            </RegisterFormWithAuth>
        </div>
    );
};