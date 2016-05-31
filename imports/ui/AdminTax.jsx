import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
// import { Template } from 'meteor/templating';

/*Template.body.events({
  'submit .create-tax'(event) {
    event.preventDefault();

    const target = event.target;
    const title = target.title.value;
    const description = target.description.value;
    const rate = target.rate.value;

    console.log(title);
    console.log(description);
    console.log(rate);

    Meteor.call('tax.create', [title, description, rate]);

    target.title.value = '';
    target.description.value = '';
    target.rate.value = '';
  },
});*/

export default class AdminTax extends Component {
  handleSubmit(e) {
    e.preventDefault();

    const title = ReactDOM.findDOMNode(this.refs.titleInput).value.trim();
    const description = ReactDOM.findDOMNode(this.refs.descriptionInput).value.trim();
    const rate = ReactDOM.findDOMNode(this.refs.rateInput).value.trim();

    Meteor.call('tax.create', title, description, rate);

    ReactDOM.findDOMNode(this.refs.titleInput).value = '';
    ReactDOM.findDOMNode(this.refs.descriptionInput).value = '';
    ReactDOM.findDOMNode(this.refs.rateInput).value = '';
  }
  render () {
    return (
      <div className="row">
        <form className="col s12 create-tax" onSubmit={this.handleSubmit.bind(this)} >
          <div className="row">
            <div className="input-field col s6">
              <input ref="titleInput" id="title" type="text" name="title" />
              <label for="title">Title</label>
            </div>
            <div className="input-field col s6">
              <input ref="descriptionInput" id="description" type="text" name="description"/>
              <label for="description">Tax Description</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input ref="rateInput" id="rate" type="number" name="rate" step="any" />
              <label for="rate">Enter Tax Rate (i.e. 6.25)</label>
            </div>
          </div>
          <div className="row centerize">
            <button className="btn waves-effect waves-light" type="submit" name="action">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

