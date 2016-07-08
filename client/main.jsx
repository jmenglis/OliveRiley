import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router'

import routes from '../imports/ui/routes.jsx';

$(".dropdown-button").dropdown();

Meteor.startup(() => {
  render(<Router routes={routes} history={browserHistory} />, document.getElementById('react-render'));
});


