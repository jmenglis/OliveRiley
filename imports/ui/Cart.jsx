import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Masonry from 'react-masonry-component';

export default React.createClass({
  getInitialState() {
    return {
      products: []
    }
  },
  componentDidMount() {
    Meteor.call('cart.get', (err, data) => {
      console.log("Sent")
    })
  },
  render() {
    return (
      <div>
        <h1>Cart</h1>
      </div>
    )
  }
})

