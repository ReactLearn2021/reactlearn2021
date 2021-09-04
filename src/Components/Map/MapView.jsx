import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { connect } from "react-redux";
import { getAddressList } from "../../store/actions";
import { useHistory } from "react-router-dom";
import Select from 'react-select'

const MapView = (props) => {
    const mapContainer = React.createRef(),
          [fromList, setFromList] = useState([{ value : "Улица Пушкина", label : "Улица Пушкина" }]),
          [toList, setToList] = useState([{ value : "Бульвар Рокоссовского", label : "Бульвар Рокоссовского" }]),
          [from, setFrom] = useState(""),
          [to, setTo] = useState(""),
          history = useHistory();
    let map = null;

    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN;
        map = new mapboxgl.Map({
            container : mapContainer.current,
            style : "mapbox://styles/mapbox/streets-v10",
            center : [30.3056504, 59.9429126],
            zoom : 10
        });
        props.getAddressList();
        return function unmount() {
            map.remove();
        }
    }, []);

    function changeFrom(event) {
        if (!event) {
            setFrom("");
            return;
        }
    }

    function changeTo(event) {
        if (!event) {
            setTo("");
            return;
        }
    }

    return(
        <div className = "map-wrapper">
            <div data-testid = "map" className = "map" ref = { mapContainer } />
            <div id = "order">
                { (props.full === false ) ? <>
                    <h4>Пожалуйста, перейдите в профиль и заполните платежные данные.</h4>
                    <button className="loft__form-button-filled loft__form-button-expanded" type="button" onClick={() => { history.push("/profile"); }}>Перейти в профиль</button>
                </> : <>
                    <Select options = { fromList } isClearable = { true } className = "form-select" placeholder = "Откуда" inputValue = { from } onChange = { changeFrom }/>
                    <Select options = { toList } isClearable = { true } className = "form-select" placeholder = "Куда" inputValue = { to } onChange = { changeTo }/>
                    { to }
                </>}
            </div>
        </div>
    );
}

export default connect(
    (state) => ({ addressList : state.addresses.addressList, full : state.profile.full }),
    { getAddressList }
)(MapView);