import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Select from 'react-select';
import classNames from "classnames";
import { GET_ADDRESS_LIST_REQUEST, GET_ROUTE_REQUEST } from "../../store/actions";
import propTypes from "prop-types";
import { GET_CARD } from "../../store/actions";
import { Formik, ErrorMessage, Form } from "formik";

const MapView = ({ getAddressList, getRoute, getCard, addressList, full, coordinates }) => {
    const mapContainer = React.createRef(),
          [fromList, setFromList] = useState(addressList),
          [toList, setToList] = useState(addressList),
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
        getCard();
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
            setFromList(addressList);
            setToList(addressList);
        }
    }, [addressList]);

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

    function changeFrom(value) {
        if (!value) return;
        const filteredList = addressList.filter((item) => item.value !== value.value);
        setFromList(filteredList);
    }

    function changeTo(value) {
        if (!value) return;
        const filteredList = addressList.filter((item) => item.value !== value.value);
        setToList(filteredList);
    }

    function makeOrder(values) {
        getRoute(values.from.value, values.to.value);
    }

    return(
        <div className = "map-wrapper">
            <div data-testid = "map" className = "map" ref = { mapContainer } />
            <div id = "order">
                { (full === false ) ? <>
                    <h4>Пожалуйста, перейдите в профиль и заполните платежные данные.</h4>
                    <button className="loft__form-button-filled loft__form-button-expanded" type="button" onClick={() => { history.push("/profile"); }}>Перейти в профиль</button>
                </> : <>
                    <Formik onSubmit = { (values) => { return makeOrder(values) } } 
                    initialValues = { { from : "", to : "" } }
                    validate = { (values) => {
                        const errors = {};
                        if (values.from === null) {
                            errors.from = "Введите исходный адрес";
                        }
        
                        if (values.to === null) {
                            errors.to = "Введите конечный адрес";
                        }

                        return errors;
                    } }>
                    { ({ handleChange, handleBlur, values, errors }) => {
                        const btnClass = classNames({
                            "loft__form-button" : Object.keys(errors).length > 0 || Object.values(values).some( (item) => item === ""),
                            "loft__form-button-filled" : !errors || Object.keys(errors).length === 0
                        });
                        return (
                            <Form>
                                <Select options = { fromList } 
                                name = "from"
                                isClearable = { true } 
                                className = "form-select" 
                                placeholder = "Откуда" 
                                onBlur = { () => handleBlur({ target : {name : "from" } }) }
                                onChange = { (selectedOption) => {
                                    const option = { target : { name : "from", value : selectedOption } };
                                    changeTo(selectedOption);
                                    handleChange(option)
                                } } 
                                value = { values.from }/>
                                <ErrorMessage name = "from" component = "p" className = "error-message" />
                                <Select options = { toList } 
                                name = "to"
                                isClearable = { true } 
                                className = "form-select" 
                                placeholder = "Куда"  
                                onBlur = { () => handleBlur({ target : {name : "to" } }) }
                                onChange = { (selectedOption) => {
                                    const option = { target : { name : "to", value: selectedOption } };
                                    changeFrom(selectedOption);
                                    handleChange(option);
                                } } 
                                value = { values.to }/>
                                <ErrorMessage name = "to" component = "p" className = "error-message" />
                                <button className = { btnClass } type = "submit">Вызвать такси</button>
                            </Form>
                        );
                    }}
                    </Formik>
                </>}
            </div>
        </div>
    );
}

MapView.propTypes = {
    getAddressList : propTypes.func,
    getRoute : propTypes.func,
    addressList : propTypes.arrayOf(propTypes.objectOf(propTypes.string)),
    full : propTypes.bool,
    coordinates : propTypes.arrayOf(propTypes.arrayOf(propTypes.number))
};

export default connect(
    (state) => ({ addressList : state.addresses.addressList.map( (item) => ({ value : item, label : item }) ), 
    full : state.profile.full, coordinates : state.addresses.coordinates }),
    { getAddressList : GET_ADDRESS_LIST_REQUEST, getRoute : GET_ROUTE_REQUEST, getCard : GET_CARD }
)(MapView);