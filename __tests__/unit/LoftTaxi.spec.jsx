/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "@testing-library/react";
import LoftTaxi from '../../src/LoftTaxi';
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    Map: jest.fn(() => ({
      remove: jest.fn(),
    })),
}));

 
test("it renders correctly", () => {
    const loftTree = renderer.create(<BrowserRouter><Provider store = { globalThis.mockStore }><LoftTaxi /></Provider></BrowserRouter>).toJSON(),
          { getByTestId } = render(<BrowserRouter><Provider store = { globalThis.mockStore }><LoftTaxi loggedIn={true} /></Provider></BrowserRouter>);
    expect(loftTree).toMatchSnapshot(); // update
    expect(getByTestId("map-wrapper").firstChild).toBeTruthy(); // потому что loggedIn === true
});