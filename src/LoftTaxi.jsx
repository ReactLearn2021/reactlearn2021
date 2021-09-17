import './LoftTaxi.sass';
import { LoginPageWithAuth } from "./Components/Login/LoginPage";
import React, { useEffect } from "react";
import { MapWithAuth } from "./Components/Map/Map";
import propTypes from "prop-types";
import { connect } from "react-redux";

function App(props) {

    useEffect( () => {
        console.warn(props.error);
    }, [props.error]);

    if (props.loggedIn === false) {
        return (
          <>
              <main data-testid = "main">
                  <LoginPageWithAuth />
              </main>
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
    state => ({ loggedIn: state.auth.loggedIn, error : state.errors.error })
)(App);
