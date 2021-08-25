/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "@testing-library/react";
import LoginRegistrationForm from "../../src/Components/Login/LoginRegistrationForm";

test("it correctly renders react link", () => {
    const { container } = render(<LoginRegistrationForm />);
    expect(container.innerHTML).toMatch("Новый пользователь?");
});

test("current view is login page", () => {
    const { container } = render(<LoginRegistrationForm />);
    expect(container.innerHTML).toMatch("Войти");
});


