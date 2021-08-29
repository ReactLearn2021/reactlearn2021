import React, { useState } from "react";
import logo from "../../assets/logo-map-navbar.svg";
import Profile from "./Profile";
import MapView from "./MapView";
import { connect } from "react-redux";
import { logOut } from "../../store/actions";
import { Link, Switch, Route, useHistory } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import propTypes from "prop-types";

export default function Map(props) {
    const [view, setView] = useState("MAP"),
          history = useHistory();

    function linkHandler() {
        window.localStorage.removeItem("TOKEN"); // спросить как запустить редирект 
        props.logOut();
        history.push("/");
    }

    // function navigator() {
    //     if (view === "MAP") {
    //         setView("PROFILE");
    //     } else {
    //         setView("MAP");
    //     }
    // }

    return(
        <main id = "map">
            <nav>
                <img src = { logo } alt = "Logotip was not loaded" data-testid = "logo"/>
                <div data-testid = "nav-container">
                    <Link to = "/map">Карта</Link>
                    <Link to = "/profile" data-testid = "profile-link">Профиль</Link>
                    <button className = "loft__form-button-filled" id = "logout" onClick = { linkHandler }>Выйти</button>
                </div>
            </nav>
            <Switch>
                <PrivateRoute path = "/map" exact component = { MapView }></PrivateRoute>
                <PrivateRoute path = "/profile" exact component = { Profile }></PrivateRoute>
            </Switch>
        </main>
    )
}

Map.propTypes = {
    logOut : propTypes.func
};

export const MapWithAuth = connect(
    null,
    { logOut }
)(Map);