import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

export const PrivateRoute = connect(state => ({ loggedIn: state.auth.loggedIn }))(
    ({ component : Component, loggedIn, ...rest }) => {
        return <Route { ...rest } render = { props => (loggedIn) ? (<Component { ...props } />) : (<Redirect to = "/" />)} /> // Redirect для защиты роута 
    }
);

// Здесь не работает удаление роута из адресной строки если нет авторизации