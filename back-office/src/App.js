import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Nav } from "tabler-react";

import Home from './pages/Home'
import Users from './pages/Users'
import Companies from './pages/Companies'
import Places from './pages/Places'
import Login from './pages/Login'

const App = () => {
  const logout = () => {
    console.log("logout");
    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("user", null);
  };
  return (
    <section class="app">
      <header class="app__header">
        <Nav>
          <Nav.Item to="/users">Users</Nav.Item>
          <Nav.Item to="/places">Places</Nav.Item>
          <Nav.Item to="/companies">Companies</Nav.Item>
          <Nav.Item to="/places">Places</Nav.Item>
          {localStorage.getItem("isLoggedIn") === "true" ? (
            <div onClick={() => logout()}>Logout</div>
          ) : (
            <>
              <Nav.Item to="/login">Login</Nav.Item>
            </>
          )}
        </Nav>
      </header>

      <div class="main">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/companies" component={Companies} />
            <Route exact path="/places" component={Places} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Router>
      </div>
    </section>
  )
}

export default App
