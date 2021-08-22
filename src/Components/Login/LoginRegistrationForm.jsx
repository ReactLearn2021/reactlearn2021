import React from "react";
import RegistrationForm from "./RegistrationForm";
import { LoginFormWithAuth } from "./LoginForm";

const Views = {
    LOGIN : "LOGIN",
    REG : "REG"
}

export default class LoginRegistrationForm extends React.Component {

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
        // const login = this.state.login;
        return(
            <div className = "authorize__block">
                {
                    {
                        LOGIN : <LoginFormWithAuth {...this.props}><span>Новый пользователь? <a onClick = { () => this.changeCurrentView("Param") }>Зарегистрироваться</a></span></LoginFormWithAuth>,
                        REG : <RegistrationForm><span>Уже зарегистрированы? <a onClick = { () => this.changeCurrentView("Param") }>Войти</a></span></RegistrationForm>
                    }[this.state.currentView]
                }
            </div>
        );
    }

}