import React, { Component, PropTypes } from 'react'
import Slider from 'react-slick'
import request from 'superagent'


export default class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: [],
      message: ''
    }
  }
  componentDidMount() {
    let productSlug = this.props.params.id
    console.log(productSlug)
    request
      .post('/api/product')
      .send({product: productSlug})
      .end((err, res) => {
        this.setState({ product: res.body })
      })
  }
  addCart(e) {
    e.preventDefault()
    let productId = this.state.product[0].id
    console.log('Product added to the cart')
  }
  render() {
    var settings = {
      slidesToShow: 1,
      arrows: true,
      draggable: false,
      infinite: true,
      fade: true,
      cssEase: "linear",
    }
    return (
      <div>
        {this.state.product.map((prod, i) => {
          var self = this
          return (
            <div key={i} className="row">
              <div className="col s6">
                <h3>{prod.brand.value}</h3>
                <p>
                  {prod.title}<br />
                  <strong>{prod.price.data.formatted.without_tax}</strong>
                </p>
                <p>{prod.description}</p>
                <form onSubmit={this.addCart}>
                  <input type="submit" value="Add to Cart" />
                </form>
              </div>
              <div className="col s1" style={{height: ' 2px'}}>
              </div>
              <div className="col s5">
                <Slider {...settings}>
                  {prod.images.map((image, i) => {
                    return (
                      <div key={i} className="centerize">
                        <img src={image.url.http} />
                      </div>
                    )
                  })}
                </Slider>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
