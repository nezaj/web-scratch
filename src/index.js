import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Airbnb from "./BeAHost/poster";
import Facebook from "./MoveFast/poster";
import JiuJitsu from "./JiuJitsu/poster";
import StroopRepl from "./StroopRepl";

let Component = null;
switch (window.location.pathname) {
  case "/airbnb":
    Component = Airbnb;
    break;
  case "/fb":
    Component = Facebook;
    break;
  case "/bjj":
    Component = JiuJitsu;
    break;
  case "/stroop":
    Component = StroopRepl;
    break;
  default:
    Component = StroopRepl;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Component />);
