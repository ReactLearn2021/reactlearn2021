import './LoftTaxi.sass';
import LoginPage from "./Components/Login/LoginPage";
import React from "react";
import Map from "./Components/Map/Map";

function App() {
    if (window.localStorage.getItem("view") != "map") {
        return (
          <main>
              <LoginPage/>
          </main>
        );
    } else {
      return <Map />
    }
}

export default App;
