import React, { ReactElement, ReactNode } from "react";
import classNames from "classnames";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { REGISTER } from "../../store/actions";

export default class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeField = this.handleChangeField.bind(this);
        this.regHandler = this.regHandler.bind(this);
        this.resetError = this.resetError.bind(this);
    }

    static propTypes = {
        children : propTypes.node,
        register : propTypes.func
    }

    state = {
        email : "",
        initials : "",
        setPassword : "",
        fullRegForm : false,
        emailCheck : /^([\w\d-\.\?]+)@[A-Z]{4,6}\.[A-Z]{2,4}$/i
    };

    handleChangeField(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    regHandler() {
        if (this.state.setPassword.length <= 8) {
            const setPassword = document.querySelector("#setPassword");
            setPassword.style.setProperty("border-color", "firebrick");
            return false;
        }

        if (this.state.initials.length <= 1) {
            const initials = document.querySelector("#initials");
            initials.style.setProperty("border-color", "firebrick");
            return false;
        }

        if (!this.state.emailCheck.test(this.state.email)) {
            const email = document.querySelector("#email");
            email.style.setProperty("border-color", "firebrick");
            return false;
        }
        this.props.register(this.state.email, this.state.initials, this.state.setPassword);
    }

    
    resetError(event) {
        const input = document.querySelector(`#${event.target.name}`);
        input.style.setProperty("border-color", "black");
    }

    render() {
        const btnClass = classNames({
            "loft__form-button" : !this.state.emailCheck.test(this.state.email) || this.state.setPassword.length <= 8 || this.state.initials.length === 0,
            "loft__form-button-filled" : this.state.emailCheck.test(this.state.email) && this.state.setPassword.length >= 8 && this.state.initials.length > 0
        });
        return(
            <div className = "authorize__block-form">
                <h2>Регистрация</h2>
                <input type = "text" name = "email" id = "email" data-testid = "email" className = "loft__form-input" value = { this.state.email } onChange = { this.handleChangeField } onFocus = { this.resetError }/>
                <label htmlFor = "email">Адрес электронной почты <sup>&#10057;</sup></label>
                <input type = "text" name = "initials" id = "initials" data-testid = "initials" className = "loft__form-input" value = { this.state.initials } onChange = { this.handleChangeField } onFocus = { this.resetError }/>
                <label htmlFor = "initials">Как вас зовут? <sup>&#10057;</sup></label>
                <input type = "password" name = "setPassword" id = "setPassword" data-testid = "setPassword" className = "loft__form-input" value = { this.state.setPassword } onChange = { this.handleChangeField } onFocus = { this.resetError }/>
                <label htmlFor = "setPassword">Придумайте пароль <sup>&#10057;</sup></label>
                <button className = { btnClass } type = "button" data-testid = "reg-button" disabled = { (btnClass === "loft__form-button") ? true : false } 
                onClick = { this.regHandler }>Зарегистрироваться</button>
                <div className = "loft__form-anchor">
                    { this.props.children }
                </div>
            </div>
        );
    }
}

export const RegisterFormWithAuth = connect(
    null,
    { register : REGISTER }
)(RegistrationForm);