import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default React.createClass({
  render() {
    return <h3>Here is the ID passed through: {this.props.params.id}</h3>
  }
})
