import { combineReducers } from "@reduxjs/toolkit";
import userInfoReducer from "./Reducers/userInfoReducer";
import cartReducer from "./Reducers/cartReducer";
const rootReducer = combineReducers({
  user: userInfoReducer,
  cart: cartReducer,
});

export default rootReducer;
