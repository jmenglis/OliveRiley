const moltin = require('moltin')({
  publicId: process.env.MOLTIN_CLIENTID,
  secretKey: process.env.MOLTIN_CLIENTSECRET,
});

module.exports = [
  {
    method: 'POST',
    path: '/api/cart/add',
    handler: (request) => {
      moltin.Authenticate(() => { // eslint-disable-line
        let options = null;
        if (request.payload.modifierId && request.payload.variationId) {
          const modifierId = request.payload.modifierId;
          const variationId = request.payload.variationId;
          options = {};
          options[modifierId] = variationId;
        }
        moltin.Cart.Insert(request.payload.productId, '1', options, () => {}); // eslint-disable-line
      });
    },
  },
  {
    method: 'GET',
    path: '/api/cart',
    handler: (request, reply) => {
      moltin.Authenticate(() => { // eslint-disable-line
        const p = new Promise((resolve) => {
          moltin.Cart.Contents((items) => { // eslint-disable-line
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
      moltin.Authenticate(() => { // eslint-disable-line
        const p = new Promise((resolve) => {
          moltin.Cart.Update(request.payload.id, { quantity: request.payload.quantity }, (item) => { // eslint-disable-line
            resolve(item);
          });
        });
        p.then(item => item);
        reply(p);
      });
    },
  },
];
