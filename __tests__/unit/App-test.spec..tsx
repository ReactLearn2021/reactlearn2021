import { render, screen } from '@testing-library/react';
import LoftTaxi from '../../src/LoftTaxi';
jest.mock("../../src/Login/LoginPage");


test('renders learn react link', () => {
    const { container, getByLabelText } = render(<LoftTaxi />);
    // const linkElement = screen.getByText(/learn react/i);
    // expect(linkElement).toBeInTheDocument();
    expect(container.innerHTML).toMatch("LOGIN");
    expect(getByLabelText("Email")).toHaveAttribute("htmlFor", "login");
});
