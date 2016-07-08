import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import Masonry from 'react-masonry-component'
import _ from 'lodash'

export default class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
    }
  }
  componentDidMount() {
    Meteor.call('cart.get', (err, data) => {
      for (let key in data) {
        for (let key in data.contents) {
            let itemsObject = data.contents[Object.keys(data.contents)]
          for (let key in itemsObject) {
            let itemObject = {
              id: itemsObject.id,
              name: itemsObject.name,
              price: itemsObject.price.toFixed(2),
              image: itemsObject.images[0].url.http,
              slug: itemsObject.slug
            }
            // let prodsArray = this.state.product
            // if(_.isEqaul(this.state.products,prodsArray) ) {
            //   console.log("already exists");
            // }
          }
        }
      }
    })
  }
  render() {
    return (
      <div>
        <h1>Cart</h1>
      </div>
    )
  }
}

