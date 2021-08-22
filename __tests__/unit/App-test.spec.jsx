import { render, screen } from '@testing-library/react';
import renderer from "react-test-renderer";
import LoginRegistrationForm from '../../src/Components/Login/LoginRegistrationForm';
import React from "react";
import LoftTaxi from '../../src/LoftTaxi';
import { shallow } from "enzyme"; // не нужно использовать, так как поддерживается только до 16-ой версии
import { AuthProvider } from "../../src/Components/AuthContext";
import RegistrationForm from "../../src/Components/Login/RegistrationForm";

jest.mock("../../src/assets/logo-auth-left.svg");
jest.mock("mapbox-gl");

test("renders learn react link", () => {
    const { container } = render(<LoginRegistrationForm />);
    expect(container.innerHTML).toMatch("Новый пользователь?");
});

test("renders shallow", () => {
    // const wrapper = shallow(<AuthProvider />);
    // expect(wrapper.contains(<LoftTaxi />)).toBeTruthy(); // не поддерживается версия выше 16-ой
    const wrapper = shallow(<RegistrationForm />);
    expect(wrapper.find("div")).toBeDefined();
    console.info(wrapper.find("div"));
    // wrapper.find("button").simulate("click");
});

test("it renders correctly", () => {
    const tree = renderer.create(<AuthProvider />).toJSON(),
          loftTree = renderer.create(<LoftTaxi />).toJSON(),
          { getByTestId } = render(<LoftTaxi loggedIn={true} />);
    
    expect(tree).toMatchSnapshot(); // отрендерился как null
    expect(loftTree).toMatchSnapshot();
    expect(getByTestId("map-wrapper").firstChild).toBeTruthy(); // потому что loggedIn === true
});
