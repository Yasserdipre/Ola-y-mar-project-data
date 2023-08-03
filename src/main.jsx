import React from "react";
import ReactDOM from "react-dom/client";
import { App, Navbaritems, Language, Btnlightdark } from "./App.jsx";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import "./languages/en/text_data.json"; // Importa las traducciones para el inglés
import "./languages/es/text_data.json"; // Importa las traducciones para el español
import { BrowserRouter } from "react-router-dom";
import { FiltersProvider } from "./context/filter.jsx";
import { CartProvider } from "./context/cart.jsx";
import { SaveProvider } from "./context/Save.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <CartProvider>
      <SaveProvider>
        <FiltersProvider>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </FiltersProvider>
      </SaveProvider>
    </CartProvider>
  </BrowserRouter>
);
