/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "@testing-library/react";
import MapView from "../../src/Components/Map/MapView";

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    Map: jest.fn(() => ({
      remove: jest.fn(),
    })),
}));

test("Map container renders correctly", () => {
    const { getByTestId } = render(<MapView />),
          map = getByTestId("map");
    expect(map).toBeInstanceOf(HTMLElement);
    expect(map.classList.contains("map")).toBeTruthy();
});