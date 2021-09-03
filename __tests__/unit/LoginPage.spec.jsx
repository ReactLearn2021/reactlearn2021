/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LoginPage from "../../src/Components/Login/LoginPage";
import { Provider } from "react-redux";
test("it renders correctly", () => {
    const { getByTestId } = render(<Provider store = { globalThis.mockStore }><LoginPage /></Provider>);
    expect(getByTestId("logo").alt).toMatch("not loaded");
});


test("it correctly renders react link", () => {
    const { container, getByTestId } = render(<Provider store = { globalThis.mockStore }><LoginPage /></Provider>),
          registerLink = getByTestId("register-link");
    fireEvent.click(registerLink);
    expect(container.innerHTML).toMatch("Уже зарегистрированы?");
});

test("current view is login page", () => {
    const { container } = render(<Provider store = { globalThis.mockStore }><LoginPage /></Provider>);
    expect(container.innerHTML).toMatch("Войти");
});