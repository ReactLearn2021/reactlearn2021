/**
 * @jest-environment jsdom
 */

 import React from "react";
 import { render, fireEvent } from "@testing-library/react";
 import Map from "../../src/Components/Map/Map";

jest.mock('mapbox-gl/dist/mapbox-gl', () => {
    return { Map : jest.fn( () => {
       return { remove : jest.fn() }
    })}
});

test("it renders correctly", () => {
    const { getByTestId } = render(<Map />);
    expect(getByTestId("logo").alt).toMatch("not loaded");
    expect(getByTestId("nav-container").children).toHaveLength(3);
});

test("navigation works correctly", () => {
    const { getByTestId, container } = render(<Map />),
          profileLink = getByTestId("profile-link");
    fireEvent.click(profileLink);
    expect(container.textContent).toMatch("Профиль");
});
