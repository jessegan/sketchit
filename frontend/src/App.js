import React from 'react';
import './App.css';

import Header from './components/Header'
import Home from './containers/Home'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = props => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={ Home } />
        </Switch>
      </div>
    </Router>
  )
}

export default App;
