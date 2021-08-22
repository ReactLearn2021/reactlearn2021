import React from "react";
import { AuthProvider, AuthContext } from "../../src/Components/AuthContext";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";

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
            logIn(process.env.REACT_APP_ACCESS_EMAIL, process.env.REACT_APP_ACCESS_PASSWORD);
        });
        expect(loggedIn).toBeTruthy();
    });
});