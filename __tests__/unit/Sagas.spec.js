/**
 * @jest-environment jsdom
 */

import { recordSaga } from "./recordSaga";
import { authenticateSaga } from "../../src/sagas/authSaga";
import { AUTHENTICATE, GET_ADDRESS_LIST_REQUEST, GET_CARD, SET_CARD_DATA, REGISTER, GET_ROUTE_REQUEST } from "../../src/store/actions";
import { addressListSaga } from "../../src/sagas/adddressListSaga";
import { getCardSaga } from "../../src/sagas/getCardSaga";
import { paymentSaga } from "../../src/sagas/paymentSaga";
import { registerSaga } from "../../src/sagas/registerSaga";
import { createRouteSaga } from "../../src/sagas/routeSaga";

const card = { cardName : "Mocked", cardNumber : "Mocked", expiryDate : "Mocked", cvc : "Mocked" }

jest.mock("../../src/api", () => {
    return { 
        serverLogin : jest.fn(() => ({ data : { success : true, token : "token" } } )),
        serverReg : jest.fn(() => ({ data : { token : "token" }})),
        getCardData : jest.fn(() => ({ data : card })),
        getAddressListData : jest.fn(() => ({ data : { addressList : { addresses : ["Mock Address"] } } })),
        setCardData : jest.fn(() => ({ card })),
        getRouteData : jest.fn(() => ({ data : { coordinates : [["Mocked Coords", "Mocked Coords"]] } }))
    };
});

test("authSaga works correctly", async (done) => {
    const dispatched = await recordSaga(authenticateSaga, AUTHENTICATE("testlogin", "testpass"));
    expect(dispatched).toEqual([{ type : "LOG_IN" }]);
    done();
});

test("addressListSaga works correctly", async (done) => {
    const dispatched = await recordSaga(addressListSaga, GET_ADDRESS_LIST_REQUEST());
    expect(dispatched[0].payload.addressList.addressList.addresses).toEqual(expect.arrayContaining(["Mock Address"]));
    expect(dispatched[0].type).toEqual("GET_ADDRESS_LIST");
    done();
});

test("getCardSaga works correctly", async (done) => {
    const dispatched = await recordSaga(getCardSaga, GET_CARD());
    expect(dispatched[0]).toMatchObject({ payload : { card }, type : "CARD" });
    done();
});

test("paymentSaga works correctly", async (done) => {
    const dispatched = await recordSaga(paymentSaga, SET_CARD_DATA(card));
    expect(dispatched[0]).toMatchObject({ payload : { card : { card } }, type : "CARD" });
    done();
});

test("registerSaga works correctly", async (done) => {
    const dispatched = await recordSaga(registerSaga, REGISTER("testemail", "testinitials", "testpassword"));
    expect(dispatched[0]).toMatchObject({ type : "LOG_IN" });
    done();
});

test("routeSaga works correctly", async (done) => {
    const dispatched = await recordSaga(createRouteSaga, GET_ROUTE_REQUEST("Mocked From", "Mocked To"));
    console.info(dispatched[0])
    expect(dispatched[0]).toMatchObject({ type : "GET_ROUTE" });
    expect(dispatched[0].payload.route.coordinates).toEqual(expect.arrayContaining([["Mocked Coords", "Mocked Coords"]]));
    done();
});

