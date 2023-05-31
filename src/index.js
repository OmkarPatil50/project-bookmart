import React, { createContext } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import {BrowserRouter as Router} from 'react-router-dom'
import { LanderContextProvider } from "./Contexts/LanderContext";

export const LanderContext = createContext()


// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <LanderContextProvider>
    <Router>
    <App />
    </Router>
    </LanderContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
