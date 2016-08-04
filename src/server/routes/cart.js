require('dotenv').config();

var moltin = require('moltin')({
  publicId: process.env.MOLTIN_CLIENTID,
  secretKey: process.env.MOLTIN_CLIENTSECRET
});

module.exports = [
  {
    method: 'POST',
    path: '/api/cart/add',
    handler: (request, reply) => {
      moltin.Authenticate(() => {
        let p = new Promise((resolve, reject) => {
          let options = null;
          if (request.payload.modifierId && request.payload.variationId) {
            let modifierId = request.payload.modifierId
            let variationId = request.payload.variationId
            options = {}
            options[modifierId] = variationId
          }
          moltin.Cart.Insert(request.payload.productId, '1', options, (cart) => {
          })
        })
      })
    }
  },
  {
    method: 'GET',
    path: '/api/cart',
    handler: (request, reply) => {
      moltin.Authenticate(() => {
        let p = new Promise((resolve,reject) => {
          moltin.Cart.Contents((items) => {
            resolve(items)
          })
        })
        p.then((items) => {
          return items
        })
        reply(p)
      })
    }
  },
  {
    method: 'POST',
    path: '/api/cart/quantity',
    handler: (request, reply) => {
      moltin.Authenticate(() => {
        let p = new Promise((resolve, reject) => {
          moltin.Cart.Update(request.payload.id, { quantity: request.payload.quantity }, (item) => {
            resolve(item)
          })
        })
        p.then((item) => {
          return item
        })
        reply(p)
      })
    }
  }
]