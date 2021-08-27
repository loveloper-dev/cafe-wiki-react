import { createStore, combineReducers } from "redux";
import { menuList, user } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

// 추가될 때마다 컴바인으로 묶어주기
const reducers = combineReducers({ menuList, user });

const store = createStore(reducers, composeWithDevTools());

export default store;
