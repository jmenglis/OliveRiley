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
      arrows: true,
      draggable: false,
      infinite: true,
      fade: true,
      cssEase: "linear",
    }
    return (
      <div>
        {this.state.product.map((prod, i) => {
          console.log(prod)
          return (
              <div className="row">
                <div className="col s4">
                  <h3>{prod.brand.value}</h3>
                  <h5>{prod.title}</h5>
                  <p>{prod.description}</p>
                </div>
                <div className="col s2" style={{height: ' 2px'}}>
                </div>
                <div className="col s4">
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
})
