/**
 * @jest-environment jsdom
 */

import { ProfileWithAuth } from "../../src/Components/Map/Profile";
import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { CARD, AUTHENTICATE } from "../../src/store/actions";
import rootReducer from "../../src/store/reducers";

const mockedCardData = {
    card : {
        cardName : "Джуниоров Мидлразработчик Синьорович",
        cardNumber : "1111 1111 1111 1111",
        expiryDate : "12/99",
        cvc : "111"
    },
    profile : {
        initials : "Джуниоров Мидлразработчик Синьорович",
        cardnum : "1111 1111 1111 1111",
        cardterm : "12/99",
        cvc : "111"
    }
};


test("redux store works correctly", () => {
    expect(globalThis.mockStore.getState().profile.cardnum).toMatch("0000 0000 0000 0000");
});

test("actions works correctly", () => {
    
    const { getByTestId } = render(<BrowserRouter><Provider store = { globalThis.mockStore }><ProfileWithAuth /></Provider></BrowserRouter>);
    globalThis.mockStore.dispatch(CARD(mockedCardData));
    globalThis.mockStore.dispatch(AUTHENTICATE("actual@mail.ru", "testpassword"));
    const actions = globalThis.mockStore.getActions();
    expect(actions[0].type).toMatch("GET_CARD");
    expect(actions[1].type).toMatch("CARD");
    expect(actions[1].payload.card).toMatchObject(mockedCardData);
    expect(actions[2].type).toMatch("AUTHENTICATE");
    expect(actions[2].payload).toMatchObject({ email: 'actual@mail.ru', password: 'testpassword' });
});

test("root reducer works correctly", () => {
    let mockedCardDataEmpty = {
        profile : {
            cardName : "",
            cardNumber : "",
            expiryDate : "",
            cvc : ""
        },
        auth : {
            loggedIn : false
        }
    }
    mockedCardDataEmpty = rootReducer(mockedCardDataEmpty, { type : "CARD", payload : mockedCardData });
    expect(mockedCardDataEmpty.profile).toMatchObject(mockedCardData.profile);
})