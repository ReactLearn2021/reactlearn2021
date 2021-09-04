import { takeEvery, call, put } from "redux-saga/effects";
import { getAddressList } from "../store/actions";
import { getAddressListData } from "../api";

export function* addressListSaga() {
    const success = yield call(getAddressListData);
    if (success) {
        yield put(getAddressList());
    }
}

export function* addrListSaga() {
    yield takeEvery(getAddressList, addressListSaga);
}