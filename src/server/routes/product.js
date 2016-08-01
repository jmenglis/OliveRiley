require('dotenv').config();

const moltin = require('moltin')({
  publicId: process.env.MOLTIN_CLIENTID,
  secretKey: process.env.MOLTIN_CLIENTSECRET
})

module.exports = [
  {
    method: 'GET',
    path: '/api/products',
    handler: (request, reply) => {
      moltin.Authenticate(() => {
        var p = new Promise((resolve, reject) => {
          moltin.Product.Search({}, (products) => {
            resolve(products)
          }, (error) => {
            console.log(error)
          })
        })
        p.then((res) => {
          return res
        })
        reply(p)
      })
    }
  },
  {
    method: 'POST',
    path: '/api/product',
    handler: (request, reply) => {
      moltin.Authenticate(() => {
        let p = new Promise((resolve, reject) => {
          moltin.Product.Search({slug: request.payload.product}, (product) => {
            resolve(product)
          })
        })
        p.then((res) => {
          return res
        })
        reply(p)
      })
    }
  },
  {
    method: 'POST',
    path: '/api/product/add',
    handler: (request, reply) => {
      moltin.Authenticate(() => {
        let p = new Promise((resolve, reject) => {
          moltin.Cart.Insert(request.payload.productId, '1', null, (cart) => {
            console.log(cart);
          })
        })
      })
    }
  }
]
