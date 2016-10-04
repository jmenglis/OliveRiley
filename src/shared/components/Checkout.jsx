import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import request from 'superagent'

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loggedIn: null,
    };
  }
  componentDidMount() {
    request
      .get('/api/checkout')
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
          };
          this.setState({products: this.state.products.concat(itemObject)})
        }
      });
  }
  render() {
    return (
        <div>
          {this.loggedIn ? <loggedIn data={this.state.products} /> : <loggedOut />}
        </div>
    );
  }
};

export default class loggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return  (
      <div className="row">
        <h1>Logged In</h1>
      </div>
    );
  }
};

export default class loggedOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return  (
      <div className="row">
        <h1>Logged Out</h1>
      </div>
    );
  }
};
