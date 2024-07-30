import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import prayersReducer from "./features/prayersSlice";
import App from "./App";
import "./index.css";

const store = configureStore({
  reducer: {
    prayers: prayersReducer,
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
