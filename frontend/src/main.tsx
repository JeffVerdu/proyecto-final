import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Provider } from "./Provider.tsx";
import { CartProvider } from "@/context/CartContext";
import "@/styles/globals.css";
import { ToastProvider } from "@heroui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Provider>
          <ToastProvider placement={"top-center"} toastOffset={60} />
          <App />
        </Provider>
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);
