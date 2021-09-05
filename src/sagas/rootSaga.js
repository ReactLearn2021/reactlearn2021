import { authSaga } from "../sagas/authSaga";
import { regSaga } from "../sagas/registerSaga";
import { paySaga } from "../sagas/paymentSaga";
import { addrListSaga } from "../sagas/adddressListSaga";
import { cardSaga } from "../sagas/getCardSaga";
import { routeSaga } from "../sagas/routeSaga";
import { fork } from "redux-saga/effects";

export default function* rootSaga() {
    yield fork(authSaga);
    yield fork(regSaga);
    yield fork(paySaga);
    yield fork(addrListSaga);
    yield fork(cardSaga);
    yield fork(routeSaga);
}