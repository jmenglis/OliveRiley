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
          console.log(res.body.contents)
          let itemObject = {
            id: res.body.contents[key].id,
            brand: res.body.contents[key].brand.value,
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
  changeQuantity(id, i, e) {
    const quantityItem = this.state.products
    request
      .post('/api/cart/quantity')
      .send({
        id: id,
        quantity: e.target.value
      })
      .end((err, res) => {
        quantityItem[i].quantity = res.body.quantity
        this.setState({products: quantityItem})
      })
  }
  render() {
    return (
      <div>
        <div className="centerize">
          <h4>Your Shopping Cart</h4>
        </div>
        {this.state.products.map((prod, i) => {
          return <ul id="cart-list" key={prod.id}>
            <li><strong>{prod.brand}</strong> - {prod.name}</li>
            <li>Price (Unit): {prod.price}</li>
            <li><input type="number" value={prod.quantity} onChange={this.changeQuantity.bind(this, prod.id, i)} /></li>
          </ul>
        })}
      </div>
    )
  }
}
