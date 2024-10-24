import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThirdwebProvider } from "thirdweb/react";
import { App } from "./App";
import "./index.css";

const docRoot = document.getElementById("root")!;
const root = ReactDOM.createRoot(docRoot);

root.render(
  <ThirdwebProvider>
    <Router>
      <App />
    </Router>
  </ThirdwebProvider>
);
