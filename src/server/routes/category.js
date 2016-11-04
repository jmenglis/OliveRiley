const moltin = require('moltin')({
  publicId: process.env.MOLTIN_CLIENTID,
  secretKey: process.env.MOLTIN_CLIENTSECRET,
});

module.exports = [
  {
    method: 'POST',
    path: '/api/category',
    handler: (request, reply) => {
      moltin.Authenticate(() => { // eslint-disable-line
        const p = new Promise((resolve) => {
          moltin.Category.List({slug: request.payload.category}, (category) => { // eslint-disable-line
            moltin.Product.Search({category: category[0].id}, (product) => { // eslint-disable-line
              resolve(product);
            });
          });
        });
        p.then(res => res);
        reply(p);
      });
    },
  },
];
