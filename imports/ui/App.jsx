import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import AdminTax from './AdminTax.jsx';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <AdminTax />
      </div>
    );
  }
}

