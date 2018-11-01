import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import HomePage from "../homePage/HomePage";
import User from "../user/User";

 class PrimaryLayout extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return <div>
      <header> Our React Router4</header>
      <ul>
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