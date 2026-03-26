import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { IconContext } from "react-icons";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </IconContext.Provider>
);
