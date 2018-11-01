import "./sass/main.scss";
import React, {component} from "react";
import { render } from "react-dom";
import Home from "./components/Home/Home";

const HomePage = () =>{return <h1>Home page</h1>}
const User = () =>{return <h1>User page</h1>}

render(
  <Home></Home>,
 document.getElementById("app")
)
