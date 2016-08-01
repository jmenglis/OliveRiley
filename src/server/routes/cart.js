require('dotenv').config();

const moltin = require('moltin')({
  publicId: process.env.MOLTIN_CLIENTID,
  secretKey: process.env.MOLTIN_CLIENTSECRET
})

module.exports = [
  {
    method: 'POST',
    path: '/api/cart/add',
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