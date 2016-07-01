import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Slider from 'react-slick'

export default React.createClass({
  getInitialState() {
    return {
      product: []
    }
  },
  componentDidMount() {
    let productSlug = this.props.params.id
    Meteor.call('product.get', productSlug, (err, data) => {
      this.setState({ product: data })
    })
  },
  render() {
    var settings = {
      slidesToShow: 1,
      dots: true,
      autoplay: true,
      dots: true,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: "linear",
    }
    return (
      <div>
        {this.state.product.map((prod, i) => {
          console.log(prod)
          return (
            <div>
              <ul>
                <li>{prod.title}</li>
                <Slider {...settings}>
                  {prod.images.map((image, i) => {
                    return (
                        <div key={i}>
                            <li><img src={image.url.http} /></li>
                        </div>
                    )
                  })}
                </Slider>
                <li>{prod.description}</li>
              </ul>
            </div>
          )
        })}
      </div>
    )
  }
})
