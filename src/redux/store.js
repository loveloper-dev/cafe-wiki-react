import { createStore, combineReducers } from "redux";
import { MenuList } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = combineReducers({ MenuList });

const store = createStore(reducers, composeWithDevTools());

export default store;
