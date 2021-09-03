import { CARD, GET_CARD } from "../actions";

const initialState = {
    initials : "",
    cardnum : "",
    cardterm : "",
    cvc : ""
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_CARD:
            return state;
        case CARD:
            return {
                ...state, 
                initials : action.payload.card.cardName,
                cardnum : action.payload.card.cardNumber,
                cardterm : action.payload.card.expiryDate,
                cvc : action.payload.card.cvc
            };
        default:
            return state;
    }
}