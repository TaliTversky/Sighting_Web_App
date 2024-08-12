import React from "react";
import ReactDOM from "react-dom/client";
import config from "./amplifyconfiguration";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Amplify } from "aws-amplify";
import "./index.css";

Amplify.configure(config);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
