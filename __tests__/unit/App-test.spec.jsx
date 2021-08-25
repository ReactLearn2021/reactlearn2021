/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import React from "react";
import { shallow } from "enzyme"; // не нужно использовать, так как поддерживается только до 16-ой версии
import RegistrationForm from "../../src/Components/Login/RegistrationForm";

jest.mock("../../src/assets/logo-auth-left.svg");
jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    Map: jest.fn(() => ({
      remove: jest.fn(),
    })),
  }));

test("renders shallow", () => {
    // const wrapper = shallow(<AuthProvider />);
    // expect(wrapper.contains(<LoftTaxi />)).toBeTruthy(); // не поддерживается версия выше 16-ой
    const wrapper = shallow(<RegistrationForm />);
    expect(wrapper.find("div")).toBeDefined();
    console.info(wrapper.find("div"));
    // wrapper.find("button").simulate("click");
});