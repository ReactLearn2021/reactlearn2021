import { takeEvery, call, put } from "redux-saga/effects";
import { GET_ADDRESS_LIST, ERRORS } from "../store/actions";
import { getAddressListData } from "../api";

export function* addressListSaga() {
    try {
        const success = yield call(getAddressListData);
        if (success) {
            yield put(GET_ADDRESS_LIST(success.data));
        }
    } catch(e) {
        yield put(ERRORS("Ошибка при загрузке списка адресов"));
    }
}

export function* addrListSaga() {
    yield takeEvery("GET_ADDRESS_LIST_REQUEST", addressListSaga);
}