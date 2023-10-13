import React, { createContext } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from 'react-router-dom'
import { AppContextProvider } from "./Contexts/AppContext";

export const AppContext = createContext()


ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <Router>
        <App />
      </Router>
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
