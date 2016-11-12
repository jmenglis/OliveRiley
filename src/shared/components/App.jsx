import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import NavLink from './NavLink.jsx'

export default React.createClass({
  render() {
    return (
      <div>
        <div className="header-text">
          <div><h1><Link to="/">Olive Riley</Link></h1></div>
          <div><p>The world's premier destination</p></div>
        </div>
        <div className="wrap">
          <nav className="menu-bar">
            <ul>
              <li><NavLink to="/category/clothing/">Clothing</NavLink></li>
              <li><NavLink to="/category/strollers/">Strollers</NavLink></li>
              <li><NavLink to="/category/accessories/">Accessories</NavLink></li>
              <li><NavLink to="/category/bottle/">Bottle</NavLink></li>
              <li><NavLink to="/category/other/">Other Things</NavLink></li>
              <li><NavLink to="/cart/">Shopping Cart</NavLink></li>
            </ul>
          </nav>
          <br />
        </div>
        <div className="wrap">
          {this.props.children || <Home/>}
        </div>
      </div>
    );
  }
})

