import React from "react";
import { PrivateRoute } from "../Map/PrivateRoute";
import { Switch } from "react-router-dom";
import { ProfileWithAuth } from "../Map/Profile";
import MapView from "../Map/MapView";

export default class RouteCollection extends React.Component {
    render() {
       return(
            <Switch>
                <PrivateRoute path = "/map" exact component = { MapView }></PrivateRoute>
                <PrivateRoute path = "/profile" exact component = { ProfileWithAuth }></PrivateRoute>
            </Switch>
       );
    }
}