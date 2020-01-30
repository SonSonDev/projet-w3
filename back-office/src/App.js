import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Nav, Site } from "tabler-react";

import Home from './pages/Home';
import Login from './pages/Login';

import EmployeesIndex from './pages/employees/index';
import EmployeeCreate from './pages/employees/create';
import EmployeeUpdate from './pages/employees/update';
import EmployeeInfo from './pages/employees/info';

import ClientsIndex from './pages/clients/index';
import ClientCreate from './pages/clients/create';
import ClientUpdate from './pages/clients/update';
import ClientInfo from './pages/clients/info';

import PlacesIndex from './pages/place/index';
import PlaceCreate from './pages/place/create';
import PlaceUpdate from './pages/place/update';
import PlaceInfo from './pages/place/info';

import CompaniesIndex from './pages/companies/index';
import CompanyCreate from './pages/companies/create';
import CompanyUpdate from './pages/companies/update';
import CompanyInfo from './pages/companies/info';


const App = () => {
  const logout = () => {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("user", null);
    window.location = '/'
  };
  return (
    <section className="app">
        <Router>

      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Docker_%28container_engine%29_logo.svg/1280px-Docker_%28container_engine%29_logo.svg.png"/>
          </a>

          <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        { localStorage.getItem("isLoggedIn") === "true" &&
        (<div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <Link className="navbar-item" to="/clients">Clients</Link>
            <Link className="navbar-item" to="/places">Places</Link>
            <Link className="navbar-item" to="/employees">Employees</Link>
            <Link className="navbar-item" to="/companies">Companies</Link>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a className="button is-light" onClick={() => logout()}>Logout</a>
              </div>
            </div>
          </div>
        </div>)
        }
      </nav>
      <nav className="app__nav">
        <Site.Nav items={[
          
        ]
        }></Site.Nav>
      </nav>
        <div className="main">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />

              <Route exact path="/client/create" component={ClientCreate} />
              <Route exact path="/clients" component={ClientsIndex} />
              <Route path="/client/:id/update" component={ClientUpdate} />
              <Route path="/client/:id" component={ClientInfo} />

              <Route exact path="/place/create" component={PlaceCreate} />
              <Route exact path="/places" component={PlacesIndex} />
              <Route path="/place/:id/update" component={PlaceUpdate} />
              <Route path="/place/:id" component={PlaceInfo} />

              <Route exact path="/employee/create" component={EmployeeCreate} />
              <Route exact path="/employees" component={EmployeesIndex} />
              <Route path="/employee/:id/update" component={EmployeeUpdate} />
              <Route path="/employee/:id" component={EmployeeInfo} />

              <Route exact path="/company/create" component={CompanyCreate} />
              <Route exact path="/companies/" component={CompaniesIndex} />
              <Route path="/company/:id/update" component={CompanyUpdate} />
              <Route path="/company/:id" component={CompanyInfo} />
            </Switch>
        </div>
      </Router>

    </section>
  )
}

export default App
