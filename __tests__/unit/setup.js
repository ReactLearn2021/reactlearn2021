import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "regenerator-runtime/runtime.js";
import configureStore from 'redux-mock-store'

const initialState = {
    auth : { loggedIn : true },
    profile : { initials : "Web Developer", cardnum : "0000 0000 0000 0000", cardterm : "00/00", cvc : "000", full : true },
    addresses : { addressList : [], coordinates : [] },
    errors : { error : "" }
},
    mockStore = configureStore();

configure({ adapter : new Adapter() });
window.URL.createObjectURL = jest.fn();
globalThis.mockStore = mockStore(initialState);

jest.setTimeout(4000);