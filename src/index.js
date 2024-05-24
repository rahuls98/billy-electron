import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import InvoiceDataContextProvider from "./contexts/invoiceDataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <InvoiceDataContextProvider>
        <App />
    </InvoiceDataContextProvider>
);
