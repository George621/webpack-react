import component from "./component";
import "./sass/main.scss";
import React ,{Component} from "react";
import {render} from "react-dom";
// import Home from "./Components/Home";
import AsyncComponent from "./Components/AsyncComponent";

document.body.appendChild(component());
render(
    <div>
      <AsyncComponent loader={() => import("./Components/Home")} />
    </div>,
  document.getElementById("app")
)
