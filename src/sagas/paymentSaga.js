import { takeEvery, call, put } from "redux-saga/effects";
import { setCardInfo } from "../store/actions";
import { setCardData } from "../api";

export function* paymentSaga(action) {
    const { card } = action.payload,
        success = yield call(setCardData, card);
    if (success) {
        yield put(setCardInfo(success));
    }
}

export function* paySaga() {
    yield takeEvery(setCardInfo, paymentSaga);
}