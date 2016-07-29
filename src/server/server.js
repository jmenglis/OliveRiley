import Hapi from 'hapi'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'

import routes from '../shared/routes.jsx'

const server = new Hapi.Server()

server.connection({ port:3000 })

server.start((err) => {
  if (err) {
    throw err
  }
  console.log('Server is running at:', server.info.uri)
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
        console.log('blah')
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
    <link rel="stylesheet" href="/stylesheets/style.css" />
    <div id=react-render>${appHtml}</div>
    <script src="/javascripts/jquery-3.0.0.js"></script>
    <script src="/javascripts/materialize.js"></script>
    <script src="http://localhost:8080/js/app.js"></script>
   `
}
