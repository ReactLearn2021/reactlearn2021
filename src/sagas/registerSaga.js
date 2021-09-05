import { takeEvery, call, put } from "redux-saga/effects";
import { LOG_IN, REGISTER } from "../store/actions";
import { serverReg } from "../api";

export function* registerSaga(action) {
    const { email, initials, password } = action.payload,
          success = yield call(serverReg, email, initials, password),
          { token } = success.data;
    if (success) {
        window.localStorage.setItem("TOKEN", token);
        yield put(LOG_IN());
    }
}

export function* regSaga() {
    yield takeEvery("REGISTER", registerSaga);
}