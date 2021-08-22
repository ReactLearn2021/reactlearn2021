import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";

const MapView = () => {
    const mapContainer = React.createRef();
    let map = null;

    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN;
        map = new mapboxgl.Map({
            container : mapContainer.current,
            style : "mapbox://styles/mapbox/streets-v10",
            center : [30.3056504, 59.9429126],
            zoom : 10
        });
        return function unmount() {
            map.remove();
        }
    }, []);

    return(
        <div className = "map-wrapper">
            <div data-testid = "map" className = "map" ref = { mapContainer } />
        </div>
    );
}

export default MapView;