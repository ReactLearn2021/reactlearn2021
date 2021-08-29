import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import LoftTaxi from "../../src/LoftTaxi";
import { render } from "@testing-library/react";
import React from "react";
import { createMemoryHistory } from "history";

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    Map: jest.fn(() => ({
      remove: jest.fn(),
    })),
}));

test("LoftTaxi renders correctly with router", () => {
    const history = createMemoryHistory();
    const { container } = render(
        <Router history = { history }>
            <Provider store = { globalThis.mockStore }>
                <LoftTaxi />
            </Provider>
        </Router>);
});
