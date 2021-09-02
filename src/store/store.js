import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { authMiddleware, registerMiddleware, getCardMiddleware } from "../middleware/authMiddleware";

export const store = createStore(rootReducer, applyMiddleware(authMiddleware, registerMiddleware, getCardMiddleware));