import { takeEvery, call, put } from "redux-saga/effects";
import { CARD } from "../store/actions";
import { getCardData } from "../api";

export function* getCardSaga() {
    const success = yield call(getCardData),
          { cardName, cardNumber, expiryDate, cvc } = success.data;
    if (success) {
        let fullData = false;
        if ((cardName && cardNumber && expiryDate && cvc) &&
            (cardName !== "" && cardNumber !== "" && expiryDate !== "" && cvc !== "")) {
            fullData = true;
        }
        const card = { cardName, cardNumber, expiryDate, cvc, fullData };
        yield put(CARD(card));
    }
}

export function* cardSaga() {
    yield takeEvery("GET_CARD", getCardSaga);
}