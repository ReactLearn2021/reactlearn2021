import { takeEvery, call, put } from "redux-saga/effects";
import { setCardInfo, getCard } from "../store/actions";
import { getCardData } from "../api";

export function* getCardSaga() {
    const success = yield call(getCardData);
    if (success) {
        let fullData = { fullData : false };
        if (success.card.cardName !== "" && success.card.cardNumber !== ""
        && success.card.expiryDate !== "" && success.card.cvc !== "") {
            fullData.fullData = true;
        }
        yield put(setCardInfo(success, fullData));
    }
}

export function* cardSaga() {
    yield takeEvery(getCard, getCardSaga);
}