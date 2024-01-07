/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ContextProvider from "./context/Web5Context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <ContextProvider>
        <App />
    </ContextProvider>
);
