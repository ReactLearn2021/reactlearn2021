/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import RegistationForm from "../../src/Components/Login/RegistrationForm";

test("it correctly renders react link", () => { 
    const { container } = render(<RegistationForm />);
    expect(container.innerHTML).toMatch("Зарегистрироваться");
});

test("button becomes shaded when input is correct", () => {
    const { getByTestId } = render(<RegistationForm />);
    fireEvent.change(getByTestId("email"), {target: {value: "actual@mail.ru"}});
    fireEvent.change(getByTestId("initials"), {target: {value: "Джаваскриптов Разработчик Фронтендович"}});
    fireEvent.change(getByTestId("setPassword"), {target: {value: "CorrectPasswod123"}});
    expect(getByTestId("reg-button").classList).toContain("loft__form-button-filled");
});