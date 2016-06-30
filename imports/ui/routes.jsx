import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import AdminTax from './AdminTax'
import Home from './Home'
import Product from './Product'

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/admintax/" component={AdminTax}/>
    <Route path="/products/:id" component={Product}/>
  </Route>
)
