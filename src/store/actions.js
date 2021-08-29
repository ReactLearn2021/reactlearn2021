import { createAction } from "redux-actions";

export const LOG_IN = createAction("LOG_IN"),
             LOG_OUT = createAction("LOG_OUT"),
             AUTHENTICATE = createAction("AUTHENTICATE"),
             REGISTER = createAction("REGISTER");

export const logIn = () => ({ type : LOG_IN }),
             logOut = () => ({ type : LOG_OUT }),
             authenticate = (email, password) => {
                  return { type : AUTHENTICATE, payload : { email, password } };
             },
             register = (email, initials, password) => {
                  return { type : REGISTER, payload : { email, initials, password }};
             }