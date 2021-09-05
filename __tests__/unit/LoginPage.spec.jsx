/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LoginPage from "../../src/Components/Login/LoginPage";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';

test("it renders correctly", () => {
    const { getByTestId } = render(<BrowserRouter><Provider store = { globalThis.mockStore }><LoginPage /></Provider></BrowserRouter>);
    expect(getByTestId("logo").alt).toMatch("not loaded");
});


test("it correctly renders react link", () => {
    const { container, getByTestId } = render(<BrowserRouter><Provider store = { globalThis.mockStore }><LoginPage /></Provider></BrowserRouter>),
          registerLink = getByTestId("register-link");
    fireEvent.click(registerLink);
    expect(container.innerHTML).toMatch("Войти");
});

test("current view is login page", () => {
    const { container } = render(<BrowserRouter><Provider store = { globalThis.mockStore }><LoginPage /></Provider></BrowserRouter>);
    expect(container.innerHTML).toMatch("Войти");
});