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
);

export default class PrivateRoutes extends React.Component {
    render() {
       return(
            <Switch>
                <PrivateRoute path = "/map" exact component = { MapView }></PrivateRoute>
                <PrivateRoute path = "/profile" exact component = { ProfileWithAuth }></PrivateRoute>
                <Route path = "/" exact render = { () => <Redirect to = "/login" /> } />
                <Route path = "/register" exact render = 
                { (props) => <RegisterFormWithAuth {...props}><span>Уже зарегистрированы? <a onClick = { () => 
                { window.history.pushState(null, null, "/login" ); window.history.go(0); } }>Войти</a></span></RegisterFormWithAuth> } />
                <Route path = "/login" exact 
                render = { (props) => <LoginFormWithAuth {...props}><span>Новый пользователь? <a onClick = { () => {
                window.history.pushState(null, null, "/register"); window.history.go(0); } } data-testid = "register-link">Зарегистрироваться</a></span></LoginFormWithAuth> } />
            </Switch>
       );
    }
}