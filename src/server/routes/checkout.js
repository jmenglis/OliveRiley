require('dotenv').config();

const moltin = require('moltin')({
  publicId: process.env.MOLTIN_CLIENTID,
  secretKey: process.env.MOLTIN_CLIENTSECRET
});

module.exports = [
  {
    method: 'GET',
    path: '/api/checkout',
    handler: (request, reply) => {
      moltin.Authenticate(() => {
        const p = new Promise((resolve) => {
          moltin.Cart.Contents((items) => {
            resolve(items);
          });
        });
        p.then(items => items);
        reply(p);
      });
    },
  },
]