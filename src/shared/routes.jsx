import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App.jsx'
import Home from './components/Home.jsx'
import Product from './components/Product.jsx'

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/products/:id" component={Product}/>
  </Route>
)
