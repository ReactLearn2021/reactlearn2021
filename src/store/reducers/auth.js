import { LOG_IN, LOG_OUT } from "../actions";

// import { handleAction } from "redux-actions";
// import { combineReducers } from "redux";

// const loggedIn = handleAction({
//     [LOG_IN] : (_state, action) => action.type,
//     [LOG_OUT)] :  (_state, action) => action.type
// }),

// export const reducer = combineReducers(logIn, logOut);

const initialState = {
    loggedIn : (window.localStorage.getItem("TOKEN")) ? true : false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case LOG_IN:
            return { ...state, loggedIn : true };
        case LOG_OUT:
            return { ...state, loggedIn : false };
        default:
            return state;
    }
}