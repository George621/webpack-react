import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Link } from "react-router-dom";

const PrimaryLayout = () => {
  <div>
    <header> Our React Router4</header>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="User">User</Link>
      </li>
    </ul>
    <main>
      <Route path="/" component={Home} />
      <Route path="/User"  component={User} />
    </main>
  </div>
}

const HomePage = () =>{<h1>Home page</h1>}
const User = () =>{<h1>User page</h1>}


export default PrimaryLayout