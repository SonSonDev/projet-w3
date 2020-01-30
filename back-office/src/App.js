import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
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
          <Nav.Item to="/companies">Companies</Nav.Item>,
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
        </Router>
      </div>
    </section>
  )
}

export default App
