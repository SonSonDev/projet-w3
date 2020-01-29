import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Nav, Site } from "tabler-react";

import Home from './pages/Home'
import Employees from './pages/employees'
import Clients from './pages/clients'

import PlacesIndex from './pages/place/index';
import PlaceCreate from './pages/place/create';
import PlaceUpdate from './pages/place/update';

import Login from './pages/Login'

const App = () => {
  const logout = () => {
    console.log("logout");
    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("user", null);
  };
  return (
    <section className="app">
      <header className="app__header">
        <Site.Header imageURL="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Docker_%28container_engine%29_logo.svg/1280px-Docker_%28container_engine%29_logo.svg.png"></Site.Header>
      </header>
      <nav className="app__nav">
        <Site.Nav items={[
          <Nav.Item to="/clients">Clients</Nav.Item>,
          <Nav.Item to="/places">Places</Nav.Item>,
          <Nav.Item to="/employees">Employees</Nav.Item>,
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

      <div className="main">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/client" component={Clients} />
            <Route exact path="/client/create" component={Clients} />

            <Route exact path="/places" component={PlacesIndex} />
            <Route exact path="/place/create" component={PlaceCreate} />
            <Route path="/place/:id/update" component={PlaceUpdate} />

            <Route exact path="/employee" component={Employees} />
            <Route exact path="/employee/create" component={Employees} />
            <Route exact path="/company/" component={Employees} />
            <Route exact path="/company/create" component={Employees} />
          </Switch>
        </Router>
      </div>
    </section>
  )
}

export default App
