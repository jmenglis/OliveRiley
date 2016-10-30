require('dotenv').config();
import agent from 'superagent'

const moltin = require('moltin')({
  publicId: process.env.MOLTIN_CLIENTID,
  secretKey: process.env.MOLTIN_CLIENTSECRET
});

module.exports = [
  {
    method: 'POST',
    path: '/api/login',
    handler: (request, reply) => {
      moltin.Authenticate(() => {
        let p = new Promise((resolve, reject) => {
         agent
           .post('https://api.molt.in/v1/customers/token?email=' + request.payload.email + '&password=' + request.payload.password)
           .set('Authorization','Bearer ' + moltin.options.auth.token)
           .end((err, res) => {
             resolve(res);
          })
        });
        p.then((res) => {
          request.yar.set('user',{
            email: res.body.result.email,
            token: res.body.result.token,
          });
        });
        reply({loggedIn: true});
      })
    }
  },
]