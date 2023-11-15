import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Airbnb from "./BeAHost/poster";
import Facebook from "./MoveFast/poster";
import JiuJitsu from "./JiuJitsu/poster";
// import StroopRepl from "./StroopRepl";
import BookSummary from "./BookSummary";
import Booky from "./Booky";
import Icon from "./Icon";

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
  // (TODO): Have a scheme where I can load multiple Instant apps
  // case "/stroop":
  //   Component = StroopRepl;
  //   break;
  case "/icon":
    Component = Icon;
    break;
  case "/book-summary":
    Component = BookSummary;
    break;
  default:
    Component = Booky;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Component />);
