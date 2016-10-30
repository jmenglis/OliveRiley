require('dotenv').config();
import Hapi from 'hapi'
import React from 'react'
import Path from 'path'
import Inert from 'inert'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from '../shared/routes.jsx'
import appRoutes from './routes/main.js'
import HapiSass from 'hapi-sass'
import Yar from 'yar'


const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }
  }
})

server.connection({ port:3000 })

const options = {
  src: './src/stylesheet',
  dest: './public/stylesheet',
  force: true,
  debug: true,
  routePath: '/{file}.css',
  includePaths: ['./vendor'],
  outputStyle: 'nested',
  sourceComments: true,
  srcExtension: 'scss',
}
const options2 = {
  storeBlank: false,
  cookieOptions: {
    password: process.env.COOKIE_PASSWORD,
    isSecure: process.env.NODE_ENV !== 'development'
  },
}

server.register([Inert, {
  register: HapiSass,
  options: options,
}, {
  register: Yar,
  options: options2,
} ], () => {});

// stylesheet route
// server.route({
//   method: 'GET',
//   path: '/main.css',
//   handler: (request, reply) => {
//     reply.file('./stylesheet/main.css')
//   }
// })

server.route({
  method: 'GET',
  path: '/yar/get/',
  config: {
    handler: (request, reply) => reply(request.yar._store)
  }
});

server.route({
  method: 'GET',
  path: '/yar/logout/',
  config: {
    handler: (request, reply) => {
      request.yar.reset();
      reply('Done');
    }
  }
});

// fonts route
server.route({
  method: 'GET',
  path: '/fonts/{param*}',
  handler: {
    directory: {
      path: './fonts'
    }
  }
})
// images route
server.route({
  method: 'GET',
  path: '/images/{param*}',
  handler: {
    directory: {
      path: './images'
    }
  }
})
// javascript route
server.route({
  method: 'GET',
  path: '/javascripts/{param*}',
  handler: {
    directory: {
      path: './javascripts'
    }
  }
})

server.route(appRoutes)

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: (request, reply) => {
    match({ routes, location: request.url.path }, (err, redirect, props) => {
      if (err) {
        reply(err.message).code(500)
      } else if (redirect) {
        reply('redirect').redirect(redirect.pathname + redirect.search)
      } else if (props) {
        const appHtml = renderToString(<RouterContext {...props}/>)
        reply(renderPage(appHtml))
      } else {
        reply('Not Found').code(404)
      }
    })
  }
})

const renderPage = (appHtml) => {
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>Application - Home</title>
    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="/main.css" />
    <div id=react-render><div>${appHtml}</div></div>
    <script src="/javascripts/jquery-3.0.0.js"></script>
    <script src="/javascripts/materialize.js"></script>
    <script src="http://localhost:8080/js/application.js"></script>
   `
}

// starting server on port 3000
server.start((err) => {
  if (err) {
    throw err
  }
  console.log('Server is running at:', server.info.uri)
})
