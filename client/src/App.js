import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import E0 from './components/DevE0'
import E1 from './components/DevE1'
import E2 from './components/DevE2'
import TechLeadE0 from './components/TechLeadE0'
import TechLeadE1 from './components/TechLeadE1'
import TechLeadE2 from './components/TechLeadE2'
import LoginError from './components/LoginError'
import RegisterError from './components/RegisterError'
import Success from './components/RegisterSuccess'
import Home from './components/Home'
import Profile from './components/Profile'

class App extends Component {
render() {
    return (
      <Router>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/loginerror" component={LoginError} />
          <Route exact path="/registererror" component={RegisterError} />
          <Route exact path="/success" component={Success} />
          <Route exact path="/devE0" component={E0} />
          <Route exact path="/devE1" component={E1} />
          <Route exact path="/devE2" component={E2} />
          <Route exact path="/techleadE0" component={TechLeadE0} />
          <Route exact path="/techleadE1" component={TechLeadE1} />
          <Route exact path="/techleadE2" component={TechLeadE2} />
            <Route exact path="/profile" component={Profile} /> 
      </Router>
    )
  }
}

export default App
