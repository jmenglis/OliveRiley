import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './body.html';
import './body.html'

$(".dropdown-button").dropdown();


Template.body.events({
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
});
