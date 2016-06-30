import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

var IndividualProduct = React.createClass({
  render() {
    return (
      <ul>
        <li><a href={`/products/${this.props.data.slug}`}>{this.props.data.title}</a></li>
        <li><a href={`/products/${this.props.data.slug}`}><img src={this.props.data.images[0].url.http}/></a></li>
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
          return <IndividualProduct key={i} data={prod} />
        })}
      </div>
    )
  }
})

