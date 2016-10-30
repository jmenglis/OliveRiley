import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link, browserHistory } from 'react-router'
import request from 'superagent'


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: this.props.location.query.location || null,
      email: this.props.location.query.email || null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.email).value = this.state.email || null;
  }
  handleSubmit(event) {
    event.preventDefault();
    let email = ReactDOM.findDOMNode(this.refs.email).value.trim().toLowerCase();
    let password = ReactDOM.findDOMNode(this.refs.password).value.trim();
    request
      .post('/api/login')
      .send({
        email: email,
        password: password,
      })
      .set('Accept','application/json')
      .end((err, res) => {
        // Add changes here for when a user is logged in
      });
  }
  render() {
    return (
      <div>
        <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">email</i>
              <input ref="email" id="email" type="email" className="validate" />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">lock</i>
              <input ref="password" id="password" type="password" className="validate" />
              <label htmlFor="password">Password</label>
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
};

