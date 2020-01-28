import React from 'react'
import {BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'

import Home from './pages/Home'

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="app">
        <div>

        </div>
        <Router>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
