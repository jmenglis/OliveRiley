require('dotenv').config();

const moltin = require('moltin')({
  publicId: process.env.MOLTIN_CLIENTID,
  secretKey: process.env.MOLTIN_CLIENTSECRET
})

module.exports = [
  {
    method: 'POST',
    path: '/api/category',
    handler: (request, reply) => {
      moltin.Authenticate(() => {
        let p = new Promise((resolve, reject) => {
          moltin.Category.List({slug: request.payload.category}, (category) => {
            moltin.Product.Search({category: category[0].id}, (product) => {
              resolve(product)
            })
          })
        })
        p.then((res) => {
          return res;
        })
        reply(p)
      })
    }
  }
]
