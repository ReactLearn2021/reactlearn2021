import React, { ReactElement } from "react";
import LoginRegistrationForm from "./LoginRegistrationForm";
import logo from "../../assets/logo-auth-left.svg";

export default class LoginPage extends React.Component {

    render() {
        return (
            <section id = "loginPage">
                <div className = "left__logo-image">
                    <img src = { logo } alt = "Logotip was not loaded" />
                </div>
                <div className = "auth__section">
                    <LoginRegistrationForm/>
                </div>
            </section>
        )
    }
    
}