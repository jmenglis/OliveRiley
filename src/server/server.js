require('dotenv').config();
import Hapi from 'hapi'
import React from 'react'
import Path from 'path'
import Inert from 'inert'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from '../shared/routes.jsx'

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }
  }
})

const moltin = require('moltin')({
  publicId: process.env.MOLTIN_CLIENTID,
  secretKey: process.env.MOLTIN_CLIENTSECRET
})

server.connection({ port:3000 })

server.register(Inert, () => {})

// stylesheet route
server.route({
  method: 'GET',
  path: '/main.css',
  handler: (request, reply) => {
    reply.file('./stylesheet/main.css')
  }
})

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

moltin.Authenticate(() => {
  server.route({
    method: 'GET',
    path: '/api/products',
    handler: (request, reply) => {
      var p = new Promise((resolve, reject) => {
        moltin.Product.Search({}, (products) => {
          resolve(products)
        })
      })
      p.then((res) => {
        return res
      })
      reply(p)
    }
  })
})

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
    <div id=react-render>${appHtml}</div>
    <script src="/javascripts/jquery-3.0.0.js"></script>
    <script src="/javascripts/materialize.js"></script>
    <script src="http://localhost:8080/js/app.js"></script>
   `
}

// starting server on port 3000
server.start((err) => {
  if (err) {
    throw err
  }
  console.log('Server is running at:', server.info.uri)
})
