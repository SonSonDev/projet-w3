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
import PlaceForm from "./pages/place/form"

import CompaniesIndex from "./pages/companies/index"
import CompanyCreate from "./pages/companies/create"
import CompanyUpdate from "./pages/companies/update"
import CompanyInfo from "./pages/companies/info"
import CompanyEmployeeSignup from "./pages/companies/employee-signup"

import ChallengesIndex from "./pages/challenges/index"
import ChallengeCreate from "./pages/challenges/create"

import ArticlesIndex from "./pages/articles/index"
import ArticleCreate from "./pages/articles/form"

import NotFound from "./pages/NotFound"

import ItemNav from "./components/itemNav"
import Dropdown from "./components/Dropdown"
import { ReactComponent as LogoMadu } from "./assets/img/logo/full.svg"

import { useMutation, useQuery } from "@apollo/react-hooks"
import { LOGOUT } from "./graphql/mutations/auth"
import { CHECK_AUTH } from "./graphql/queries/auth"

import UserDataContext from "./utils/UserDataContext"
import ToastContext from "./utils/ToastContext"

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

  const [ toast, setToast ] = useState(null)

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
                    <span className="is-size-6 has-text-grey">{`${userData.role === "SUPER_ADMIN" ? "Super Administrateur" : userData.company ? `Représentant de ${userData.company.name}` : "" }`}</span>
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

            {/* <Dropdown
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
            </Dropdown> */}

            <ul className="menu-list">

              {userData.role === "ADMIN" && (
                <ItemNav links={["employees", "employee"]} icon="ri-group-line">
                  Employés
                </ItemNav>
              )}

              {userData.role === "SUPER_ADMIN" && <>
                <ItemNav links={["companies", "company"]} icon="ri-building-line">
                  Clients
                </ItemNav>
                <ItemNav links={["places", "place"]} icon="ri-map-pin-line">
                  Adresses
                </ItemNav>
                <ItemNav links={["clients", "client"]} icon="ri-group-line">
                  Utilisateurs
                </ItemNav>
                <ItemNav links={["challenges", "challenge"]} icon="ri-flag-2-line">
                  Défis
                </ItemNav>
                <ItemNav links={["articles", "article"]} icon="ri-article-line">
                  Articles
                </ItemNav>
              </>}

            </ul>
          </aside>
        )}

        <UserDataContext.Provider value={userData}>
          <ToastContext.Provider value={{ setToast: ({ type, message }) => setToast({ type, message, key: Date.now() }) }}>
            <div className="main">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />

                <Route exact path="/client/create" component={ClientCreate} />
                <Route exact path="/clients" component={ClientsIndex} />
                <Route path="/client/:id/update" component={ClientUpdate} />
                <Route path="/client/:id" component={ClientInfo} />

                <Route exact path="/places" component={PlacesIndex} />
                <Route path="/place/create" component={PlaceForm} />
                <Route path="/place/:id/edit" component={PlaceForm} />

                <Route exact path="/employee/create" component={EmployeeCreate} />
                <Route exact path="/employees" component={EmployeesIndex} />
                <Route path="/employee/:id/update" component={EmployeeUpdate} />
                <Route path="/employee/:id" component={EmployeeInfo} />

                <Route exact path="/company/create" component={CompanyCreate} />
                <Route exact path="/companies/" component={CompaniesIndex} />
                <Route path="/company/:id/update" component={CompanyUpdate} />
                <Route exact path="/company/:id" component={CompanyInfo} />
                <Route path="/company/:id/signup" component={CompanyEmployeeSignup} />

                <Route exact path="/challenge/create" component={ChallengeCreate} />
                <Route exact path="/challenges/" component={ChallengesIndex} />

                <Route exact path="/article/create" component={ArticleCreate} />
                <Route exact path="/articles/" component={ArticlesIndex} />

                <Route component={NotFound} />

              </Switch>
              {toast && (
                <div className={[ "toast message fixed z1 bottom-0 left-0 ml3 pr3 mb3", toast.type === "success" ? "is-success" : "is-danger" ].join(" ")} key={toast.key}>
                  <div className='message-body'>
                    {toast.message || (toast.type === "success" ? "Opération terminée" : "Une erreur est survenue")}
                  </div>
                </div>
              )}
            </div>
          </ToastContext.Provider>
        </UserDataContext.Provider>
      </Router>
    </section>
  )
}

export default App
