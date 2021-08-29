import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "regenerator-runtime/runtime.js";

configure({ adapter : new Adapter() });
window.URL.createObjectURL = jest.fn();
globalThis.mockStore = {
    getState: () => ({ auth : { loggedIn : true }}),
    subscribe: () => {},
    dispatch: () => {}
};

jest.setTimeout(5000);