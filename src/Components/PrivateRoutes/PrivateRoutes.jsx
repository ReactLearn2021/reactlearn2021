import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Switch } from "react-router-dom";
import { ProfileWithAuth } from "../Map/Profile";
import MapView from "../Map/MapView";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { RegisterFormWithAuth } from "../Login/RegistrationForm";
import { LoginFormWithAuth } from "../Login/LoginForm";

const PrivateRoute = connect(state => ({ loggedIn: state.auth.loggedIn }))(
    ({ component : Component, loggedIn, ...rest }) => {
        return <Route { ...rest } render = { props => (loggedIn) ? (<Component { ...props } />) : (<Redirect to = "/" />)} /> // Redirect для защиты роута 
    }
),
      Register = (props) => {
            return (
                <div className = "authorize__block">
                    <RegisterFormWithAuth {...props}>
                        <span>Уже зарегистрированы? 
                            <a onClick = { () => { window.history.pushState(null, null, "/login" ); window.history.go(0); } }>Войти</a>
                        </span>
                    </RegisterFormWithAuth>
                </div>
            );
      },
      Login = (props) => {
            return(
                <div className = "authorize__block">
                    <LoginFormWithAuth {...props}>
                        <span>Новый пользователь? 
                            <a onClick = { () => { window.history.pushState(null, null, "/register"); window.history.go(0); } } data-testid = "register-link">Зарегистрироваться</a>
                        </span>
                    </LoginFormWithAuth> 
                </div>
            );
      };

export default class PrivateRoutes extends React.Component {
    render() {
       return(
            <Switch>
                <PrivateRoute path = "/map" exact component = { MapView }></PrivateRoute>
                <PrivateRoute path = "/profile" exact component = { ProfileWithAuth }></PrivateRoute>
                <Route path = "/" exact render = { () => <Redirect to = "/login" /> } />
                <Route path = "/register" exact component = { Register }/>
                <Route path = "/login" exact component = { Login }/>
            </Switch>
       );
    }
}