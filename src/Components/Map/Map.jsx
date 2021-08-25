import React, { useState } from "react";
import logo from "../../assets/logo-map-navbar.svg";
import Profile from "./Profile";
import MapView from "./MapView";
import { withAuth } from "../AuthContext";

export default function Map(props) {
    const [view, setView] = useState("MAP");

    function linkHandler() {
        props.logOut();
    }

    function navigator() {
        if (view === "MAP") {
            setView("PROFILE");
        } else {
            setView("MAP");
        }
    }

    return(
        <main id = "map">
            <nav>
                <img src = { logo } alt = "Logotip was not loaded" data-testid = "logo"/>
                <div data-testid = "nav-container">
                    <span onClick = { () => { navigator() } }>Карта</span>
                    <span onClick = { () => { navigator() } } data-testid = "profile-link">Профиль</span>
                    <span onClick = { () => { linkHandler('logout') } }>Выйти</span>
                </div>
            </nav>
            {
                {
                    PROFILE : <Profile />,
                    MAP : <MapView />
                }[view]
            }
        </main>
    )
}

export const MapWithAuth = withAuth(Map);