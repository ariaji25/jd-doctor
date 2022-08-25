import { routerMiddleware } from "connected-react-router";
import { createStore, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from "history";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

export const history = createBrowserHistory();

const initialState = {},
  enhancers = [],
  middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export default createStore(
  rootReducer(history),
  initialState,
  composedEnhancers
);
