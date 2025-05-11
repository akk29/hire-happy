import rootReducer from "./reducers";
import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...[thunk])
);
const store = createStore(rootReducer, enhancer);
export default store;
