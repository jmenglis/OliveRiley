import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

var IndividualProduct = React.createClass({
  render() {
    return (
      <ul>
        <li>{this.props.data.id}</li>
        <li>{this.props.data.title}</li>
        <li><img src={this.props.data.images[0].url.http}/></li>
        <li>Price: {this.props.data.price.data.formatted.without_tax}</li>
      </ul>
    )
  }
})

export default React.createClass({
  getInitialState() {
    return {
      products: []
    }
  },
  componentDidMount() {
    Meteor.call('product.get', (err, data) => {
      this.setState({ products: data })
    })
  },
  render() {
    return (
      <div>
        {this.state.products.map((prod, i) => {
          console.log(prod)
          return <IndividualProduct key={i} data={prod} />
        })}
      </div>
    )
  }
})

