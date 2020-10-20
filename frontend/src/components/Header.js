import React from 'react'
import { connect } from 'react-redux'

import logo from '../images/sketchit_logo.png'

import Alert from 'react-bootstrap/Alert'

/**
 * Header Component
 * 
 * Renders app header.
 */
const Header = props => {
  return (
    <>
    { props.errors.length > 0 ? <Alert variant="warning" >{ props.errors[0]}</Alert> : <></> }
    <a href="/"><img src={ logo } alt="Sketchit Logo" height="100" /></a>
    </>
  )
}

const mapStateToProps = state => {
  return {
    errors: state.errors
  }
}

export default connect(mapStateToProps)(Header)