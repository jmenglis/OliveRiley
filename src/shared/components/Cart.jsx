import React, { Component, PropTypes } from 'react'
import request from 'superagent'
import Masonry from 'react-masonry-component'

export default class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
    }
    this.pluckByName = this.pluckByName.bind(this)
  }
  pluckByName(inArr, id, exists) {
    for (let i = 0; i < inArr.length; i++) {
      if (inArr[i].id == id) {
        return (exists === true) ? true : inArr[i]
      }
    }
  }
  componentDidMount() {
    request
      .get('/api/cart')
      .end((err, res) => {
        for (let key in res.body.contents) {
          let itemObject = {
            id: res.body.contents[key].id,
            name: res.body.contents[key].name,
            price: res.body.contents[key].price.toFixed(2),
            image: res.body.contents[key].images[0].url.http,
            slug: res.body.contents[key].slug,
            quantity: res.body.contents[key].quantity
          }
          this.setState({products: this.state.products.concat(itemObject)})
        }
      })
  }
  render() {
    console.log(this.state.products)
    return (
      <div>
        <div className="cenerize">
          <h4>Your Shopping Cart</h4>
        </div>
      </div>
    )
  }
}
