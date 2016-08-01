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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(17).config();


	var server = new _hapi2.default.Server({
	  connections: {
	    routes: {
	      files: {
	        relativeTo: _path2.default.join(__dirname, 'public')
	      }
	    }
	  }
	});

	var moltin = __webpack_require__(18)({
	  publicId: process.env.MOLTIN_CLIENTID,
	  secretKey: process.env.MOLTIN_CLIENTSECRET
	});

	server.connection({ port: 3000 });

	server.register(_inert2.default, function () {});

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

	moltin.Authenticate(function () {
	  server.route({
	    method: 'GET',
	    path: '/api/products',
	    handler: function handler(request, reply) {
	      var p = new Promise(function (resolve, reject) {
	        moltin.Product.Search({}, function (products) {
	          resolve(products);
	        });
	      });
	      p.then(function (res) {
	        return res;
	      });
	      reply(p);
	    }
	  });
	  server.route({
	    method: 'POST',
	    path: '/api/product',
	    handler: function handler(request, reply) {
	      var p = new Promise(function (resolve, reject) {
	        moltin.Product.Search({ slug: request.payload.product }, function (product) {
	          resolve(product);
	        });
	      });
	      p.then(function (res) {
	        return res;
	      });
	      reply(p);
	    }
	  });
	  server.route({
	    method: 'POST',
	    path: '/api/product/add',
	    handler: function handler(request, reply) {
	      var p = new Promise(function (resolve, reject) {
	        moltin.Cart.Insert(request.payload.productId, '1', null, function (cart) {
	          console.log(cart);
	        });
	      });
	    }
	  });
	  server.route({
	    method: 'POST',
	    path: '/api/category',
	    handler: function handler(request, reply) {
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
	    }
	  });
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
	  return '\n    <!doctype html public="storage">\n    <html>\n    <meta charset=utf-8/>\n    <title>Application - Home</title>\n    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">\n    <link rel="stylesheet" href="/main.css" />\n    <div id=react-render>' + appHtml + '</div>\n    <script src="/javascripts/jquery-3.0.0.js"></script>\n    <script src="/javascripts/materialize.js"></script>\n    <script src="http://localhost:8080/js/app.js"></script>\n   ';
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

	var _Product = __webpack_require__(14);

	var _Product2 = _interopRequireDefault(_Product);

	var _Category = __webpack_require__(16);

	var _Category2 = _interopRequireDefault(_Category);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: '/', component: _App2.default },
	  _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/category/:id', component: _Category2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/products/:id', component: _Product2.default })
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

	var _reactDom = __webpack_require__(11);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactMasonryComponent = __webpack_require__(12);

	var _reactMasonryComponent2 = _interopRequireDefault(_reactMasonryComponent);

	var _superagent = __webpack_require__(13);

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

	module.exports = require("react-dom");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("react-masonry-component");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("superagent");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactSlick = __webpack_require__(15);

	var _reactSlick2 = _interopRequireDefault(_reactSlick);

	var _superagent = __webpack_require__(13);

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
	      message: ''
	    };
	    return _this;
	  }

	  _createClass(Product, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      var productSlug = this.props.params.id;
	      console.log(productSlug);
	      _superagent2.default.post('/api/product').send({ product: productSlug }).end(function (err, res) {
	        _this2.setState({ product: res.body });
	      });
	    }
	  }, {
	    key: 'addCart',
	    value: function addCart(e) {
	      var _this3 = this;

	      e.preventDefault();
	      var productId = this.state.product[0].id;
	      _superagent2.default.post('/api/product/add').send({ productId: productId }).end(function (err, res) {
	        console.log(res);
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
	      return _react2.default.createElement(
	        'div',
	        null,
	        this.state.product.map(function (prod, i) {
	          var self = _this4;
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

	var _superagent = __webpack_require__(13);

	var _superagent2 = _interopRequireDefault(_superagent);

	var _reactMasonryComponent = __webpack_require__(12);

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
/***/ function(module, exports) {

	module.exports = require("dotenv");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("moltin");

/***/ }
/******/ ]);