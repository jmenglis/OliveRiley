require('dotenv').config();

const moltin = require('moltin')({
  publicId: process.env.MOLTIN_CLIENTID,
  secretKey: process.env.MOLTIN_CLIENTSECRET
});

module.exports = [
  {
    method: 'GET',
    path: '/api/customers',
    handler: (request, reply) => {
      moltin.Authenticate(() => {
        let p = new Promise((resolve, reject) => {
          moltin.Customer.Find({
            email: request.query.email,
          }, (customer) => {
            resolve(customer);
          })
        });
        p.then((res) => {
          reply({email: res[0].email});
        })
          .catch((res) => {
            reply({email: null});
        });
      })
    }
  },
  {
    method: 'POST',
    path: '/api/customers',
    handler: (request, reply) => {
      moltin.Authenticate(() => {
        let p = new Promise((resolve, reject) => {
          moltin.Customer.Create({
            first_name: request.payload.first_name,
            last_name: request.payload.last_name,
            email: request.payload.email,
            password: request.payload.password,
          }, (customer) => {
            resolve(customer);
          })
        });
        p.then((res) => {
          return res;
        });
        reply(p);
      })
    }
  },
  {
    method: 'POST',
    path: '/api/customers/{customerid}/address',
    handler: (request, reply) => {
      let userSession = request.yar.get('user');
      if (userSession.id === request.params.customerid) {
        moltin.Authenticate(() => {
          let p = new Promise((resolve, reject) => {
            moltin.Address.Create(request.params.customerid, {
              first_name: request.payload.first_name,
              last_name: request.payload.last_name,
              address_1: request.payload.address1,
              city: request.payload.city,
              county: request.payload.state,
              postcode: request.payload.zipcode,
              country: 'US',
            }, (customer) => {
              resolve(customer);
            })
          });
          p.then((res) => {
            return res;
          });
          reply(p);
        })
      } else {
        reply({ msg: 'You are not authorized to do this' });
      }
    }
  },
]