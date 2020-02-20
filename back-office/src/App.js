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

import ItemNav from "./components/itemNav"
import { ReactComponent as LogoMadu } from "./assets/img/logo/full.svg"

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
    fetchPolicy: "no-cache",
  })

  if (loading) return <div/>

  const userData = data ? data.checkAuth : null
  return (
    <section className="app">
      <Router>
        {userData && (

          <header className="header">
            <div className="navbar-brand">
              <a className="navbar-item" href="/">
                <LogoMadu style={{width: "64px"}}/>
              </a>
            </div>

            <div className="dropdown is-right is-hoverable">
              <div className="dropdown-trigger">
                <div className="flex items-center my05">
                  <div className="right-align">
                    <span className="has-text-grey">{`${userData.role === "SUPER_ADMIN" ? "Super Administrateur" : `Représentant de ${userData.company.name}`}`}</span>
                    <div className="bold lh-1">{`${userData.firstName} ${userData.lastName}`}</div>
                  </div>
                  <span className="icon is-medium"><i className="ri-arrow-down-s-fill"/></span>
                </div>
              </div>

              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <button onClick={e => e.currentTarget.blur() || logout()} className="dropdown-content button is-danger is-inverted right">
                  <span className="icon mr05"><i className="ri-logout-box-r-line"/></span>
                  <span className="h6">Se déconnecter</span>
                </button>
              </div>
            </div>

          </header>
        )}

        {userData && (
          <aside className="menu">
            <ul className="menu-list">
              <ItemNav link="/places" icon="ri-store-2-line">Addresses</ItemNav>
              { userData.role === "SUPER_ADMIN" && (
                <>
                  <ItemNav link="/clients" icon="ri-group-line">Utilisateurs</ItemNav>
                  <ItemNav link="/companies" icon="ri-building-line">Entreprises</ItemNav>
                </>
              )}
              { userData.role === "ADMIN" && (
                <ItemNav link="/employees" icon="ri-group-line">Employés</ItemNav>
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
