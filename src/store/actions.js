import { createAction } from "redux-actions";

export const LOG_IN = createAction("LOG_IN"),
     LOG_OUT = createAction("LOG_OUT"),
     AUTHENTICATE = createAction("AUTHENTICATE", (email, password) => ( { email, password } ) ),
     REGISTER = createAction("REGISTER", (email, initials, password) => ( { email, initials, password }) ),
     CARD = createAction("CARD", (card) => ( { card } )),
     GET_CARD = createAction("GET_CARD"),
     SET_CARD_DATA = createAction("SET_CARD_DATA"),
     GET_ADDRESS_LIST = createAction("GET_ADDRESS_LIST", (addressList) => ({ addressList }) ),
     GET_ADDRESS_LIST_REQUEST = createAction("GET_ADDRESS_LIST_REQUEST"),
     GET_ROUTE = createAction("GET_ROUTE", (route) => ( { route } )),
     GET_ROUTE_REQUEST = createAction("GET_ROUTE_REQUEST", (from, to) => ({ from, to }) ),
     ERRORS = createAction("ERRORS", (error) => ( { error } ));