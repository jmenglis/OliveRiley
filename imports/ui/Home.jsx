import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default React.createClass({
  getInitialState: () => {
    return { services: [] }
  },
  componentDidMount: () => {
    var self = this;
    Meteor.call('product.get', (err, data) => {
      if (err) {
        console.log(err)
      } else {
        console.log(data);
      }
    })
  },
  render() {
    return <div>Home</div>
  }
})
