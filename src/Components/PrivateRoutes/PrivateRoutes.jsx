import React, { Component } from "react";
import { Switch } from "react-router-dom";
import { ProfileWithAuth } from "../Map/Profile";
import MapView from "../Map/MapView";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

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
            </Switch>
       );
    }
}