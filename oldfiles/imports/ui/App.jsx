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
        <p className="header-sub">The world's premier destination</p>
        <ul id="dropdown1" className="dropdown-content">
          <li><NavLink to="/accessories/one/">one</NavLink></li>
          <li><NavLink to="/accessories/two/">two</NavLink></li>
        </ul>
        <nav>
          <div className="nav-wrapper">
            <div className="container">
              <ul className="hide-on-med-down">
                <li><NavLink to="/category/clothing/">Clothing</NavLink></li>
                <li><NavLink to="/category/strollers/">Strollers</NavLink></li>
                <li><NavLink className="dropdown-button" to="/category/accessories/" data-activates="dropdown1">Accessories</NavLink></li>
                <li><NavLink to="/category/bottle/">Bottle</NavLink></li>
                <li><NavLink to="/category/other/">Other Things</NavLink></li>
                <li><NavLink to="/cart/">Shopping Cart</NavLink></li>
              </ul>
            </div>
          </div>
        </nav>
        <br />
        <div className="container">
        {this.props.children || <Home/>}
        </div>
      </div>
    );
  }
})

