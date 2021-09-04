import { GET_ADDRESS_LIST } from "../actions";

const initialState = {
    addressList : []
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ADDRESS_LIST:
            return { ...state, addressList : action.payload };
        default:
            return state;
    }
}