import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import Header from './components/Header'
import Home from './containers/Home'
import Lobby from './containers/Lobby'

class App extends Component {

  render(){
    return (
      <div className="App">
        <Header />
        { this.props.lobbyJoined ? <Lobby cableApp={this.props.cableApp} /> : <Home /> }
      </div>
    )
  } 
}

function mapStateToProps(state){
  return {
    lobbyJoined: state.lobbyJoined
  }
}

export default connect(mapStateToProps)(App);
