// Main Entry Point
// TODO: Import React, ReactDOM, BrowserRouter, App component, and CSS
// TODO: Render the App component wrapped in BrowserRouter inside the root element
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./style.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);