/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "@testing-library/react";
import LoftTaxi from '../../src/LoftTaxi';
import renderer from "react-test-renderer";

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    Map: jest.fn(() => ({
      remove: jest.fn(),
    })),
}));

 
test("it renders correctly", () => {
    const loftTree = renderer.create(<LoftTaxi />).toJSON(),
          { getByTestId } = render(<LoftTaxi loggedIn={true} />);
    expect(loftTree).toMatchSnapshot();
    expect(getByTestId("map-wrapper").firstChild).toBeTruthy(); // потому что loggedIn === true
});