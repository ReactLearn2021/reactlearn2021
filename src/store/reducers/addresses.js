const initialState = {
    addressList : [],
    coordinates : null
};

export default function(state = initialState, action) {
    switch(action.type) {
        case "GET_ADDRESS_LIST":
            return { ...state, addressList : action.payload.addressList.addresses};
        case "GET_ROUTE":
            return { ...state, coordinates : action.payload.route };
        default:
            return state;
    }
}