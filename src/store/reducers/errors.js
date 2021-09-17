const initialState = {
    error : ""
};

export default function(state = initialState, action) {
    switch(action.type) {
        case "ERRORS":
            return { ...state, error : action.payload.error };
        default:
            return state;
    }
}