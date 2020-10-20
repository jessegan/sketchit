import React from 'react'
import { connect } from 'react-redux'

import logo from '../images/sketchit_logo.png'

import Alert from 'react-bootstrap/Alert'

const Header = props => {
  return (
    <>
    { props.errors.length > 0 ? <Alert variant="warning" >{ props.errors[0]}</Alert> : <></> }
    <img src={ logo } height="100" />
    </>
  )
}

const mapStateToProps = state => {
  return {
    errors: state.errors
  }
}

export default connect(mapStateToProps)(Header)