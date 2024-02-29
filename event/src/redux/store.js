"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import { Provider } from "react-redux";
import eventSlice from "./slices/eventSlice";
const rootReducer = combineReducers({
  auth: userSlice,
  eventSearch: eventSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
