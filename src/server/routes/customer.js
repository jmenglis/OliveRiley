const moltin = require('moltin')({
  publicId: process.env.MOLTIN_CLIENTID,
  secretKey: process.env.MOLTIN_CLIENTSECRET,
});

module.exports = [
  {
    method: 'GET',
    path: '/api/customers',
    handler: (request, reply) => {
      moltin.Authenticate(() => { // eslint-disable-line
        const p = new Promise((resolve) => {
          moltin.Customer.Find({ // eslint-disable-line
            email: request.query.email,
          }, (customer) => {
            resolve(customer);
          });
        });
        p.then((res) => {
          reply({ email: res[0].email });
        })
          .catch(() => {
            reply({ email: null });
          });
      });
    },
  },
  {
    method: 'POST',
    path: '/api/customers',
    handler: (request, reply) => {
      moltin.Authenticate(() => { // eslint-disable-line
        const p = new Promise((resolve) => {
          moltin.Customer.Create({ // eslint-disable-line
            first_name: request.payload.first_name,
            last_name: request.payload.last_name,
            email: request.payload.email,
            password: request.payload.password,
          }, (customer) => {
            resolve(customer);
          });
        });
        p.then(res => res);
        reply(p);
      });
    },
  },
  {
    method: 'POST',
    path: '/api/customers/{customerid}/address',
    handler: (request, reply) => {
      const userSession = request.yar.get('user');
      if (userSession.id === request.params.customerid) {
        moltin.Authenticate(() => { // eslint-disable-line
          const p = new Promise((resolve) => {
            moltin.Address.Create(request.params.customerid, { // eslint-disable-line
              first_name: request.payload.first_name,
              last_name: request.payload.last_name,
              address_1: request.payload.address1,
              city: request.payload.city,
              county: request.payload.state,
              postcode: request.payload.zipcode,
              country: 'US',
            }, (customer) => {
              resolve(customer);
            });
          });
          p.then(res => res);
          reply(p);
        });
      } else {
        reply({ msg: 'You are not authorized to do this' });
      }
    },
  },
];
