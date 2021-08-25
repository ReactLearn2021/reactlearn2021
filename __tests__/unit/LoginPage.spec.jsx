/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "@testing-library/react";
import LoginPage from "../../src/Components/Login/LoginPage";

test("it renders correctly", () => {
    const { getByTestId } = render(<LoginPage />);
    expect(getByTestId("logo").alt).toMatch("not loaded");
});