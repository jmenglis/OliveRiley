import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default React.createClass({
  getInitialState() {
    return {
      product: []
    }
  },
  componentDidMount() {
    let productSlug = this.props.params.id
    Meteor.call('product.get', productSlug, (err, data) => {
      this.setState({ product: data })
    })
  },
  render() {
    return (
      <div>
        {this.state.product.map((prod, i) => {
          console.log(prod)
          return (
            <div>
              <ul>
                <li>{prod.title}</li>
                {prod.images.map((image, i) => {
                  return (
                    <li key={i}>
                      <img src={image.url.http} />
                    </li>
                  )
                })}
                <li>{prod.description}</li>
              </ul>
            </div>
          )
        })}
      </div>
    )
  }
})
