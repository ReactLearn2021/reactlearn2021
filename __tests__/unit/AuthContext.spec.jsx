/**
 * @jest-environment jsdom
 */

import React from "react";
import { AuthProvider, AuthContext } from "../../src/Components/AuthContext";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import renderer from "react-test-renderer";

describe("AuthContext", () => {
    test("it sets 'loggedIn' to false value", () => {
        let loggedIn,
            logIn;

        render(
            <AuthProvider>
                <AuthContext.Consumer>
                    { (value) => {
                        loggedIn = value.loggedIn;
                        logIn = value.logIn;
                        return null;
                    } }
                </AuthContext.Consumer>
            </AuthProvider>
        );

        expect(loggedIn).toEqual(false);
        act(() => {
            logIn("actual@mail.ru", "жальКонечнЧтоТайпскриптаНет((");
        });
        expect(loggedIn).toBeTruthy();
    });

    test("it matches snapshot", () => {
        const tree = renderer.create(<AuthProvider />).toJSON();
        expect(tree).toMatchSnapshot(); // отрендерился как null
    });
});