import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App.jsx'
import Home from './components/Home.jsx'
import Product from './components/Product.jsx'
import Category from './components/Category.jsx'
import Cart from './components/Cart.jsx'
import Checkout from './components/Checkout.jsx'

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/category/:id" component={Category}/>
    <Route path="/products/:id" component={Product}/>
    <Route path="/cart/" component={Cart}/>
    <Route path="/checkout/" component={Checkout}/>
  </Route>
)
