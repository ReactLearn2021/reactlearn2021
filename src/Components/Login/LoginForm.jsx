import React, { ReactElement, ReactNode } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AUTHENTICATE } from "../../store/actions";
import { Formik, ErrorMessage, Form } from "formik";

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeField = this.handleChangeField.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
    }

    static propTypes = {
        children : PropTypes.node,
        authenticate : PropTypes.func
    }

    state = {
        loginFields : {
            login : "",
            password : ""
        },
        fullLoginForm : false,
        emailCheck : /^([\w\d-\.\?]+)@[A-Z]{4,6}\.[A-Z]{2,4}$/i
    };

    handleChangeField(event) {
        this.setState({ loginFields : { [event.target.name]: event.target.value }});
    }

    loginHandler() {
        window.event.preventDefault();
        if (!this.state.emailCheck.test(this.state.loginFields.login)) {
            const login = document.querySelector("#login");
            login.style.setProperty("border-color", "firebrick");
            return false;
        }

        if (this.state.loginFields.password.length < 8) {
            const password = document.querySelector("#password");
            password.style.setProperty("border-color", "firebrick");
            return false;
        }
        this.props.authenticate(this.state.loginFields.login, this.state.loginFields.password);
        // window.localStorage.setItem("view", "map");
    }

    render() {
        const btnClass = classNames({
            "loft__form-button" : !this.state.emailCheck.test(this.state.loginFields.login) || (this.state.loginFields.password && this.state.loginFields.password.length < 8),
            "loft__form-button-filled" : this.state.emailCheck.test(this.state.loginFields.login) && this.state.loginFields.password && this.state.loginFields.password.length >= 8
        });
        return(
            <Formik onSubmit = { this.loginHandler }
            initialValues = { { login : "", password : "" } }
            validate = { (values) => {
                console.info(values)
                const errors = {
                    login : "",
                    password : ""
                };
                if (!this.state.emailCheck.test(values.login)) {
                    errors.login = "Введен некоректный email";
                }

                if (values.password.length < 8) {
                    errors.password = "Введен некоректный пароль";
                }

                return errors;
            } }
            >{ ({ handleSubmit, touched, errors }) => {
                return(
                    <Form className = "authorize__block-form" onSubmit = { handleSubmit }>
                        <h2>Войти</h2>
                        <input type = "email" 
                        name = "login" 
                        id = "login" 
                        className = "loft__form-input" 
                        data-testid = "login"
                        autoComplete = "off"
                        value = { this.state.loginFields.login } 
                        onChange = { this.handleChangeField } />
                        <label htmlFor = "login">Имя пользователя <sup>&#10057;</sup></label>
                        <ErrorMessage name = "login" component = "div" />
                        <input type = "password" 
                        name = "password"
                        id = "password" 
                        className = "loft__form-input"
                        data-testid = "password"
                        autoComplete = "off"
                        value = { this.state.loginFields.password } 
                        onChange = { this.handleChangeField }/>
                        <label htmlFor = "password">Пароль <sup>&#10057;</sup></label>
                        <ErrorMessage name = "password" component = "div" />
                        <button className = { btnClass } type = "submit" data-testid = "login-button" disabled = { (btnClass === "loft__form-button") ? true : false }>Войти</button>
                        <div className = "loft__form-anchor">
                            { this.props.children }
                        </div>
                    </Form>
                )
            } }</Formik>
            
        );
    }
}

export const LoginFormWithAuth = connect(
    null,
    { authenticate : AUTHENTICATE }
)(LoginForm);