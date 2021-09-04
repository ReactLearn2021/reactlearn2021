import axios from "axios";

const loftTaxiGlitch = axios.create({
    baseURL : "https://loft-taxi.glitch.me",
    withCredentials: false
}); // request interceptor token refresh

export const serverLogin = async (email, password) => {
    const userData = { email, password };

    return await loftTaxiGlitch.post("/auth", userData);
}

export const serverReg = async (email, initials, password) => {
    const initialsArray = initials.split(" "),
          userRegData = { email, password, name : initialsArray[1], surname : initialsArray[0] };
    return await loftTaxiGlitch.post("/register", userRegData);
}

export const getCardData = async () => {
    const token = window.localStorage.getItem("TOKEN");
    return await loftTaxiGlitch.get(`/card?token=${token}`, { responseType : "json" })
        .then( response => response.data );
}

export const getAddressListData = async () => {
    return await loftTaxiGlitch.get("/addressList", { responseType : "json" })
        .then( response => response.data );
}

export const setCardData = async (payload) => {
    const token = window.localStorage.getItem("TOKEN"),
          data = {
              token,
              cardNumber : payload.cardNumber,
              expiryDate : payload.expiryDate,
              cardName : payload.cardName,
              cvc : payload.cvc
          };
    return await loftTaxiGlitch.post("/card", data)
        .then(response => response.data.success);
}