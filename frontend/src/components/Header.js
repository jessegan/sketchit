import React from 'react'
import { connect } from 'react-redux'

const Header = props => {
  return (
    <>
    { props.errors.length > 0 ? <span style={{color: "red"}}>{ props.errors[0]}</span> : <></> }
    <h1>Sketchit</h1>
    </>
  )
}

const mapStateToProps = state => {
  return {
    errors: state.errors
  }
}

export default connect(mapStateToProps)(Header)