import React from "react";
import App from "./components/App/App";
import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// React 18

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
