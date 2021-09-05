import { takeEvery, call, put, fork } from "redux-saga/effects";
import { serverLogin } from "../api";
import { LOG_IN, AUTHENTICATE } from "../store/actions";

export function* authenticateSaga(action) {
    const { email, password } = action.payload,
          response = yield call(serverLogin, email, password);
          const { success, token } = response.data;
    if (success) {
        window.localStorage.setItem("TOKEN", token);
        yield put(LOG_IN());
    }
}

export function* authSaga() {
    yield takeEvery("AUTHENTICATE", authenticateSaga);
}