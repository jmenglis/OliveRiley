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
            brand: res.body.contents[key].brand.value,
            name: res.body.contents[key].name,
            price: res.body.contents[key].price.toFixed(2),
            image: res.body.contents[key].images[0].url.http,
            slug: res.body.contents[key].slug,
            quantity: res.body.contents[key].quantity,
            total: res.body.contents[key].totals.pre_discount.raw.without_tax.toFixed(2)
          }
          this.setState({products: this.state.products.concat(itemObject)})
        }
      })
  }
  changeQuantity(id, i, e) {
    const updateItem = this.state.products
    if(!e.target.value) {
      updateItem[i].quantity = ''
      updateItem[i].total = 0
      this.setState({products: updateItem})
    } else if (e.target.value === '0') {
      updateItem[i].quantity = 0
      updateItem[i].total = 0
      this.setState({products: updateItem})
    } else {
      request
        .post('/api/cart/quantity')
        .send({
          id: id,
          quantity: e.target.value
        })
        .end((err, res) => {
          updateItem[i].quantity = res.body.quantity
          updateItem[i].total = res.body.totals.pre_discount.raw.without_tax.toFixed(2)
          this.setState({products: updateItem})
        })
    }
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="centerize">
            <h4>Your Shopping Cart</h4>
          </div>
        </div>
        <div className="row">
          {this.state.products.map((prod, i) => {
            return <ul id="cart-list" key={prod.id}>
              <li style={{width: "200px"}}><img src={prod.image} style={{width: "100%"}}></img></li>
              <li style={{width: "200px"}}><strong>{prod.brand}</strong> - {prod.name}</li>
              <li style={{width: "200px"}}>Price (Unit): ${prod.price}</li>
              <li><input type="number" min="0" max="100" value={prod.quantity} onChange={this.changeQuantity.bind(this, prod.id, i)} /></li>
            </ul>
          })}
        </div>
        <div className="row">
          <Total data={this.state.products} />
        </div>
      </div>
    )
  }
}


export class Total extends Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 0
    }
  }
  componentWillReceiveProps(nextProps) {
    let total = 0
    for (let key in nextProps.data) {
      let itemTotal = parseFloat(nextProps.data[key].total)
      total = total + itemTotal
    }
    this.setState({total: total})
  }
  render() {
    return <div className="row">
      <div className="col s9" style={{height: "2px"}}>
      </div>
      <div className="col s3" style={{textAlign: "right"}}>
        <strong>Subtotal - ${this.state.total}</strong>
      </div>
    </div>
  }
}