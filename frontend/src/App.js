import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';

import Header from './components/Header'
import Home from './containers/Home'
import LobbyContainer from './containers/LobbyContainer'

import Container from 'react-bootstrap/Container'

const App = () => {
  return (
    <Container className="App">
      <Header />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/:code" render={ routerProps => <LobbyContainer {...routerProps} /> } />
      </Router>
    </Container>
  )
}

export default App;
