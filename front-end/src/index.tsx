import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import authReducer from "./state/index";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import "mapbox-gl/dist/mapbox-gl.css";

const store = configureStore({
  reducer: authReducer.reducer,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
