import React, { Component, PropTypes } from 'react'
import Masonry from 'react-masonry-component'
import _ from 'lodash'

export default class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
    }
    this.pluckByName = this.pluckByName.bind(this)
  }
  pluckByName(inArr, id, exists) {
    for (i = 0; i < inArr.length; i++) {
      if (inArr[i].id == id) {
        return (exists === true) ? true : inArr[i]
      }
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

            if (!this.pluckByName(this.state.products, itemObject.id, true)) {
              this.setState({products: this.state.products.concat(itemObject)})
              console.log(this.state.products)
            } else {
              console.log("false")
            }
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

