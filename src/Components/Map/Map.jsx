import React from "react";
import logo from "../../assets/logo-map-navbar.svg";

function linkHandler(param) {
    if (param == "logout") {
        window.localStorage.setItem("view", "login");
        window.location.reload();
    }
}

export default function Map() {
    return(
        <main id = "map">
            <nav>
                <img src = { logo } alt = "Logotip was not loaded" />
                <div>
                    <span>Карта</span>
                    <span>Профиль</span>
                    <span onClick = { () => { linkHandler('logout') } }>Выйти</span>
                </div>
            </nav>
        </main>
    )
}