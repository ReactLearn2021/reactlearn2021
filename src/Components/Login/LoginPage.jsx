import React, { ReactElement } from "react";
import logo from "../../assets/logo-auth-left.svg";
import { RegisterFormWithAuth } from "./RegistrationForm";
import { LoginFormWithAuth } from "./LoginForm";
import { connect } from "react-redux";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";

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

    componentDidUpdate() {
        if (this.props.loggedIn) {
            this.props.history.location("/profile");
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
                        <PrivateRoutes />
                    </div>
                </div>
            </section>
        );
    }
    
}

export const LoginPageWithAuth = connect(
    (state) => ({ loggedIn : state.auth.loggedIn }),
    null
)(LoginPage);