import "./sass/main.scss";
import React, {component} from "react";
import { render } from "react-dom";
import Home from "./components/Home/Home";

render(
  <Home></Home>,
 document.getElementById("app")
)
