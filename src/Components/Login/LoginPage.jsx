import React, { ReactElement } from "react";
import logo from "../../assets/logo-auth-left.svg";
import { RegisterFormWithAuth } from "./RegistrationForm";
import { LoginFormWithAuth } from "./LoginForm";


const Views = {
    LOGIN : "LOGIN",
    REG : "REG"
}

export default class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.changeCurrentView = this.changeCurrentView.bind(this);
    }

    state = {
        currentView : Views.LOGIN,
    };

    changeCurrentView(param) {
        if (this.state.currentView === Views.LOGIN) {
            this.setState({ currentView : Views.REG });
        } else {
            this.setState({ currentView : Views.LOGIN });
        }
    }

    render() {
        return (
            <section id = "loginPage">
                <div className = "left__logo-image">
                    <img src = { logo } alt = "Logotip was not loaded" data-testid = "logo"/>
                </div>
                <div className = "auth__section">
                    <div className = "authorize__block">
                        {
                            {
                                LOGIN : <LoginFormWithAuth {...this.props}><span>Новый пользователь? <a onClick = { () => this.changeCurrentView("Param") } data-testid = "register-link">Зарегистрироваться</a></span></LoginFormWithAuth>,
                                REG : <RegisterFormWithAuth><span>Уже зарегистрированы? <a onClick = { () => this.changeCurrentView("Param") }>Войти</a></span></RegisterFormWithAuth>
                            }[this.state.currentView]
                        }
                    </div>
                </div>
            </section>
        )
    }
    
}