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
let APP_ID = null;
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
  // case "/stroop":
  //   APP_ID = process.env.STROOP_APP_ID
  //   Component = StroopRepl;
  //   break;
  case "/icon":
    Component = Icon;
    break;
  case "/book-summary":
    Component = BookSummary;
    break;
  default:
    APP_ID = process.env.BOOKY_APP_ID
    Component = Booky;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Component />);
