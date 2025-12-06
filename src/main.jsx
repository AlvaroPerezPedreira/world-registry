import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { FilterProvider } from "./contexts/FilterContext.jsx";

createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <Router>
      <FilterProvider>
        <App />
      </FilterProvider>
    </Router>
  </NextUIProvider>
);
