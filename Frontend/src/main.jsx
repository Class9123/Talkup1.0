"use client";
import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx"

let theme = localStorage.getItem("data-theme");
if (theme !== null) {
  document.documentElement.setAttribute("data-theme", theme);
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element not found. Ensure you have a <div id='root'></div> in your index.html.");
}



createRoot(rootElement).render(
  // <React.StrictMode>
  <BrowserRouter>
      <App />
  </BrowserRouter>
  // </React.StrictMode>
);