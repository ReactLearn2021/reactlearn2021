import React from "react";
import { withAuth } from "../AuthContext";

const Profile = () => {
    return(
        <>
            <h2><i>Профиль</i></h2>
        </>
    );
}

export const ProfileWithAuth = withAuth(Profile);
export default Profile;