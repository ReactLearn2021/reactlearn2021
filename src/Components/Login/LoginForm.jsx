import React, { ReactElement, ReactNode } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withAuth } from "../AuthContext";

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeField = this.handleChangeField.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.resetError = this.resetError.bind(this);
    }

    static propTypes = {
        children : PropTypes.node,
        logIn : PropTypes.func
    }

    state = {
        login : "",
        password : "",
        fullLoginForm : false,
        emailCheck : /^([\w\d-\.\?]+)@[A-Z]{4,6}\.[A-Z]{2,4}$/i
    };

    handleChangeField(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    loginHandler() {
        if (!this.state.emailCheck.test(this.state.login)) {
            const login = document.querySelector("#login");
            login.style.setProperty("border-color", "firebrick");
            return false;
        }
        console.info(this.state.password.length)

        if (this.state.password.length < 8) {
            const password = document.querySelector("#password");
            password.style.setProperty("border-color", "firebrick");
            return false;
        }
        this.props.logIn(this.state.login, this.state.password);
        // window.localStorage.setItem("view", "map");
        // window.location.reload();
    }

    
    resetError(event) {
        const input = document.querySelector(`#${event.target.name}`);
        input.style.setProperty("border-color", "black");
    }

    render() {
        const btnClass = classNames({
            "loft__form-button" : !this.state.emailCheck.test(this.state.login) || this.state.password.length <= 8,
            "loft__form-button-filled" : this.state.emailCheck.test(this.state.login) && this.state.password.length >= 8
        });
        return(
            <div className = "authorize__block-form">
                <h2>Войти</h2>
                <input type = "text" name = "login" id = "login" data-testid = "login" className = "loft__form-input" value = { this.state.login } onChange = { this.handleChangeField } onFocus = { this.resetError }/> {/* this нужен потому что классовый компонент */}
                <label htmlFor = "login">Имя пользователя <sup>&#10057;</sup></label>
                <input type = "password" name = "password" id = "password" data-testid = "password" className = "loft__form-input" value = { this.state.password } onChange = { this.handleChangeField } onFocus = { this.resetError }/> 
                <label htmlFor = "password">Пароль <sup>&#10057;</sup></label>
                <button className = { btnClass } type = "button" data-testid = "login-button" disabled = { (btnClass === "loft__form-button") ? true : false } 
                onClick = { this.loginHandler }>Войти</button>
                <div className = "loft__form-anchor">
                    { this.props.children }
                </div>
            </div>
        )
    }
}

export const LoginFormWithAuth = withAuth(LoginForm);