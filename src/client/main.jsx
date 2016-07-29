import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import routes from '../shared/routes.jsx'

// $(".dropdown-button").dropdown()

render(
  <Router routes={routes} history={browserHistory} />,
  document.getElementById('react-render')
)
