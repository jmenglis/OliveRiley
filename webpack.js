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

	var _webpackDevServer = __webpack_require__(1);

	var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

	var _webpack = __webpack_require__(2);

	var _webpack2 = _interopRequireDefault(_webpack);

	var _webpackConfigDev = __webpack_require__(3);

	var _webpackConfigDev2 = _interopRequireDefault(_webpackConfigDev);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var server = new _webpackDevServer2.default((0, _webpack2.default)(_webpackConfigDev2.default), {
	  publicPath: _webpackConfigDev2.default.output.publicPath,
	  hot: true
	});

	server.listen(8080, 'localhost', function () {});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("webpack-dev-server");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("webpack");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var webpack = __webpack_require__(2);

	module.exports = {
	  entry: ['webpack-dev-server/client?http://localhost:8080', 'webpack/hot/only-dev-server', './src/client/main'],
	  module: {
	    loaders: [{
	      test: /\.jsx?$/,
	      exclude: /node_modules/,
	      loader: 'react-hot!babel-loader?presets[]=es2015&presets[]=es2016&presets[]=react'
	    }]
	  },
	  resolve: {
	    extensions: ['', '.js', '.jsx']
	  },
	  output: {
	    path: __dirname + '/public/js',
	    publicPath: 'http://localhost:8080/js/',
	    filename: 'app.js'
	  },
	  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin(), new webpack.optimize.DedupePlugin(), new webpack.optimize.OccurrenceOrderPlugin(), new webpack.optimize.UglifyJsPlugin()]
	};

/***/ }
/******/ ]);