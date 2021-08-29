/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "@testing-library/react";
import LoginPage from "../../src/Components/Login/LoginPage";
import { Provider } from "react-redux";
test("it renders correctly", () => {
    const { getByTestId } = render(<Provider store = { globalThis.mockStore }><LoginPage /></Provider>);
    expect(getByTestId("logo").alt).toMatch("not loaded");
});