import React, { Component } from 'react'
import { connect } from 'react-redux'

import About from '../components/About'
import JoinLobbyFormContainer from './JoinLobbyFormContainer'
import CreateLobbyFormContainer from './CreateLobbyFormContainer'
import { Redirect } from 'react-router-dom'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

/**
 * Home Container
 * 
 * Renders home page of App.
 */
export class Home extends Component {

  render() {
    if(this.props.joiningLobby || this.props.creatingPlayer){
      return (
        <h6>Loading Lobby...</h6>  
      )
    }

    if(this.props.lobbyJoined && this.props.playerCreated){
      return (<Redirect push to={`/${this.props.lobbyCode}`} />)
    }

    return (
      <Row className="justify-content-md-center">
        {/* <ButtonGroup>
          <Button variant="outline-primary" onClick={()=>this.handleOpenFormButton(1)}>Create Lobby</Button>
          <Button variant="outline-primary" onClick={()=>this.handleOpenFormButton(2)}>Join Lobby</Button>
        </ButtonGroup> */}
        <Col lg="6">
          <Tabs defaultActiveKey="about" >
            <Tab eventKey="about" title="About">
              <About />
            </Tab>
            <Tab eventKey="create" title="Create">
              <CreateLobbyFormContainer />
            </Tab>
            <Tab eventKey="join" title="Join">
              <JoinLobbyFormContainer />
            </Tab>
          </Tabs>
        </Col>

      </Row>
    )
  }
}

function mapStateToProps(state){
  return { 
    joiningLobby: state.joiningLobby,
    creatingPlayer: state.creatingPlayer,
    playerCreated: state.playerCreated,
    lobbyJoined: state.lobbyJoined,
    lobbyCode: state.lobbyCode
  }
}

export default connect(mapStateToProps)(Home)
