const moltin = require('moltin')({
  publicId: process.env.MOLTIN_CLIENTID,
  secretKey: process.env.MOLTIN_CLIENTSECRET
});

module.exports = [
  {
    method: 'GET',
    path: '/api/products',
    handler: (request, reply) => {
      moltin.Authenticate(() => {
        let p = new Promise((resolve, reject) => {
          moltin.Product.Search({}, (products) => {
            resolve(products)
          })
        });
        p.then((res) => {
          return res
        });
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
        });
        p.then((res) => {
          return res
        });
        reply(p)
      })
    }
  }
];
