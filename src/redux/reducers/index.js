import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import rootReducer from "./rootReducer";

const history = (history) =>
  combineReducers({
    router: connectRouter(history),
    rootReducer,
    authReducer,
  });

export default history;
