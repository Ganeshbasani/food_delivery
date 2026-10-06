import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import StoreContextProvider from "./context/StoreContext";
ReactDOM.createRoot(document.getElementById("root")).render(<React.StrictMode><StoreContextProvider><App/></StoreContextProvider></React.StrictMode>);
