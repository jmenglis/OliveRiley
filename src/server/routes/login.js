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
        agent
          .post('https://api.molt.in/v1/customers/token?email=' + request.payload.email + '&password=' + request.payload.password)
          .set('Authorization','Bearer ' + moltin.options.auth.token)
          .end((err, res) => {
            request.yar.set('user',{
              id: res.body.result.id,
              email: res.body.result.email,
              token: res.body.result.token,
            });
            reply({loggedIn: true});
          })
      });
    }
  },
];