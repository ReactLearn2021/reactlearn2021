import React, { ReactElement, ReactNode } from "react";
import classNames from "classnames";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { REGISTER } from "../../store/actions";
import { Formik, ErrorMessage, Form } from "formik";

export default class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeField = this.handleChangeField.bind(this);
        this.regHandler = this.regHandler.bind(this);
    }

    static propTypes = {
        children : propTypes.node,
        register : propTypes.func
    }

    state = {
        regFields : {
            email : "",
            initials : "",
            setPassword : ""
        },
        fullRegForm : false,
        emailCheck : /^([\w\d-\.\?]+)@[A-Z]{4,6}\.[A-Z]{2,4}$/i
    };

    handleChangeField(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    regHandler() {
        if (this.state.regFields.setPassword.length <= 8) return false;

        if (this.state.regFields.initials.length <= 1) return false;

        if (!this.state.emailCheck.test(this.state.regFields.email)) return false;
        
        this.props.register(this.state.regFields.email, this.state.regFields.initials, this.state.regFields.setPassword);
    }

    render() {
        return(
            <React.Fragment>
                <Formik onSubmit = { (values) => { return this.regHandler(values) } } 
                initialValues = { { email : "", initials : "", setPassword : "" } }
                validate = { (values) => {
                    const errors = {};
                    if (!this.state.emailCheck.test(values.email)) {
                        errors.login = "Введен некоректный email";
                    }

                    if (values.setPassword.length < 8) {
                        errors.password = "Введен некоректный пароль";
                    }

                    if (values.initials.length < 1) {
                        errors.initials = "Введено некорретное имя пользователя";
                    }

                    return errors;
                } }
                >{ ({ handleChange, handleBlur, values }) => {
                    const btnClass = classNames({
                        "loft__form-button" : !this.state.emailCheck.test(values.email) || values.setPassword.length <= 8 || values.initials.length < 1,
                        "loft__form-button-filled" : this.state.emailCheck.test(values.email) && values.setPassword.length >= 8 && values.initials.length > 0
                    });
                    return(
                    <Form className = "authorize__block-form">
                        <h2>Регистрация</h2>
                        <input type = "text" 
                        name = "email" 
                        id = "email" 
                        data-testid = "email" 
                        className = "loft__form-input"
                        autoComplete = "off"
                        onBlur = { handleBlur }
                        onChange = { handleChange } 
                        value = { values.email } />
                        <label htmlFor = "email">Адрес электронной почты <sup>&#10057;</sup></label>
                        <ErrorMessage name = "email" component = "p" className = "error-message" />
                        <input type = "text" 
                        name = "initials" 
                        id = "initials" 
                        data-testid = "initials" 
                        className = "loft__form-input" 
                        autoComplete = "off"
                        onBlur = { handleBlur }
                        onChange = { handleChange }
                        value = { values.initials } />
                        <label htmlFor = "initials">Как вас зовут? <sup>&#10057;</sup></label>
                        <ErrorMessage name = "initials" component = "p" className = "error-message" />
                        <input type = "text" 
                        name = "setPassword" 
                        id = "setPassword" 
                        data-testid = "setPassword" 
                        className = "loft__form-input" 
                        autoComplete = "off"
                        onBlur = { handleBlur }
                        onChange = { handleChange }
                        value = { values.setPassword } />
                        <label htmlFor = "setPassword">Придумайте пароль <sup>&#10057;</sup></label>
                        <ErrorMessage name = "setPassword" component = "p" className = "error-message" />
                        <button className = { btnClass } type = "submit" data-testid = "reg-button" disabled = { (btnClass === "loft__form-button") ? true : false }>Зарегистрироваться</button>
                        <div className = "loft__form-anchor">
                            { this.props.children }
                        </div>
                    </Form>
                );
            }}  </Formik>               
            </React.Fragment>
    );
    }
}

export const RegisterFormWithAuth = connect(
    null,
    { register : REGISTER }
)(RegistrationForm);