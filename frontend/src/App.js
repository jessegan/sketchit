import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';

import Header from './components/Header'
import Home from './containers/Home'
import LobbyContainer from './containers/LobbyContainer'

const App = () => {
  return (
    <div className="App">
      <Header />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/:code" render={ routerProps => <LobbyContainer {...routerProps} /> } />
      </Router>
    </div>
  )
}

export default App;
