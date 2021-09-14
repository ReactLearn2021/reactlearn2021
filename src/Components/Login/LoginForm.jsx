import React, { ReactElement, ReactNode } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AUTHENTICATE } from "../../store/actions";
import { Formik, ErrorMessage, Form, Field } from "formik";

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        // this.handleChangeField = this.handleChangeField.bind(this);
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

    // handleChangeField(event) {
    //     this.setState({ loginFields : { [event.target.name]: event.target.value }});
    // }

    loginHandler(values) {
        console.info(values)
        window.event.preventDefault();
        if (!this.state.emailCheck.test(values.login)) return false;

        if (values.password.length < 8) return false;
        
        this.props.authenticate(values.login, values.password);
        // window.localStorage.setItem("view", "map");
    }

    render() {
        return(
            <Formik onSubmit = { (values) => { return this.loginHandler(values) } }
            initialValues = { { login : "", password : "" } }
            validate = { (values) => {
                const errors = {};
                if (!this.state.emailCheck.test(values.login)) {
                    errors.login = "Введен некоректный email";
                }

                if (values.password.length < 8) {
                    errors.password = "Введен некоректный пароль";
                }

                return errors;
            } }
            >{ ({ handleChange, handleBlur, values }) => {
                const btnClass = classNames({
                    "loft__form-button" : !this.state.emailCheck.test(values.login) || (values.password.length < 8),
                    "loft__form-button-filled" : this.state.emailCheck.test(values.login) && values.password.length >= 8
                });
                return(
                    <Form className = "authorize__block-form">
                        <h2>Войти</h2>
                        <Field type = "email" 
                        name = "login" 
                        id = "login" 
                        className = "loft__form-input" 
                        data-testid = "login"
                        autoComplete = "off"
                        onBlur = { handleBlur }
                        onChange = { handleChange }
                        value = { values.login }/>
                        <label htmlFor = "login">Имя пользователя <sup>&#10057;</sup></label>
                        <ErrorMessage name = "login" component = "p" className = "error-message" />
                        <Field type = "password" 
                        name = "password"
                        id = "password" 
                        className = "loft__form-input"
                        data-testid = "password"
                        autoComplete = "off" 
                        onBlur = { handleBlur }
                        onChange = { handleChange }
                        value = { values.password }/>
                        <label htmlFor = "password">Пароль <sup>&#10057;</sup></label>
                        <ErrorMessage name = "password" component = "p" className = "error-message" />
                        <button className = { btnClass } type = "submit" data-testid = "login-button" disabled = { (btnClass === "loft__form-button") ? true : false }>Войти</button>
                        <div className = "loft__form-anchor">
                            { this.props.children }
                        </div>
                    </Form>
                );
            } }</Formik>
            
        );
    }
}

export const LoginFormWithAuth = connect(
    null,
    { authenticate : AUTHENTICATE }
)(LoginForm);