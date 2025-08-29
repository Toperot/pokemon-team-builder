import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { TeamProvider } from "./contexts/TeamContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TeamProvider>
      <App />
    </TeamProvider>
  </React.StrictMode>
);
