import React from 'react';
import './App.css';

import Header from './components/Header'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = props => {
  return (
    <div>
      <Header />
    </div>
  )
}

export default App;
