import { render, screen } from '@testing-library/react';
import LoftTaxi from '../../src/LoftTaxi';
import React from "react";

jest.mock("../../src/assets/logo-auth-left.svg");

test('renders learn react link', () => {
    const { container } = render(<LoftTaxi />);
    // expect(linkElement).toBeInTheDocument();
    expect(container.innerHTML).toMatch("Имя пользователя");
});
