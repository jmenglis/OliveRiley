/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _hapi = __webpack_require__(1);

	var _hapi2 = _interopRequireDefault(_hapi);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(3);

	var _reactRouter = __webpack_require__(4);

	var _routes = __webpack_require__(5);

	var _routes2 = _interopRequireDefault(_routes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var server = new _hapi2.default.Server();

	server.connection({ port: 3000 });

	server.start(function (err) {
	  if (err) {
	    throw err;
	  }
	  console.log('Server is running at:', server.info.uri);
	});

	server.route({
	  method: 'GET',
	  path: '/{param*}',
	  handler: function handler(request, reply) {
	    (0, _reactRouter.match)({ routes: _routes2.default, location: request.url.path }, function (err, redirect, props) {
	      if (err) {
	        reply(err.message).code(500);
	      } else if (redirect) {
	        reply('redirect').redirect(redirect.pathname + redirect.search);
	      } else if (props) {
	        var appHtml = (0, _server.renderToString)(_react2.default.createElement(_reactRouter.RouterContext, props));
	        reply(renderPage(appHtml));
	      } else {
	        console.log('blah');
	        reply('Not Found').code(404);
	      }
	    });
	  }
	});

	var renderPage = function renderPage(appHtml) {
	  return '\n    <!doctype html public="storage">\n    <html>\n    <meta charset=utf-8/>\n    <title>Application - Home</title>\n    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">\n    <link rel="stylesheet" href="/stylesheets/style.css" />\n    <div id=react-render>' + appHtml + '</div>\n    <script src="/javascripts/jquery-3.0.0.js"></script>\n    <script src="/javascripts/materialize.js"></script>\n    <script src="http://localhost:8080/js/app.js"></script>\n   ';
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("hapi");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(4);

	var _App = __webpack_require__(6);

	var _App2 = _interopRequireDefault(_App);

	var _Home = __webpack_require__(8);

	var _Home2 = _interopRequireDefault(_Home);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: '/', component: _App2.default },
	  _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default })
	);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(7);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'App',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'container' },
	      this.props.children || _react2.default.createElement(Home, null)
	    );
	  }
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(7);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'Home',
	  getInitialState: function getInitialState() {
	    return {
	      products: []
	    };
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      'Hello Working on this to see if it will work'
	    );
	  }
	});

/***/ }
/******/ ]);