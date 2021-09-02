import './LoftTaxi.sass';
import LoginPage from "./Components/Login/LoginPage";
import React from "react";
import { MapWithAuth } from "./Components/Map/Map";
import propTypes from "prop-types";
import { connect } from "react-redux";
import RouteCollection from "./Components/Login/PrivateRoutes";

function App(props) {
  // if (window.localStorage.getItem("view") != "map") {
    if (props.loggedIn === false) {
        return (
          <>
              <main data-testid = "main">
                  <LoginPage/>
              </main>
              <RouteCollection />
          </>
        );
    } else {
      return <><main data-testid = "map-wrapper">
                  <MapWithAuth {...props} />
             </main>
             <RouteCollection /></>
    }
}

App.propTypes = {
    loggedIn : propTypes.bool,
    logIn : propTypes.func,
    logOut : propTypes.func
};

export default connect(
    state => ({ loggedIn: state.auth.loggedIn })
)(App);
