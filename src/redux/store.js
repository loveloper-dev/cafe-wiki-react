import { createStore, combineReducers } from "redux";
import { User } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const reducers = combineReducers({ user: User }); // alias 지정 가능
const reducers = combineReducers({ User });

const store = createStore(reducers, composeWithDevTools());

export default store;
