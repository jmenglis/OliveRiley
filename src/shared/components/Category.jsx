import React, { Component, PropTypes } from 'react'
import request from 'superagent'
import Masonry from 'react-masonry-component'

class IndividualProduct extends Component {
  render() {
    return (
      <ul className="product-image-element">
        <li><a href={`/products/${this.props.data.slug}`}><img width="180" height="270" src={this.props.data.images[0].url.http}/></a></li>
        <li><strong><a href={`/products/${this.props.data.slug}`}>{this.props.data.brand.value.toUpperCase()}</a></strong></li>
        <li><a href={`/products/${this.props.data.slug}`}>{this.props.data.title}</a></li>
        <li>{this.props.data.price.data.formatted.without_tax}</li>
      </ul>
    )
  }
}

export default class Category extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: []
    }
  }
  componentWillReceiveProps(nextProps) {
    let categorySlug = nextProps.params.id
    request
      .post('/api/category')
      .send({category: categorySlug})
      .end((err, res) => {
        this.setState({ products: res.body })
      })
  }
  componentDidMount() {
    let categorySlug = this.props.params.id
    request
      .post('/api/category')
      .send({category: categorySlug})
      .end((err, res) => {
        this.setState({ products: res.body })
      })
  }
  render() {
    var masonryOptions = {
      columnWidth: 200,
      isFitWidth: true,
      gutter: 100
    }
    return (
      <div>
        <Masonry
          className={'product-grid'}
          elementType={'div'}
          options={masonryOptions}
        >
          {this.state.products.map((prod, i) => {
            return (
              <IndividualProduct key={i} data={prod} />
            )
          })}
        </Masonry>
      </div>
    )
  }
}
