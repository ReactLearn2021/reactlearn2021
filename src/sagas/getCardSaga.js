import { takeEvery, call, put } from "redux-saga/effects";
import { CARD, ERRORS } from "../store/actions";
import { getCardData } from "../api";

export function* getCardSaga() {
    try {
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
    } catch(e) {
        yield put(ERRORS("Ошибка при загрузке данных карты"));
    }
}

export function* cardSaga() {
    yield takeEvery("GET_CARD", getCardSaga);
}