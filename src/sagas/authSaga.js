import { takeEvery, call, put, fork } from "redux-saga/effects";
import { serverLogin } from "../api";
import { logIn, authenticate } from "../store/actions";

export function* authenticateSaga(action) {
    console.info(action.payload)
    const { email, password } = action.payload,
          response = yield call(serverLogin, email, password), // спросить про ошибку с email
          { success, token } = response.data;
    if (success) {
        window.localStorage.setItem("TOKEN", token);
        yield put(logIn());
    }
}

export function* authSaga() {
    yield takeEvery(authenticate, authenticateSaga);
}