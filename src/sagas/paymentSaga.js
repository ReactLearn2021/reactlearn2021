import { takeEvery, call, put } from "redux-saga/effects";
import { CARD, ERRORS } from "../store/actions";
import { setCardData } from "../api";

export function* paymentSaga(action) {
    try {
        const { card } = action.payload,
              success = yield call(setCardData, card);
        if (success) {
            yield put(CARD(success));
        }
    } catch(e) {
        yield put(ERRORS("Ошибка при отправке данных карты"));
    }
}

export function* paySaga() {
    yield takeEvery("SET_CARD_DATA", paymentSaga);
}