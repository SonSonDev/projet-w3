import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"

import EmployeesIndex from "./pages/employees/index"
import EmployeeCreate from "./pages/employees/create"
import EmployeeUpdate from "./pages/employees/update"
import EmployeeInfo from "./pages/employees/info"

import ClientsIndex from "./pages/clients/index"
import ClientCreate from "./pages/clients/create"
import ClientUpdate from "./pages/clients/update"
import ClientInfo from "./pages/clients/info"

import PlacesIndex from "./pages/place/index"
import PlaceCreate from "./pages/place/create"
import PlaceUpdate from "./pages/place/update"
import PlaceInfo from "./pages/place/info"

import CompaniesIndex from "./pages/companies/index"
import CompanyCreate from "./pages/companies/create"
import CompanyUpdate from "./pages/companies/update"
import CompanyInfo from "./pages/companies/info"
import CompanyEmployeeSignup from "./pages/companies/employee-signup"

import NotFound from "./pages/NotFound"

import { ReactComponent as LogoMadu } from "./assets/img/logo-madu.svg"

import { useMutation, useQuery } from "@apollo/react-hooks"
import { LOGOUT, CHECK_AUTH } from "./graphql/mutations/auth"

import UserDataContext from "./utils/UserDataContext"

const App = () => {
  const [logout] = useMutation(LOGOUT, {
    onCompleted () {
      window.location.href = "/"
    },
  })

  const { loading, data } = useQuery(CHECK_AUTH, {
    variables: { role: "ADMIN" },
    fetchPolicy: "no-cache",
  })

  if (loading) return <div/>

  const userData = data ? data.checkAuth : null
  return (
    <section className="app">
      <Router>
        <header className="header">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <LogoMadu style={{width: "64px"}}/>
            </a>
            {userData && (
              <div className="buttons">
                <button className="button is-light" onClick={() => logout()}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {userData && (
          <aside className="menu">
            <ul className="menu-list">
              <li>
                <Link to="/places">Adresses</Link>
              </li>
              { userData.role === "SUPER_ADMIN" && (
                <>
                  <li>
                    <Link to="/clients">Clients</Link>
                  </li>
                  <li>
                    <Link to="/companies">Entreprises</Link>
                  </li>
                </>
              )}
              { userData.role === "ADMIN" && (
                <li>
                  <Link to="/employees">Employés</Link>
                </li>
              )}

            </ul>
          </aside>
        )}

        <UserDataContext.Provider value={userData}>
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
              <Route exact path="/company/:id" component={CompanyInfo} />
              <Route path="/company/:id/signup" component={CompanyEmployeeSignup} />

              <Route component={NotFound} />

            </Switch>
          </div>
        </UserDataContext.Provider>
      </Router>
    </section>
  )
}

export default App
