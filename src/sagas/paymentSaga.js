import { takeEvery, call, put } from "redux-saga/effects";
import { CARD } from "../store/actions";
import { setCardData } from "../api";

export function* paymentSaga(action) {
    const { card } = action.payload,
        success = yield call(setCardData, card);
    if (success) {
        yield put(CARD(success));
    }
}

export function* paySaga() {
    yield takeEvery("SET_CARD_DATA", paymentSaga);
}