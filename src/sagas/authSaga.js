import { takeEvery, call, put } from "redux-saga/effects";
import { serverLogin } from "../api";
import { LOG_IN, ERRORS } from "../store/actions";

export function* authenticateSaga(action) {
    try {
        const { email, password } = action.payload,
              response = yield call(serverLogin, email, password);
        const { success, token } = response.data;
        if (success) {
            window.localStorage.setItem("TOKEN", token);
            yield put(LOG_IN());
        }
    } catch(e) {
        yield put(ERRORS("Ошибка при аутентификации"));
    }
}

export function* authSaga() {
    yield takeEvery("AUTHENTICATE", authenticateSaga);
}