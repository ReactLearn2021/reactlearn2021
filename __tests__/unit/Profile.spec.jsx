/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "@testing-library/react";
import ProfileWithAuth from "../../src/Components/Map/Profile";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";

test("it renders correctly", () => {
    const { getByText } = render(<BrowserRouter><Provider store = { globalThis.mockStore }><ProfileWithAuth /></Provider></BrowserRouter>);
    expect(getByText("Профиль").tagName).toMatch("B");
});
