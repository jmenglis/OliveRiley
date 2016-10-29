import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link, browserHistory } from 'react-router'
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
    this.state = {
      customer: {},
      error_message: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.state.error_message = '';
    let email = ReactDOM.findDOMNode(this.refs.email).value.trim().toLowerCase();
    let email_confirm = ReactDOM.findDOMNode(this.refs.email_confirm).value.trim().toLowerCase();
    let password = ReactDOM.findDOMNode(this.refs.password).value.trim();
    let password_confirm = ReactDOM.findDOMNode(this.refs.password_confirm).value.trim();

    if (email === email_confirm) {
      request
        .get('/api/customers')
        .query({email: email})
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res.body.length > 0) {
            browserHistory.push('/login/?location=checkout&email=' + email);
          } else if (password.length > 6 && password == password_confirm) {
            _submitRequest();
          } else if (password.length < 6) {
            this.setState({
              error_message: "Your password must be contain at least 6 characters."
            })
          } else {
            this.setState({
              error_message: "Your passwords do not match."
            })
          }
        });
    } else {
      this.setState({
        error_message: "The emails entered do not match.  Please confirm."
      })
    }

    let _submitRequest = () => {
      this.setState({
        customer: {
          first_name: ReactDOM.findDOMNode(this.refs.first_name).value.trim(),
          last_name: ReactDOM.findDOMNode(this.refs.last_name).value.trim(),
          phone_number: ReactDOM.findDOMNode(this.refs.phone_number).value.trim(),
          address1: ReactDOM.findDOMNode(this.refs.address1).value.trim(),
          city: ReactDOM.findDOMNode(this.refs.city).value.trim(),
          state: ReactDOM.findDOMNode(this.refs.dropdown).value.trim(),
          zipcode: ReactDOM.findDOMNode(this.refs.zipcode).value.trim(),
          email: email,
          password: password,
        }
      });
      if (!this.state.customer.phone_number) {
        this.setState({
          error_message: 'Please enter a phone number.'
        })
      } else if (!this.state.customer.address1) {
        this.setState({
          error_message: 'Please enter an address.'
        })
      } else if (!this.state.customer.city) {
        this.setState({
          error_message: 'Please enter a city.'
        })
      } else if (this.state.customer.state.length === 0) {
        this.setState({
          error_message: 'Please enter a state.'
        })
      } else if (!this.state.customer.zipcode) {
        this.setState({
          error_message: 'Please enter a zip code.',
        })
      }
      else {
        request
          .post('/api/customers')
          .send(this.state.customer)
          .set('Accept', 'application/json')
          .end((err, res) => {
            if (res.body) {
              let customer = this.state.customer;
              customer.password = null;
              this.setState({
                customer: customer,
              })
              _sendCustomerDetails(res.body.id);
            } else {
              this.setState({
                error_message: 'There was some type of issue.  Please try again',
              })
            }
          })
      }
    }

    let _sendCustomerDetails = (customerid) => {
      request
        .post('/api/customers/' + customerid + '/address')
        .send(this.state.customer)
        .set('Accept', 'application/json')
        .end((err, res) => {

        })
    }
  }
  render() {
    return  (
      <div className="row">
        <div className="row">
          {this.state.error_message}
        </div>
        <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s4">
              <i className="material-icons prefix">account_circle</i>
              <input ref="first_name" id="first_name" type="text" className="validate" />
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className="input-field col s4">
              <input ref="last_name" id="last_name" type="text" className="validate" />
              <label htmlFor="last_name">Last Name</label>
            </div>
            <div className="input-field col s4">
              <input ref="phone_number" id="phone_number" type="text" className="validate" />
              <label htmlFor="phone_number">Phone Number</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">home</i>
              <input ref="address1" id="address1" type="text" className="validate" />
              <label htmlFor="address1">Street Address</label>
            </div>
            <div className="input-field col s2">
              <input ref="city" id="city" type="text" className="validate" />
              <label htmlFor="city">City</label>
            </div>
            <div className="input-field col s2">
              <select ref="dropdown" defaultValue="">
                <option value="" disabled>State</option>
                <option value="AL">AL</option>
                <option value="AK">AK</option>
                <option value="AZ">AZ</option>
              </select>
            </div>
            <div className="input-field col s2">
              <input ref="zipcode" id="zipcode" type="text" className="validate" />
              <label htmlFor="zipcode">Zip</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">email</i>
              <input ref="email" id="email" type="email" className="validate" />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field col s6">
              <input ref="email_confirm" id="email_confirm" type="email" className="validate" />
              <label htmlFor="email_confirm">Confirm Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">lock</i>
              <input ref="password" id="password" type="password" className="validate" />
              <label htmlFor="password">Password</label>
            </div>
            <div className="input-field col s6">
              <input ref="password_confirm" id="password_confirm" type="password" className="validate" />
              <label htmlFor="password_confirm">Confirm Password</label>
            </div>
          </div>
          <div className="row" style={{textAlign:'center'}}>
            <button className="btn waves-effect waves-light" type="submit" name="action">Submit
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
