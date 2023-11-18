import { configureStore } from "@reduxjs/toolkit";
import SignInReducer from "../Auth/SignInSlice";
import apiReducer from "./dataSlice";

export const store = configureStore({
  reducer: {
    signIn: SignInReducer,
    api: apiReducer,
  },
});
