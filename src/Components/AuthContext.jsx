import React, { useState } from "react";

export const AuthContext = React.createContext();
export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false),
          logIn = (email, password) => {
                if (email !== process.env.REACT_APP_ACCESS_EMAIL || password !== process.env.REACT_APP_ACCESS_PASSWORD) {
                    return;
                }

                setLoggedIn(true);
          },
          logOut = () => {
                setLoggedIn(false);
          };

    return(
        <AuthContext.Provider value = {{ logIn, logOut, loggedIn }}>
            { children }
        </AuthContext.Provider>
    )
};

export const withAuth = (Wrapped) => {
    return class extends React.Component {
        render() {
            return(
                <AuthContext.Consumer>
                    {
                        (value) => <Wrapped {...value} {...this.props} />
                    }
                </AuthContext.Consumer>
            )
        }
    }
}