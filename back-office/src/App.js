import React, { useState } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"

import EmployeesIndex from "./pages/employee/index"
import EmployeeForm from "./pages/employee/form"

import UsersIndex from "./pages/user/index"

import PlacesIndex from "./pages/place/index"
import PlaceForm from "./pages/place/form"

import CompaniesIndex from "./pages/company/index"
import CompanyForm from "./pages/company/form"
import CompanyInfo from "./pages/company/info"
import CompanyEmployeeSignup from "./pages/company/employee-signup"

import ChallengesIndex from "./pages/challenge/index"
import ChallengeForm from "./pages/challenge/form"

import ArticlesIndex from "./pages/article/index"
import ArticleForm from "./pages/article/form"

import NotFound from "./pages/NotFound"

import ItemNav from "./components/itemNav"
import Dropdown from "./components/Dropdown"
import { ReactComponent as LogoMadu } from "./assets/img/logo/full-2.svg"

import { useMutation, useQuery } from "@apollo/react-hooks"
import { LOGOUT, CHECK_AUTH } from "./graphql/auth"

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
              <a className="navbar-item px2" href="/">
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
                <ItemNav links={["users", "user"]} icon="ri-group-line">
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

                <Route exact path="/users" component={UsersIndex} />

                <Route exact path="/places" component={PlacesIndex} />
                <Route path="/place/create" component={PlaceForm} />
                <Route path="/place/:id/edit" component={PlaceForm} />

                <Route exact path="/employees" component={EmployeesIndex} />
                <Route exact path="/employee/create" component={EmployeeForm} />
                <Route path="/employee/:id/update" component={EmployeeForm} />

                <Route exact path="/companies/" component={CompaniesIndex} />
                <Route exact path="/company/create" component={CompanyForm} />
                <Route path="/company/:id/edit" component={CompanyForm} />
                <Route exact path="/company/:id" component={CompanyInfo} />
                <Route path="/company/:id/signup" component={CompanyEmployeeSignup} />

                <Route exact path="/challenges/" component={ChallengesIndex} />
                <Route exact path="/challenge/create" component={ChallengeForm} />
                <Route exact path="/challenge/:id/edit" component={ChallengeForm} />

                <Route exact path="/article/create" component={ArticleForm} />
                <Route exact path="/article/:id/edit" component={ArticleForm} />
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
