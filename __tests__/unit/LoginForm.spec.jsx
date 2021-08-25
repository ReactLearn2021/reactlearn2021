/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LoginForm from "../../src/Components/Login/LoginForm";

test("it renders correctly", () => {
    const { getByText } = render(<LoginForm />);
    expect(getByText("Пароль").textContent).toMatch("❉");
});

test("button becomes shaded when input is correct", () => {
    const { getByTestId } = render(<LoginForm />);
    fireEvent.change(getByTestId("login"), {target: {value: "actual@mail.ru"}});
    fireEvent.change(getByTestId("password"), {target: {value: "CorrectPasswod123"}});
    expect(getByTestId("login-button").classList).toContain("loft__form-button-filled");
});