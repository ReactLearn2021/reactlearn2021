/**
 * @jest-environment jsdom
 */

import { authMiddleware } from "../../src/middleware/authMiddleware";
import { authenticate } from "../../src/store/actions";
import { serverLogin } from "../../src/middleware/api";

jest.mock("../../src/middleware/api", () => ({
    serverLogin : jest.fn(() => Promise.resolve(true))
}));

test("auth middleware", async (done) => {
    const dispatch = jest.fn();
    await authMiddleware({ dispatch })()(authenticate("testlogin", "testpassword"));
    expect(serverLogin).toHaveBeenLastCalledWith("testlogin", "testpassword");
    expect(dispatch).toHaveBeenLastCalledWith({ type : "LOG_IN" });
    done();
});