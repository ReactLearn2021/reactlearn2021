import { logIn, setCardInfo, AUTHENTICATE, REGISTER, GET_CARD } from "../store/actions";
import { serverLogin } from "../api";
import { serverReg } from "../api";
import { getCardData } from "../api";

export const authMiddleware = (store) => (next) => async (action) => {
    if (action.type === AUTHENTICATE) {
        const { email, password } = action.payload,
              success = await serverLogin(email, password);
        if (success) {
            store.dispatch(logIn());
        }
    } else {
        next(action);
    }
}

export const registerMiddleware = (store) => (next) => async (action) => {
    if (action.type === REGISTER) {
        const { email, initials, password } = action.payload,
              success = await serverReg(email, initials, password);
        if (success) {
            store.dispatch(logIn());
        }
    } else {
        next(action);
    }
}

export const getCardMiddleware = (store) => (next) => async (action) => {
    if (action.type === GET_CARD) {
        const success = await getCardData();
        if (success) {
            store.dispatch(setCardInfo(success));
        }
    } else {
        next(action);
    }
}





