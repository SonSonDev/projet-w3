import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Users from './pages/Users'
import Companies from './pages/Companies'
import Places from './pages/Places'
import Login from './pages/Login'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/companies" component={Companies} />
        <Route exact path="/places" component={Places} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  )
}

export default App
