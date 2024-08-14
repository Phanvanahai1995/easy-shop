import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import store from "./store/index.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toaster
        toastOptions={{
          position: "top-right",
          style: {
            background: "#283046",
            color: "white",
          },
        }}
      />
    </Provider>
  </React.StrictMode>
);
