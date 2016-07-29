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

	var _path = __webpack_require__(3);

	var _path2 = _interopRequireDefault(_path);

	var _server = __webpack_require__(4);

	var _reactRouter = __webpack_require__(5);

	var _routes = __webpack_require__(6);

	var _routes2 = _interopRequireDefault(_routes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var server = new _hapi2.default.Server({
	  connections: {
	    routes: {
	      files: {
	        relativeTo: _path2.default.join(__dirname, 'public')
	      }
	    }
	  }
	});

	server.connection({ port: 3000 });

	server.register(__webpack_require__(12), function (err) {
	  if (err) {
	    throw err;
	  }
	  // stylesheet route
	  server.route({
	    method: 'GET',
	    path: '/main.css',
	    handler: function handler(request, reply) {
	      reply.file('./stylesheet/main.css');
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
	  });
	  // images route
	  server.route({
	    method: 'GET',
	    path: '/images/{param*}',
	    handler: {
	      directory: {
	        path: './images'
	      }
	    }
	  });
	  // javascript route
	  server.route({
	    method: 'GET',
	    path: '/javascripts/{param*}',
	    handler: {
	      directory: {
	        path: './javascripts'
	      }
	    }
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
	          reply('Not Found').code(404);
	        }
	      });
	    }
	  });

	  var renderPage = function renderPage(appHtml) {
	    return '\n      <!doctype html public="storage">\n      <html>\n      <meta charset=utf-8/>\n      <title>Application - Home</title>\n      <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">\n      <link rel="stylesheet" href="/main.css" />\n      <div id=react-render>' + appHtml + '</div>\n      <script src="/javascripts/jquery-3.0.0.js"></script>\n      <script src="/javascripts/materialize.js"></script>\n      <script src="http://localhost:8080/js/app.js"></script>\n     ';
	  };

	  server.start(function (err) {
	    if (err) {
	      throw err;
	    }
	    console.log('Server is running at:', server.info.uri);
	  });
	});

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

	module.exports = require("path");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(5);

	var _App = __webpack_require__(7);

	var _App2 = _interopRequireDefault(_App);

	var _Home = __webpack_require__(9);

	var _Home2 = _interopRequireDefault(_Home);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: '/', component: _App2.default },
	  _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default })
	);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(5);

	var _NavLink = __webpack_require__(8);

	var _NavLink2 = _interopRequireDefault(_NavLink);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'App',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'h4',
	        { className: 'header-text' },
	        _react2.default.createElement(
	          _reactRouter.Link,
	          { to: '/' },
	          'Olive Riley'
	        )
	      ),
	      _react2.default.createElement(
	        'p',
	        { className: 'header-sub' },
	        'The world\'s premier destination'
	      ),
	      _react2.default.createElement(
	        'ul',
	        { id: 'dropdown1', className: 'dropdown-content' },
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            _NavLink2.default,
	            { to: '/accessories/one/' },
	            'one'
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            _NavLink2.default,
	            { to: '/accessories/two/' },
	            'two'
	          )
	        )
	      ),
	      _react2.default.createElement(
	        'nav',
	        null,
	        _react2.default.createElement(
	          'div',
	          { className: 'nav-wrapper' },
	          _react2.default.createElement(
	            'div',
	            { className: 'container' },
	            _react2.default.createElement(
	              'ul',
	              { className: 'hide-on-med-down' },
	              _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  _NavLink2.default,
	                  { to: '/category/clothing/' },
	                  'Clothing'
	                )
	              ),
	              _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  _NavLink2.default,
	                  { to: '/category/strollers/' },
	                  'Strollers'
	                )
	              ),
	              _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  _NavLink2.default,
	                  { className: 'dropdown-button', to: '/category/accessories/', 'data-activates': 'dropdown1' },
	                  'Accessories'
	                )
	              ),
	              _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  _NavLink2.default,
	                  { to: '/category/bottle/' },
	                  'Bottle'
	                )
	              ),
	              _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  _NavLink2.default,
	                  { to: '/category/other/' },
	                  'Other Things'
	                )
	              ),
	              _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  _NavLink2.default,
	                  { to: '/cart/' },
	                  'Shopping Cart'
	                )
	              )
	            )
	          )
	        )
	      ),
	      _react2.default.createElement('br', null),
	      _react2.default.createElement(
	        'div',
	        { className: 'container' },
	        this.props.children || _react2.default.createElement(Home, null)
	      )
	    );
	  }
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'NavLink',
	  render: function render() {
	    return _react2.default.createElement(_reactRouter.Link, _extends({}, this.props, { activeClassName: 'active' }));
	  }
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(10);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactMasonryComponent = __webpack_require__(11);

	var _reactMasonryComponent2 = _interopRequireDefault(_reactMasonryComponent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var IndividualProduct = _react2.default.createClass({
	  displayName: 'IndividualProduct',
	  render: function render() {
	    return _react2.default.createElement(
	      'ul',
	      { 'class': 'product-image-element' },
	      _react2.default.createElement(
	        'li',
	        null,
	        _react2.default.createElement(
	          'a',
	          { href: '/products/' + this.props.data.slug },
	          _react2.default.createElement('img', { width: '180', height: '270', src: this.props.data.images[0].url.http })
	        )
	      ),
	      _react2.default.createElement(
	        'li',
	        null,
	        _react2.default.createElement(
	          'strong',
	          null,
	          _react2.default.createElement(
	            'a',
	            { href: '/products/' + this.props.data.slug },
	            this.props.data.brand.value.toUpperCase()
	          )
	        )
	      ),
	      _react2.default.createElement(
	        'li',
	        null,
	        _react2.default.createElement(
	          'a',
	          { href: '/products/' + this.props.data.slug },
	          this.props.data.title
	        )
	      ),
	      _react2.default.createElement(
	        'li',
	        null,
	        this.props.data.price.data.formatted.without_tax
	      )
	    );
	  }
	});

	exports.default = _react2.default.createClass({
	  displayName: 'Home',
	  getInitialState: function getInitialState() {
	    return {
	      products: []
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    // Meteor.call('products.get', (err, data) => {
	    //   this.setState({ products: data })
	    // })
	  },
	  render: function render() {
	    var masonryOptions = {
	      columnWidth: 200,
	      isFitWidth: true,
	      gutter: 100
	    };
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        _reactMasonryComponent2.default,
	        {
	          className: 'product-grid',
	          elementType: 'div',
	          options: masonryOptions
	        },
	        this.state.products.map(function (prod, i) {
	          return _react2.default.createElement(IndividualProduct, { key: i, data: prod });
	        })
	      )
	    );
	  }
	});

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("react-masonry-component");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("inert");

/***/ }
/******/ ]);