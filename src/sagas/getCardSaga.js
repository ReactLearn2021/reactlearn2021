import { takeEvery, call, put } from "redux-saga/effects";
import { CARD } from "../store/actions";
import { getCardData } from "../api";

export function* getCardSaga() {
    const success = yield call(getCardData),
          { cardName, cardNumber, expiryDate, cvc } = success.data;
    if (success) {
        let fullData = { fullData : false };
        const card = { cardName, cardNumber, expiryDate, cvc };
        if (cardName !== "" && cardNumber !== "" && expiryDate !== "" && cvc !== "") {
            fullData.fullData = true;
        }
        yield put(CARD(card, fullData));
    }
}

export function* cardSaga() {
    yield takeEvery("GET_CARD", getCardSaga);
}