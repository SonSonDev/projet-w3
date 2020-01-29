import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Nav, Site } from "tabler-react";

import Home from './pages/Home'
import Employees from './pages/Employees'
import Clients from './pages/Clients'
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
        <Site.Header imageURL="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Docker_%28container_engine%29_logo.svg/1280px-Docker_%28container_engine%29_logo.svg.png"></Site.Header>
      </header>
      <nav class="app__nav">
        <Site.Nav items={[
          <Nav.Item to="/client">Clients</Nav.Item>,
          <Nav.Item to="/place">Places</Nav.Item>,
          <Nav.Item to="/employee">Employees</Nav.Item>,
          localStorage.getItem("isLoggedIn") === "true" ? (
            <div onClick={() => logout()}>Logout</div>
          ) : (
            <>
              <Nav.Item to="/login">Login</Nav.Item>
            </>
          )
        ]
        }></Site.Nav>
      </nav>

      <div class="main">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/place" component={Places} />
            <Route exact path="/client" component={Clients} />
            <Route exact path="/employee" component={Employees} />
          </Switch>
        </Router>
      </div>
    </section>
  )
}

export default App
