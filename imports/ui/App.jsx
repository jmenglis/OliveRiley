import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { Link } from 'react-router'
import NavLink from './NavLink'

export default React.createClass({
  render() {
    return (
      <div>
        <h4 className="header-text"><Link to="/">Olive Riley</Link></h4>
        <p className="header-sub">The world's premier baby destination</p>
        <ul id="dropdown1" className="dropdown-content">
          <li><NavLink to="/accessories/one/">one</NavLink></li>
          <li><NavLink to="/accessories/two/">two</NavLink></li>
        </ul>
        <nav>
          <div className="nav-wrapper">
            <div className="container">
              <ul className="hide-on-med-down">
                <li><NavLink to="/clothing/">Clothing</NavLink></li>
                <li><NavLink to="/strollers/">Strollers</NavLink></li>
                <li><NavLink className="dropdown-button" to="/accessories/" data-activates="dropdown1">Accessories</NavLink></li>
                <li><NavLink to="/bottle/">Bottle</NavLink></li>
                <li><NavLink to="/other/">Other Things</NavLink></li>
                <li><NavLink to="/admintax/">Admin Tax</NavLink></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
        {this.props.children || <Home/>}
        </div>
      </div>
    );
  }
})

