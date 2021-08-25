/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "@testing-library/react";
import Profile from "../../src/Components/Map/Profile";

test("it renders correctly", () => {
    const { getByText } = render(<Profile />);
    expect(getByText("Профиль").tagName).toMatch("I");
});
