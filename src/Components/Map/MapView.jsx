import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Select from 'react-select';
import classNames from "classnames";
import { GET_ADDRESS_LIST_REQUEST, GET_ROUTE_REQUEST } from "../../store/actions";
import propTypes from "prop-types";
import { GET_CARD } from "../../store/actions";

const MapView = ({ getAddressList, getRoute, getCard, addressList, full, coordinates }) => {
    const mapContainer = React.createRef(),
          [fromList, setFromList] = useState(addressList.map( (item) => ({ value : item, label : item }) )),
          [toList, setToList] = useState(addressList.map( (item) => ({ value : item, label : item }) )),
          [from, setFrom] = useState(""),
          [to, setTo] = useState(""),
          [map, setMap] = useState(null),
          history = useHistory();
    // let map = null;

    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN;
        setMap(new mapboxgl.Map({
            container : mapContainer.current,
            style : "mapbox://styles/mapbox/streets-v10",
            center : [30.3056504, 59.9429126],
            zoom : 10
        }));
        return function unmount() {
            if (map) {
                map.remove();
            }
        }
    }, []);

    useEffect( () => {
        if (addressList.length === 0) {
            getAddressList();
        } else {
            setFromList(addressList.map( (item) => ({ value : item, label : item }) ));
            setToList(addressList.map( (item) => ({ value : item, label : item }) ));
        }
    }, [addressList]);

    useEffect( () => {
        getCard();
    }, []);

    useEffect( () => {
        if (coordinates) {

            map && map.flyTo({ 
                center: coordinates[0],
                zoom: 15
            });


            if (map && map.getLayer("map-wrapper")) {
                map.removeLayer("map-wrapper");
                map.removeSource("map-wrapper");
            }
    
            map && map.addLayer({
                id: "map-wrapper",
                type: "line",
                source: {
                  type: "geojson",
                  data: {
                    type: "Feature",
                    properties: {},
                    geometry: {
                      type: "LineString",
                      coordinates : coordinates
                    }
                  }
                },
                layout: {
                  "line-join": "round",
                  "line-cap": "round"
                },
                paint: {
                  "line-color": "#0000CD",
                  "line-width": 8
                }
            });
        }
    }, [coordinates]);

    function changeFrom(event) {
        if (!event) {
            setFrom("");
            return;
        }
        const filteredList = addressList.map((item) => ({ value : item, label : item })).filter((item) => item.value !== event.value);
        setToList(filteredList);
        setFrom({ value : event.value, label : event.value });
    }

    function changeTo(event) {
        if (!event) {
            setTo("");
            return;
        }
        const filteredList = addressList.map((item) => ({ value : item, label : item })).filter((item) => item.value !== event.value);
        setFromList(filteredList);
        setTo({ value : event.value, label : event.value });
    }

    function makeOrder() {
        getRoute(from.value, to.value);
    }

    const btnClass = classNames({
        "loft__form-button loft__form-button-expanded": !from || !to || (from.value && from.value.length === 0) || (to.value && to.value.length) === 0,
        "loft__form-button-filled loft__form-button-expanded": (from && from.value.length > 0) && (to.value && to.value.length) > 0
    });

    return(
        <div className = "map-wrapper">
            <div data-testid = "map" className = "map" ref = { mapContainer } />
            <div id = "order">
                { (full === false ) ? <>
                    <h4>Пожалуйста, перейдите в профиль и заполните платежные данные.</h4>
                    <button className="loft__form-button-filled loft__form-button-expanded" type="button" onClick={() => { history.push("/profile"); }}>Перейти в профиль</button>
                </> : <>
                    <Select options = { fromList } isClearable = { true } className = "form-select" placeholder = "Откуда" onChange = { changeFrom }/>
                    <Select options = { toList } isClearable = { true } className = "form-select" placeholder = "Куда"  onChange = { changeTo }/>
                    <button className = { btnClass } type="button" onClick={ makeOrder }>Вызвать такси</button>
                </>}
            </div>
        </div>
    );
}

MapView.propTypes = {
    getAddressList : propTypes.func,
    getRoute : propTypes.func,
    addressList : propTypes.arrayOf(propTypes.string),
    full : propTypes.bool,
    coordinates : propTypes.arrayOf(propTypes.arrayOf(propTypes.number))
};

export default connect(
    (state) => ({ addressList : state.addresses.addressList, full : state.profile.full, coordinates : state.addresses.coordinates }),
    { getAddressList : GET_ADDRESS_LIST_REQUEST, getRoute : GET_ROUTE_REQUEST, getCard : GET_CARD }
)(MapView);