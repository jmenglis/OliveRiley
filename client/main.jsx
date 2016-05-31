import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App.jsx';

$(".dropdown-button").dropdown();

Meteor.startup(() => {
  render(<App />, document.getElementById('react-render'));
});
