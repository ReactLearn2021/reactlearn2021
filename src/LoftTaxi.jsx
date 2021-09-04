import './LoftTaxi.sass';
import { LoginPageWithAuth } from "./Components/Login/LoginPage";
import React from "react";
import { MapWithAuth } from "./Components/Map/Map";
import propTypes from "prop-types";
import { connect } from "react-redux";
import PrivateRoutes from "./Components/PrivateRoutes/PrivateRoutes";

function App(props) {
  // if (window.localStorage.getItem("view") != "map") {
    if (props.loggedIn === false) {
        return (
          <>
              <main data-testid = "main">
                  <LoginPageWithAuth />
              </main>
              <PrivateRoutes />
          </>
        );
    } else {
      return <main data-testid = "map-wrapper">
                  <MapWithAuth {...props} />
             </main>;
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
