import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

export default React.createClass({
  render() {
    return (
        <div className="container">
          {this.props.children || <Home/>}
        </div>
    );
  }
})

