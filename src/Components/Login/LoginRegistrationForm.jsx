import React, { ReactElement, ReactNode } from "react";

const Views = {
    LOGIN : "LOGIN",
    REG : "REG"
}

export default class LoginRegistrationForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleChangeField = this.handleChangeField.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.changeCurrentView = this.changeCurrentView.bind(this);
        this.regHandler = this.regHandler.bind(this);
        this.resetError = this.resetError.bind(this);
    }

    state = {
        login : "",
        password : "",
        email : "",
        initials : "",
        setPassword : "",
        fullLoginForm : false,
        fullRegForm : false,
        loginButton : "loft__form-button",
        regButton : "loft__form-button",
        currentView : Views.LOGIN,
        emailCheck : /^([\w\d-\.\?]+)@[A-Z]{4,6}\.[A-Z]{2,4}$/i
    };

    changeCurrentView(param) {
        if (this.state.currentView == Views.LOGIN) {
            this.setState({ currentView : Views.REG });
        } else {
            this.setState({ currentView : Views.LOGIN });
        }
    }

    handleChangeField(event) {
        this.setState({ [event.target.name]: event.target.value });

        if (this.state.emailCheck.test(this.state.login) && this.state.password.length >= 8) {
            this.setState({ loginButton : "loft__form-button-filled" });
        } else if (this.state.loginButton == "loft__form-button") {
            return;
        } else {
            this.setState({ loginButton : "loft__form-button" }); // не использовать изменения состояния в методах жизненного цикла
        }

        if (this.state.emailCheck.test(this.state.email) && this.state.setPassword.length >= 8 && this.state.initials.length > 0) {
            this.setState({ regButton : "loft__form-button-filled" });
        } else if (this.state.regButton == "loft__form-button") {
            return;
        } else {
            this.setState({ regButton : "loft__form-button" }); // не использовать изменения состояния в методах жизненного цикла
        }
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
        window.localStorage.setItem("view", "map");
        window.location.reload();
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
        return true;
    }

    resetError(event) {
        const input = document.querySelector(`#${event.target.name}`);
        input.style.setProperty("border-color", "black");
    }

    render() {
        // const login = this.state.login;
        return(
            <div className = "authorize__block">
                {
                    {
                        LOGIN : <div className = "authorize__block-form">
                            <h2>Войти</h2>
                            <input type = "text" name = "login" id = "login" className = "loft__form-input" value = { this.state.login } onChange = { this.handleChangeField } onFocus = { this.resetError }/> {/* this нужен потому что классовый компонент */}
                            <label htmlFor = "login">Имя пользователя <sup>&#10057;</sup></label>
                            <input type = "password" name = "password" id = "password" className = "loft__form-input" value = { this.state.password } onChange = { this.handleChangeField } onFocus = { this.resetError }/> 
                            <label htmlFor = "password">Пароль <sup>&#10057;</sup></label>
                            <button className = { this.state.loginButton } type = "button" onClick = { this.loginHandler }>Войти</button>
                            <div className = "loft__form-anchor">
                                <span>Новый пользователь? <a onClick = { () => this.changeCurrentView("Param") }>Зарегистрироваться</a></span>
                            </div>
                        </div>
                        ,
                        REG : <div className = "authorize__block-form">
                            <h2>Регистрация</h2>
                            <input type = "text" name = "email" id = "email" className = "loft__form-input" value = { this.state.email } onChange = { this.handleChangeField } onFocus = { this.resetError }/>
                            <label htmlFor = "email">Адрес электронной почты <sup>&#10057;</sup></label>
                            <input type = "text" name = "initials" id = "initials" className = "loft__form-input" value = { this.state.initials } onChange = { this.handleChangeField } onFocus = { this.resetError }/>
                            <label htmlFor = "initials">Как вас зовут? <sup>&#10057;</sup></label>
                            <input type = "password" name = "setPassword" id = "setPassword" className = "loft__form-input" value = { this.state.setPassword } onChange = { this.handleChangeField } onFocus = { this.resetError }/>
                            <label htmlFor = "setPassword">Придумайте пароль <sup>&#10057;</sup></label>
                            <button className = { this.state.regButton } type = "button" onClick = { this.regHandler }>Зарегистрироваться</button>
                            <div className = "loft__form-anchor">
                                <span>Уже зарегистрированы? <a onClick = { () => this.changeCurrentView("Param") }>Войти</a></span>
                            </div>
                        </div>
                    }[this.state.currentView]
                }
            </div>
        );
    }

}