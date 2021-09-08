import React, { useState, useEffect } from "react";
import logo from "../../assets/logo-map-navbar.svg";
import { connect } from "react-redux";
import { LOG_OUT } from "../../store/actions";
import { Link, useHistory } from "react-router-dom";
import propTypes from "prop-types";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";

export default function Map(props) {
    const [view, setView] = useState("MAP"),
          history = useHistory();

    function linkHandler() {
        window.localStorage.removeItem("TOKEN"); // спросить как запустить редирект 
        props.logOut();
        history.push("/login");
    }

    useEffect(() =>{
        if (window.location.pathname !== "/profile") {
            history.push("/map");
        }
    }, []);

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
            <PrivateRoutes />
        </main>
    );
}

Map.propTypes = {
    logOut : propTypes.func
};

export const MapWithAuth = connect(
    null,
    { logOut : LOG_OUT }
)(Map);