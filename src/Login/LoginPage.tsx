import React, { ReactElement } from "react";
import logo from "../assets/logo-auth-left.svg";
import LoginRegistrationForm from "./LoginRegistrationForm";

export default class LoginPage extends React.Component {

    public render(): ReactElement {
        return (
            <section style = {{ display : "flex", flexFlow : "row nowrap" }}>
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