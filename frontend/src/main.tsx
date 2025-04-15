import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Provider } from "./Provider.tsx";
import { CartProvider } from "@/context/CartContext";
import "@/styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
<<<<<<< Updated upstream
      <Provider>
        <App />
      </Provider>
=======
      <CartProvider>
        <Provider>
          <ToastProvider placement={"top-center"} toastOffset={60} />
          <App />
        </Provider>
      </CartProvider>
>>>>>>> Stashed changes
    </BrowserRouter>
  </React.StrictMode>
);
