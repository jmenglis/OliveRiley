import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
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
    let element = ReactDOM.findDOMNode(this.refs.dropdown)
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
    $(element).ready(() => {
      $('select').material_select()
    })
  }
  render() {
    return (
        <div>
          {this.state.loggedIn ? <LoggedIn data={this.state.products} /> : <LoggedOut />}
        </div>
    );
  }
};

export class LoggedIn extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return  (
      <div className="row">
        <h1>Logged In</h1>
      </div>
    );
  }
}

export class LoggedOut extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return  (
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s4">
              <i className="material-icons prefix">account_circle</i>
              <input id="first_name" type="text" className="validate" />
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className="input-field col s4">
              <input id="last_name" type="text" className="validate" />
              <label htmlFor="last_name">Last Name</label>
            </div>
            <div className="input-field col s4">
              <input id="phone_number" type="text" className="validate" />
              <label htmlFor="phone_number">Phone Number</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">home</i>
              <input id="address1" type="text" className="validate" />
              <label htmlFor="address1">Street Address</label>
            </div>
            <div className="input-field col s2">
              <input id="city" type="text" className="validate" />
              <label htmlFor="city">City</label>
            </div>
            <div className="input-field col s2">
              <select ref="dropdown" defaultValue="">
                <option value="" disabled>State</option>
                <option value="1">AL</option>
                <option value="2">AK</option>
                <option value="3">AZ</option>
              </select>
            </div>
            <div className="input-field col s2">
              <input id="zipcode" type="text" pattern="\\d{5}-?(\\d{4})?" className="validate" />
              <label htmlFor="zipcode">Zip</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">email</i>
              <input id="email" type="email" className="validate" />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field col s6">
              <input id="email_confirm" type="email" className="validate" />
              <label htmlFor="email_confirm">Confirm Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">lock</i>
              <input id="password" type="password" className="validate" />
              <label htmlFor="password">Password</label>
            </div>
            <div className="input-field col s6">
              <input id="password_confirm" type="password" className="validate" />
              <label htmlFor="password_confirm">Confirm Password</label>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
