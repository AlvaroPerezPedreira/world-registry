import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <Router>
      <App />
    </Router>
  </NextUIProvider>
);
