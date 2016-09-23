require('dotenv').config();

const moltin = require('moltin')({
  publicId: process.env.MOLTIN_CLIENTID,
  secretKey: process.env.MOLTIN_CLIENTSECRET,
});

module.exports = [
  {
    method: 'POST',
    path: '/api/cart/add',
    handler: (request) => {
      moltin.Authenticate(() => {
        let options = null;
        if (request.payload.modifierId && request.payload.variationId) {
          const modifierId = request.payload.modifierId;
          const variationId = request.payload.variationId;
          options = {};
          options[modifierId] = variationId;
        }
        moltin.Cart.Insert(request.payload.productId, '1', options, () => {});
      });
    },
  },
  {
    method: 'GET',
    path: '/api/cart',
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
  {
    method: 'POST',
    path: '/api/cart/quantity',
    handler: (request, reply) => {
      moltin.Authenticate(() => {
        const p = new Promise((resolve) => {
          moltin.Cart.Update(request.payload.id, { quantity: request.payload.quantity }, (item) => {
            resolve(item);
          });
        });
        p.then(item => item);
        reply(p);
      });
    },
  },
];
