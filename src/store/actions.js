import { createAction } from "redux-actions";

export const LOG_IN = createAction("LOG_IN"),
             LOG_OUT = createAction("LOG_OUT"),
             AUTHENTICATE = createAction("AUTHENTICATE"),
             REGISTER = createAction("REGISTER"),
             CARD = createAction("CARD"),
             GET_CARD = createAction("GET_CARD");

export const logIn = () => ({ type : LOG_IN }),
             logOut = () => ({ type : LOG_OUT }),
             getCard = () => ({ type : GET_CARD }),
             authenticate = (email, password) => {
                  return { type : AUTHENTICATE, payload : { email, password } };
             },
             register = (email, initials, password) => {
                  return { type : REGISTER, payload : { email, initials, password }};
             },
             setCardInfo = (card) => { 
                  return { type : CARD, payload : { card } };
             };