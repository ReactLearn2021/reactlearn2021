/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "@testing-library/react";
import LoginRegistrationForm from "../../src/Components/Login/LoginRegistrationForm";
import { Provider } from "react-redux";

test("it correctly renders react link", () => {
    const { container } = render(<Provider store = { globalThis.mockStore }><LoginRegistrationForm /></Provider>);
    expect(container.innerHTML).toMatch("Новый пользователь?");
});

test("current view is login page", () => {
    const { container } = render(<Provider store = { globalThis.mockStore }><LoginRegistrationForm /></Provider>);
    expect(container.innerHTML).toMatch("Войти");
});


