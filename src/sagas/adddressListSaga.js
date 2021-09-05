import { takeEvery, call, put } from "redux-saga/effects";
import { GET_ADDRESS_LIST } from "../store/actions";
import { getAddressListData } from "../api";

export function* addressListSaga() {
    const success = yield call(getAddressListData);
    if (success) {
        yield put(GET_ADDRESS_LIST(success.data));
    }
}

export function* addrListSaga() {
    yield takeEvery("GET_ADDRESS_LIST_REQUEST", addressListSaga);
}