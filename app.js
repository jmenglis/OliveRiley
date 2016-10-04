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

	var _inert = __webpack_require__(4);

	var _inert2 = _interopRequireDefault(_inert);

	var _server = __webpack_require__(5);

	var _reactRouter = __webpack_require__(6);

	var _routes = __webpack_require__(7);

	var _routes2 = _interopRequireDefault(_routes);

	var _main = __webpack_require__(19);

	var _main2 = _interopRequireDefault(_main);

	var _hapiSass = __webpack_require__(26);

	var _hapiSass2 = _interopRequireDefault(_hapiSass);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(21).config();


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

	var options = {
	  src: './src/stylesheet',
	  dest: './public/stylesheet',
	  force: true,
	  debug: true,
	  routePath: '/{file}.css',
	  includePaths: ['./vendor'],
	  outputStyle: 'nested',
	  sourceComments: true,
	  srcExtension: 'scss'
	};

	server.register([_inert2.default, {
	  register: _hapiSass2.default,
	  options: options
	}], function () {});

	// stylesheet route
	// server.route({
	//   method: 'GET',
	//   path: '/main.css',
	//   handler: (request, reply) => {
	//     reply.file('./stylesheet/main.css')
	//   }
	// })

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

	server.route(_main2.default);

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
	  return '\n    <!doctype html public="storage">\n    <html>\n    <meta charset=utf-8/>\n    <title>Application - Home</title>\n    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">\n    <link rel="stylesheet" href="/main.css" />\n    <div id=react-render><div>' + appHtml + '</div></div>\n    <script src="/javascripts/jquery-3.0.0.js"></script>\n    <script src="/javascripts/materialize.js"></script>\n    <script src="http://localhost:8080/js/application.js"></script>\n   ';
	};

	// starting server on port 3000
	server.start(function (err) {
	  if (err) {
	    throw err;
	  }
	  console.log('Server is running at:', server.info.uri);
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

	module.exports = require("inert");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(6);

	var _App = __webpack_require__(8);

	var _App2 = _interopRequireDefault(_App);

	var _Home = __webpack_require__(10);

	var _Home2 = _interopRequireDefault(_Home);

	var _Product = __webpack_require__(13);

	var _Product2 = _interopRequireDefault(_Product);

	var _Category = __webpack_require__(16);

	var _Category2 = _interopRequireDefault(_Category);

	var _Cart = __webpack_require__(17);

	var _Cart2 = _interopRequireDefault(_Cart);

	var _Checkout = __webpack_require__(18);

	var _Checkout2 = _interopRequireDefault(_Checkout);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: '/', component: _App2.default },
	  _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/category/:id', component: _Category2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/products/:id', component: _Product2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/cart/', component: _Cart2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/checkout/', component: _Checkout2.default })
	);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(6);

	var _NavLink = __webpack_require__(9);

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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'NavLink',
	  render: function render() {
	    return _react2.default.createElement(_reactRouter.Link, _extends({}, this.props, { activeClassName: 'active' }));
	  }
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(6);

	var _reactMasonryComponent = __webpack_require__(11);

	var _reactMasonryComponent2 = _interopRequireDefault(_reactMasonryComponent);

	var _superagent = __webpack_require__(12);

	var _superagent2 = _interopRequireDefault(_superagent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var IndividualProduct = function (_Component) {
	  _inherits(IndividualProduct, _Component);

	  function IndividualProduct() {
	    _classCallCheck(this, IndividualProduct);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(IndividualProduct).apply(this, arguments));
	  }

	  _createClass(IndividualProduct, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'ul',
	        { className: 'product-image-element' },
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { to: '/products/' + this.props.data.slug },
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
	              _reactRouter.Link,
	              { to: '/products/' + this.props.data.slug },
	              this.props.data.brand.value.toUpperCase()
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { to: '/products/' + this.props.data.slug },
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
	  }]);

	  return IndividualProduct;
	}(_react.Component);

	var Home = function (_Component2) {
	  _inherits(Home, _Component2);

	  function Home(props) {
	    _classCallCheck(this, Home);

	    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Home).call(this, props));

	    _this2.state = {
	      products: []
	    };
	    return _this2;
	  }

	  _createClass(Home, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this3 = this;

	      _superagent2.default.get('/api/products').end(function (err, res) {
	        _this3.setState({ products: res.body });
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
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
	  }]);

	  return Home;
	}(_react.Component);

	exports.default = Home;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("react-masonry-component");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("superagent");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(14);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactSlick = __webpack_require__(15);

	var _reactSlick2 = _interopRequireDefault(_reactSlick);

	var _superagent = __webpack_require__(12);

	var _superagent2 = _interopRequireDefault(_superagent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Product = function (_Component) {
	  _inherits(Product, _Component);

	  function Product(props) {
	    _classCallCheck(this, Product);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Product).call(this, props));

	    _this.state = {
	      product: [],
	      sizes: [],
	      message: '',
	      selectedSize: ''
	    };
	    return _this;
	  }

	  _createClass(Product, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      var element = _reactDom2.default.findDOMNode(this.refs.dropdown);
	      var productSlug = this.props.params.id;
	      _superagent2.default.post('/api/product').send({ product: productSlug }).end(function (err, res) {
	        var sizeArray = [];
	        for (var key in res.body[0].modifiers) {
	          for (var prop in res.body[0].modifiers[key].variations) {
	            sizeArray.push({
	              modifier: res.body[0].modifiers[key].variations[prop].modifier,
	              id: res.body[0].modifiers[key].variations[prop].id,
	              size: res.body[0].modifiers[key].variations[prop].title
	            });
	          }
	        }
	        _this2.setState({
	          product: res.body,
	          sizes: sizeArray
	        });
	        $(element).ready(function () {
	          $('select').material_select();
	        });
	      });
	    }
	  }, {
	    key: 'handleSelect',
	    value: function handleSelect(e) {
	      var modifierId = this.state.sizes.find(function (d) {
	        return d.id === e.target.value;
	      }).modifier;
	      var variationId = e.target.value;

	      this.setState({ selectedSize: {
	          modifierId: modifierId,
	          variationId: variationId
	        } });
	    }
	  }, {
	    key: 'addCart',
	    value: function addCart(e) {
	      var _this3 = this;

	      e.preventDefault();
	      console.log(this.state.product[0].id);
	      var productId = this.state.product[0].id;
	      _superagent2.default.post('/api/cart/add').send({
	        productId: productId,
	        modifierId: this.state.selectedSize.modifierId,
	        variationId: this.state.selectedSize.variationId
	      }).end(function (err, res) {
	        _this3.setState({ message: "The product has been added to the cart." });
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this4 = this;

	      var settings = {
	        slidesToShow: 1,
	        arrows: true,
	        draggable: false,
	        infinite: true,
	        fade: true,
	        cssEase: "linear"
	      };
	      console.log(this.state);
	      return _react2.default.createElement(
	        'div',
	        null,
	        this.state.product.map(function (prod, i) {
	          return _react2.default.createElement(
	            'div',
	            { key: i, className: 'row' },
	            _react2.default.createElement(
	              'div',
	              { className: 'col s6' },
	              _react2.default.createElement(
	                'h3',
	                null,
	                prod.brand.value
	              ),
	              _react2.default.createElement(
	                'p',
	                null,
	                prod.title,
	                _react2.default.createElement('br', null),
	                _react2.default.createElement(
	                  'strong',
	                  null,
	                  prod.price.data.formatted.without_tax
	                )
	              ),
	              _react2.default.createElement(
	                'p',
	                null,
	                prod.description
	              ),
	              _react2.default.createElement(
	                'select',
	                { className: 'browser-default', ref: 'dropdown', onChange: _this4.handleSelect.bind(_this4), defaultValue: '' },
	                _react2.default.createElement(
	                  'option',
	                  { value: '', disabled: true },
	                  'Choose your option'
	                ),
	                _this4.state.sizes.map(function (size, i) {
	                  return _react2.default.createElement(
	                    'option',
	                    { key: size.id, value: size.id },
	                    size.size
	                  );
	                })
	              ),
	              _react2.default.createElement(
	                'form',
	                { onSubmit: _this4.addCart.bind(_this4) },
	                _react2.default.createElement('input', { type: 'submit', value: 'Add to Cart' })
	              )
	            ),
	            _react2.default.createElement('div', { className: 'col s1', style: { height: ' 2px' } }),
	            _react2.default.createElement(
	              'div',
	              { className: 'col s5' },
	              _react2.default.createElement(
	                _reactSlick2.default,
	                settings,
	                prod.images.map(function (image, i) {
	                  return _react2.default.createElement(
	                    'div',
	                    { key: i, className: 'centerize' },
	                    _react2.default.createElement('img', { src: image.url.http })
	                  );
	                })
	              )
	            )
	          );
	        })
	      );
	    }
	  }]);

	  return Product;
	}(_react.Component);

	exports.default = Product;

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("react-slick");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _superagent = __webpack_require__(12);

	var _superagent2 = _interopRequireDefault(_superagent);

	var _reactRouter = __webpack_require__(6);

	var _reactMasonryComponent = __webpack_require__(11);

	var _reactMasonryComponent2 = _interopRequireDefault(_reactMasonryComponent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var IndividualProduct = function (_Component) {
	  _inherits(IndividualProduct, _Component);

	  function IndividualProduct() {
	    _classCallCheck(this, IndividualProduct);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(IndividualProduct).apply(this, arguments));
	  }

	  _createClass(IndividualProduct, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'ul',
	        { className: 'product-image-element' },
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { to: '/products/' + this.props.data.slug },
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
	              _reactRouter.Link,
	              { to: '/products/' + this.props.data.slug },
	              this.props.data.brand.value.toUpperCase()
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { to: '/products/' + this.props.data.slug },
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
	  }]);

	  return IndividualProduct;
	}(_react.Component);

	var Category = function (_Component2) {
	  _inherits(Category, _Component2);

	  function Category(props) {
	    _classCallCheck(this, Category);

	    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Category).call(this, props));

	    _this2.state = {
	      products: []
	    };
	    return _this2;
	  }

	  _createClass(Category, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var _this3 = this;

	      var categorySlug = nextProps.params.id;
	      _superagent2.default.post('/api/category').send({ category: categorySlug }).end(function (err, res) {
	        _this3.setState({ products: res.body });
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this4 = this;

	      var categorySlug = this.props.params.id;
	      _superagent2.default.post('/api/category').send({ category: categorySlug }).end(function (err, res) {
	        _this4.setState({ products: res.body });
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
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
	  }]);

	  return Category;
	}(_react.Component);

	exports.default = Category;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Buttons = exports.Total = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _superagent = __webpack_require__(12);

	var _superagent2 = _interopRequireDefault(_superagent);

	var _reactRouter = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Cart = function (_Component) {
	  _inherits(Cart, _Component);

	  function Cart(props) {
	    _classCallCheck(this, Cart);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Cart).call(this, props));

	    _this.state = {
	      products: []
	    };
	    return _this;
	  }

	  _createClass(Cart, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      _superagent2.default.get('/api/cart').end(function (err, res) {
	        for (var key in res.body.contents) {
	          var itemObject = {
	            id: res.body.contents[key].id,
	            brand: res.body.contents[key].brand.value,
	            name: res.body.contents[key].name,
	            price: res.body.contents[key].price.toFixed(2),
	            image: res.body.contents[key].images[0].url.http,
	            slug: res.body.contents[key].slug,
	            quantity: res.body.contents[key].quantity,
	            total: res.body.contents[key].totals.pre_discount.raw.without_tax.toFixed(2)
	          };
	          _this2.setState({ products: _this2.state.products.concat(itemObject) });
	        }
	      });
	    }
	  }, {
	    key: 'changeQuantity',
	    value: function changeQuantity(id, i, e) {
	      var _this3 = this;

	      var updateItem = this.state.products;
	      if (!e.target.value) {
	        updateItem[i].quantity = '';
	        updateItem[i].total = 0;
	        this.setState({ products: updateItem });
	      } else if (e.target.value === '0') {
	        updateItem[i].quantity = 0;
	        updateItem[i].total = 0;
	        this.setState({ products: updateItem });
	      } else {
	        _superagent2.default.post('/api/cart/quantity').send({
	          id: id,
	          quantity: e.target.value
	        }).end(function (err, res) {
	          updateItem[i].quantity = res.body.quantity;
	          updateItem[i].total = res.body.totals.pre_discount.raw.without_tax.toFixed(2);
	          _this3.setState({ products: updateItem });
	        });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this4 = this;

	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'div',
	          { className: 'row' },
	          _react2.default.createElement(
	            'div',
	            { className: 'centerize' },
	            _react2.default.createElement(
	              'h4',
	              null,
	              'Your Shopping Cart'
	            )
	          )
	        ),
	        function () {
	          if (_this4.state.products.length > 0) {
	            return _react2.default.createElement(
	              'div',
	              { className: 'row' },
	              _this4.state.products.map(function (prod, i) {
	                return _react2.default.createElement(
	                  'ul',
	                  { id: 'cart-list', key: prod.id },
	                  _react2.default.createElement(
	                    'li',
	                    { style: { width: "200px" } },
	                    _react2.default.createElement('img', { src: prod.image, style: { width: "100%" } })
	                  ),
	                  _react2.default.createElement(
	                    'li',
	                    { style: { width: "200px" } },
	                    _react2.default.createElement(
	                      'strong',
	                      null,
	                      prod.brand
	                    ),
	                    ' - ',
	                    prod.name
	                  ),
	                  _react2.default.createElement(
	                    'li',
	                    { style: { width: "200px" } },
	                    'Price (Unit): $',
	                    prod.price
	                  ),
	                  _react2.default.createElement(
	                    'li',
	                    null,
	                    _react2.default.createElement('input', { type: 'number', min: '0', max: '100', value: prod.quantity, onChange: _this4.changeQuantity.bind(_this4, prod.id, i) })
	                  )
	                );
	              })
	            );
	          } else {
	            return _react2.default.createElement(
	              'div',
	              { className: 'row centerize' },
	              'There are no products in your cart.'
	            );
	          }
	        }(),
	        _react2.default.createElement(
	          'div',
	          { className: 'row' },
	          _react2.default.createElement('hr', null),
	          _react2.default.createElement(Total, { data: this.state.products })
	        ),
	        _react2.default.createElement(Buttons, null)
	      );
	    }
	  }]);

	  return Cart;
	}(_react.Component);

	exports.default = Cart;

	var Total = exports.Total = function (_Component2) {
	  _inherits(Total, _Component2);

	  function Total(props) {
	    _classCallCheck(this, Total);

	    var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(Total).call(this, props));

	    _this5.state = {
	      total: 0
	    };
	    return _this5;
	  }

	  _createClass(Total, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var total = 0;
	      for (var key in nextProps.data) {
	        var itemTotal = parseFloat(nextProps.data[key].total);
	        total = total + itemTotal;
	      }
	      this.setState({ total: total });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'row' },
	        _react2.default.createElement('div', { className: 'col s9', style: { height: "2px" } }),
	        _react2.default.createElement(
	          'div',
	          { className: 'col s3', style: { textAlign: "right", fontWeight: "700" } },
	          _react2.default.createElement('br', null),
	          _react2.default.createElement('hr', null),
	          'Subtotal - $',
	          this.state.total
	        )
	      );
	    }
	  }]);

	  return Total;
	}(_react.Component);

	var Buttons = exports.Buttons = function (_Component3) {
	  _inherits(Buttons, _Component3);

	  function Buttons() {
	    _classCallCheck(this, Buttons);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Buttons).apply(this, arguments));
	  }

	  _createClass(Buttons, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'row' },
	        _react2.default.createElement(
	          'div',
	          { className: 'col s3' },
	          'Keep Shopping'
	        ),
	        _react2.default.createElement('div', { className: 'col s6', style: { height: "2px" } }),
	        _react2.default.createElement(
	          'div',
	          { className: 'col s3', style: { textAlign: "right" } },
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { to: '/checkout/' },
	            'Checkout'
	          )
	        )
	      );
	    }
	  }]);

	  return Buttons;
	}(_react.Component);

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(6);

	var _superagent = __webpack_require__(12);

	var _superagent2 = _interopRequireDefault(_superagent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Checkout = function (_Component) {
	  _inherits(Checkout, _Component);

	  function Checkout(props) {
	    _classCallCheck(this, Checkout);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Checkout).call(this, props));

	    _this.state = {
	      products: [],
	      loggedIn: true
	    };
	    return _this;
	  }

	  _createClass(Checkout, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      _superagent2.default.get('/api/checkout').end(function (err, res) {
	        for (var key in res.body.contents) {
	          var itemObject = {
	            id: res.body.contents[key].id,
	            brand: res.body.contents[key].brand.value,
	            name: res.body.contents[key].name,
	            price: res.body.contents[key].price.toFixed(2),
	            image: res.body.contents[key].images[0].url.http,
	            slug: res.body.contents[key].slug,
	            quantity: res.body.contents[key].quantity,
	            total: res.body.contents[key].totals.pre_discount.raw.without_tax.toFixed(2)
	          };
	          _this2.setState({ products: _this2.state.products.concat(itemObject) });
	        }
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        this.loggedIn ? _react2.default.createElement('loggedIn', { data: this.state.products }) : _react2.default.createElement('loggedOut', null)
	      );
	    }
	  }]);

	  return Checkout;
	}(_react.Component);

	exports.default = Checkout;
	;

	var loggedIn = function (_Component2) {
	  _inherits(loggedIn, _Component2);

	  function loggedIn(props) {
	    _classCallCheck(this, loggedIn);

	    var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(loggedIn).call(this, props));

	    _this3.state = {};
	    return _this3;
	  }

	  _createClass(loggedIn, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'row' },
	        _react2.default.createElement(
	          'h1',
	          null,
	          'Logged In'
	        )
	      );
	    }
	  }]);

	  return loggedIn;
	}(_react.Component);

	exports.default = loggedIn;
	;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _product = __webpack_require__(20);

	var _product2 = _interopRequireDefault(_product);

	var _category = __webpack_require__(23);

	var _category2 = _interopRequireDefault(_category);

	var _cart = __webpack_require__(24);

	var _cart2 = _interopRequireDefault(_cart);

	var _checkout = __webpack_require__(25);

	var _checkout2 = _interopRequireDefault(_checkout);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = [].concat(_product2.default, _category2.default, _cart2.default, _checkout2.default);

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(21).config();

	var moltin = __webpack_require__(22)({
	  publicId: process.env.MOLTIN_CLIENTID,
	  secretKey: process.env.MOLTIN_CLIENTSECRET
	});

	module.exports = [{
	  method: 'GET',
	  path: '/api/products',
	  handler: function handler(request, reply) {
	    moltin.Authenticate(function () {
	      var p = new Promise(function (resolve, reject) {
	        moltin.Product.Search({}, function (products) {
	          resolve(products);
	        });
	      });
	      p.then(function (res) {
	        return res;
	      });
	      reply(p);
	    });
	  }
	}, {
	  method: 'POST',
	  path: '/api/product',
	  handler: function handler(request, reply) {
	    moltin.Authenticate(function () {
	      var p = new Promise(function (resolve, reject) {
	        moltin.Product.Search({ slug: request.payload.product }, function (product) {
	          resolve(product);
	        });
	      });
	      p.then(function (res) {
	        return res;
	      });
	      reply(p);
	    });
	  }
	}];

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("dotenv");

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("moltin");

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(21).config();

	var moltin = __webpack_require__(22)({
	  publicId: process.env.MOLTIN_CLIENTID,
	  secretKey: process.env.MOLTIN_CLIENTSECRET
	});

	module.exports = [{
	  method: 'POST',
	  path: '/api/category',
	  handler: function handler(request, reply) {
	    moltin.Authenticate(function () {
	      var p = new Promise(function (resolve, reject) {
	        moltin.Category.List({ slug: request.payload.category }, function (category) {
	          moltin.Product.Search({ category: category[0].id }, function (product) {
	            resolve(product);
	          });
	        });
	      });
	      p.then(function (res) {
	        return res;
	      });
	      reply(p);
	    });
	  }
	}];

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(21).config();

	var moltin = __webpack_require__(22)({
	  publicId: process.env.MOLTIN_CLIENTID,
	  secretKey: process.env.MOLTIN_CLIENTSECRET
	});

	module.exports = [{
	  method: 'POST',
	  path: '/api/cart/add',
	  handler: function handler(request) {
	    moltin.Authenticate(function () {
	      var options = null;
	      if (request.payload.modifierId && request.payload.variationId) {
	        var modifierId = request.payload.modifierId;
	        var variationId = request.payload.variationId;
	        options = {};
	        options[modifierId] = variationId;
	      }
	      moltin.Cart.Insert(request.payload.productId, '1', options, function () {});
	    });
	  }
	}, {
	  method: 'GET',
	  path: '/api/cart',
	  handler: function handler(request, reply) {
	    moltin.Authenticate(function () {
	      var p = new Promise(function (resolve) {
	        moltin.Cart.Contents(function (items) {
	          resolve(items);
	        });
	      });
	      p.then(function (items) {
	        return items;
	      });
	      reply(p);
	    });
	  }
	}, {
	  method: 'POST',
	  path: '/api/cart/quantity',
	  handler: function handler(request, reply) {
	    moltin.Authenticate(function () {
	      var p = new Promise(function (resolve) {
	        moltin.Cart.Update(request.payload.id, { quantity: request.payload.quantity }, function (item) {
	          resolve(item);
	        });
	      });
	      p.then(function (item) {
	        return item;
	      });
	      reply(p);
	    });
	  }
	}];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(21).config();

	var moltin = __webpack_require__(22)({
	  publicId: process.env.MOLTIN_CLIENTID,
	  secretKey: process.env.MOLTIN_CLIENTSECRET
	});

	module.exports = [{
	  method: 'GET',
	  path: '/api/checkout',
	  handler: function handler(request, reply) {
	    moltin.Authenticate(function () {
	      var p = new Promise(function (resolve) {
	        moltin.Cart.Contents(function (items) {
	          resolve(items);
	        });
	      });
	      p.then(function (items) {
	        return items;
	      });
	      reply(p);
	    });
	  }
	}];

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("hapi-sass");

/***/ }
/******/ ]);