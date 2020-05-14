import React, { useState, useEffect } from "react"
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
import Dropdown from "./components/Dropdown"
import { ReactComponent as LogoMadu } from "./assets/img/logo/full.svg"

import { useMutation, useQuery } from "@apollo/react-hooks"
import { LOGOUT } from "./graphql/mutations/auth"
import { CHECK_AUTH } from "./graphql/queries/auth"

import UserDataContext from "./utils/UserDataContext"

const App = () => {


  const [logout] = useMutation(LOGOUT, {
    onCompleted () {
      // j’ai pas réussi ><
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

            <Dropdown
              className="is-right"
              TriggerComponent={
                <div className="flex items-center my05">
                  <div className="right-align">
                    <span className="has-text-grey">{`${userData.role === "SUPER_ADMIN" ? "Super Administrateur" : userData.company ? `Représentant de ${userData.company.name}` : "" }`}</span>
                    <div className="bold lh-1">{`${userData.firstName} ${userData.lastName}`}</div>
                  </div>
                  <span className="icon is-medium"><i className="ri-arrow-down-s-fill"/></span>
                </div>
              }
            >
              <button onClick={e => e.currentTarget.blur() || logout()} className="dropdown-item button is-white has-text-grey-dark">
                <span className="icon"><i className="ri-logout-box-r-line"/></span>
                <span className="">Se déconnecter</span>
              </button>
            </Dropdown>

          </header>
        )}

        {userData && (
          <aside className="menu px2 py2">

            <Dropdown
              className='w100 mb2'
              TriggerComponent={
                <button className="button is-primary is-fullwidth">
                  <span className="icon"><i className="ri-add-box-line"/></span>
                  <span className="">Ajouter</span>
                </button>
              }
            >
              <Link to="/place/create" className="dropdown-item">
                Ajouter une adresse
              </Link>
              {userData.role === "ADMIN" && (
                <Link to="/employee/create" className="dropdown-item">
                  Ajouter un employé
                </Link>
              )}
              {userData.role === "SUPER_ADMIN" && (
                <Link to="/company/create" className="dropdown-item">
                  Ajouter une entreprise
                </Link>
              )}
            </Dropdown>

            <ul className="menu-list">

              <ItemNav links={["places", "place"]} icon="ri-store-2-line">
                Adresses
              </ItemNav>

              {userData.role === "ADMIN" && (
                <ItemNav links={["employees", "employee"]} icon="ri-group-line">
                  Employés
                </ItemNav>
              )}

              {userData.role === "SUPER_ADMIN" && <>
                <ItemNav links={["clients", "client"]} icon="ri-group-line">
                  Utilisateurs
                </ItemNav>
                <ItemNav links={["companies", "company"]} icon="ri-building-line">
                  Entreprises
                </ItemNav>
              </>}

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
