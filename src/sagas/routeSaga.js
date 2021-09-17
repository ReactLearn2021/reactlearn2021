import { takeEvery, call, put } from "redux-saga/effects";
import { GET_ROUTE, ERRORS } from "../store/actions";
import { getRouteData } from "../api";

export function* createRouteSaga(action) {
    try {
        const { from, to } = action.payload,
              success = yield call(getRouteData, {from, to});
        if (success) {
            yield put(GET_ROUTE(success.data));
        }
    } catch(e) {
        yield put(ERRORS("Ошибка при загрузке маршрута"));
    }
}

export function* routeSaga() {
    yield takeEvery("GET_ROUTE_REQUEST", createRouteSaga);
}