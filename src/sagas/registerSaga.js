import { takeEvery, call, put } from "redux-saga/effects";
import { logIn, register } from "../store/actions";
import { serverReg } from "../api";

export function* registerSaga(action) {
    const { email, initials, password } = action.payload,
          success = yield call(serverReg, email, initials, password);
    if (success) {
        window.localStorage.setItem("TOKEN", success.data.token);
        yield put(logIn());
    }
}

export function* regSaga() {
    yield takeEvery(register, registerSaga);
}