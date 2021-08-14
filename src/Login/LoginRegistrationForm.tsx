import React, { ReactElement, ReactNode } from "react";

const enum Views {
    LOGIN = "LOGIN",
    REG = "REG"
}

export default class LoginRegistrationForm extends React.Component {

    constructor(public props: Readonly<{}> & Readonly<{ children?: ReactNode; }>) {
        super(props);
        this.handleChangeField = this.handleChangeField.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.changeCurrentView = this.changeCurrentView.bind(this);
        this.regHandler = this.regHandler.bind(this);
    }

    public state = {
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

    public changeCurrentView(param: string): void {
        if (this.state.currentView == Views.LOGIN) {
            this.setState({ currentView : Views.REG });
        } else {
            this.setState({ currentView : Views.LOGIN });
        }
    }

    public handleChangeField(event: { target: { value: string; name: string }}): void {
        console.info(event.target.name)
        this.setState({ [event.target.name]: event.target.value });
    }

    public loginHandler(): boolean {
        if (!this.state.emailCheck.test(this.state.login)) {
            return false;
        }
        console.info(true);
        return true;
    }

    public regHandler(): boolean {
        if (this.state.setPassword.length <= 8) {
            return false;
        }
        return true;
    }

    public componentDidUpdate(): void {
        if (this.state.emailCheck.test(this.state.login) && this.state.password.length >= 8 && this.state.loginButton != "loft__form-button-filled") {
            this.setState({ loginButton : "loft__form-button-filled" });
        } else if (this.state.loginButton == "loft__form-button") {
            return;
        } else {
            this.setState({ loginButton : "loft__form-button" }); // спросить про это
        }
    }

    public render(): ReactElement {
        // const login = this.state.login;
        return(
            <div className = "authorize__block">
                {
                    {
                        LOGIN : <div className = "authorize__block-form">
                            <h2>Войти</h2>
                            <input type = "text" name = "login" id = "login" className = "loft__form-input" value = { this.state.login } onChange = { () => this.handleChangeField("Param") }/> {/* this нужен потому что классовый компонент */}
                            <label htmlFor = "login">Имя пользователя <sup>&#10057;</sup></label>
                            <input type = "password" name = "password" id = "password" className = "loft__form-input" value = { this.state.password } onChange = { this.handleChangeField }/> 
                            <label htmlFor = "password">Пароль <sup>&#10057;</sup></label>
                            <button className = { this.state.loginButton } type = "button" onClick = { this.loginHandler }>Войти</button>
                            <div className = "loft__form-anchor">
                                <span>Новый пользователь? <a href = "javascript:void(0)" onClick = { () => this.changeCurrentView("Param") }>Зарегистрироваться</a></span>
                            </div>
                        </div>
                        ,
                        REG : <div className = "authorize__block-form">
                            <h2>Регистрация</h2>
                            <input type = "text" name = "email" id = "email" className = "loft__form-input" value = { this.state.email } onChange = { this.handleChangeField }/>
                            <label htmlFor = "email">Адрес электронной почты <sup>&#10057;</sup></label>
                            <input type = "text" name = "initials" id = "initials" className = "loft__form-input" value = { this.state.initials } onChange = { this.handleChangeField }/>
                            <label htmlFor = "initials">Как вас зовут? <sup>&#10057;</sup></label>
                            <input type = "password" name = "setPassword" id = "setPassword" className = "loft__form-input" value = { this.state.setPassword } onChange = { this.handleChangeField }/>
                            <label htmlFor = "setPassword">Придумайте пароль <sup>&#10057;</sup></label>
                            <button className = { this.state.regButton } type = "button" onClick = { this.regHandler }>Зарегистрироваться</button>
                            <div className = "loft__form-anchor">
                                <span>Уже зарегистрированы? <a href = "javascript:void(0)" onClick = { () => this.changeCurrentView("Param") }>Войти</a></span>
                            </div>
                        </div>
                    }[this.state.currentView]
                }
            </div>
        );
    }

}