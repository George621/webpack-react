import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import HomePage from "../homePage/HomePage";
import User from "../user/User";
import "./primaryLayout.scss";

 class PrimaryLayout extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return <div className="nav-contain">
      <header> Our React Router4</header>
      <ul className="nav clear">
        <li>
          <Link to="/">HomeHomePage</Link>
        </li>
        <li>
          <Link to="/User">User</Link>
        </li>
      </ul>
      <main>
        <Route path="/" exact component={HomePage} />
        <Route path="/User" exact  component={User} />
      </main>
    </div>
  }
}

export default PrimaryLayout