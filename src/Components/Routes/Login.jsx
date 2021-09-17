import { LoginFormWithAuth } from "../Login/LoginForm";
import React from "react";
import { Link } from "react-router-dom";

export const Login = (props) => {
    return (
        <div className = "authorize__block">
            <LoginFormWithAuth {...props}>
                <span>Новый пользователь? 
                    <Link to = "/register" data-testid = "register-link">Зарегистрироваться</Link>
                </span>
            </LoginFormWithAuth> 
        </div>
    );
};