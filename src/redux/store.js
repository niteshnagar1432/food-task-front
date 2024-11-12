import cartReducer from "./cartReducer.js";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
