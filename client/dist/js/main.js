/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/src/boot/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/src/boot/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lib_Injector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lib_Injector___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lib_Injector__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__registerComponents__ = __webpack_require__("./client/src/boot/registerComponents.js");




document.addEventListener('DOMContentLoaded', function () {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__registerComponents__["a" /* default */])();
});

/***/ }),

/***/ "./client/src/boot/registerComponents.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_Injector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_Injector___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lib_Injector__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_components_ManualCropField__ = __webpack_require__("./client/src/components/ManualCropField.jsx");



var registerComponents = function registerComponents() {
  __WEBPACK_IMPORTED_MODULE_0_lib_Injector___default.a.component.register('ManualCropField', __WEBPACK_IMPORTED_MODULE_1_components_ManualCropField__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (registerComponents);

/***/ }),

/***/ "./client/src/components/ManualCropField.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Component */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lib_Injector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lib_Injector___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lib_Injector__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_cropper__ = __webpack_require__("./node_modules/react-cropper/dist/react-cropper.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_cropper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_cropper__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var ManualCropField = function (_Component) {
  _inherits(ManualCropField, _Component);

  function ManualCropField(props) {
    _classCallCheck(this, ManualCropField);

    var _this = _possibleConstructorReturn(this, (ManualCropField.__proto__ || Object.getPrototypeOf(ManualCropField)).call(this, props));

    _this.state = {
      ManualCropData: props.data ? props.data.ManualCropData : {}
    };
    return _this;
  }

  _createClass(ManualCropField, [{
    key: '_crop',
    value: function _crop() {}
  }, {
    key: '_cropend',
    value: function _cropend() {
      var _props = this.props,
          children = _props.children,
          onAutofill = _props.onAutofill,
          name = _props.name;

      var child = children[0];
      var cropdata = this.refs.cropper.getData();
      var save = {
        x: cropdata.x ? Math.round(cropdata.x) : 0,
        y: cropdata.y ? Math.round(cropdata.y) : 0,
        width: cropdata.width ? Math.round(cropdata.width) : 0,
        height: cropdata.height ? Math.round(cropdata.height) : 0,
        rotate: cropdata.rotate ? Math.round(cropdata.rotate) : 0,
        scaleX: cropdata.scaleX ? Math.round(cropdata.scaleX) : 0,
        scaleY: cropdata.scaleY ? Math.round(cropdata.scaleY) : 0
      };

      onAutofill(child.props.name, JSON.stringify(save));

      this.setState({
        ManualCropData: save
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextState.ManualCropData.x == this.state.ManualCropData.x && nextState.ManualCropData.y == this.state.ManualCropData.y && nextState.ManualCropData.width == this.state.ManualCropData.width && nextState.ManualCropData.height == this.state.ManualCropData.height) {
        return false;
      }
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren(children) {
      return children;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          children = _props2.children,
          data = _props2.data;


      var manual_crop_data = {};
      if (this.state && 'ManualCropData' in this.state) {
        manual_crop_data = this.state.ManualCropData;
      } else if ('ManualCropData' in data) {
        manual_crop_data = data.ManualCropData;
      }

      var image_url = '';
      if (this.state && 'ImageURL' in this.state) {
        image_url = this.state.ImageURL;
      } else if ('ImageURL' in data) {
        image_url = data.ImageURL;
      }

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { 'data-cropper': '1' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_cropper___default.a, {
          ref: 'cropper',
          src: image_url,
          style: { height: 'auto', width: '100%' },

          minContainerWidth: 400,
          minContainerHeight: 300,
          aspectRatio: NaN,
          guides: true,
          viewMode: 2,
          dragMode: 'crop',
          autoCrop: true,
          movable: true,
          rotatable: false,
          scalable: true,
          zoomable: false,
          zoomOnTouch: false,
          zoomOnWheel: false,
          checkOrientation: false,
          autoCropArea: 0.5,
          data: manual_crop_data,
          cropend: this._cropend.bind(this),
          crop: this._crop.bind(this) }),
        this.renderChildren(children)
      );
    }
  }]);

  return ManualCropField;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

ManualCropField.defaultProps = {};

ManualCropField.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].array,
  onAutofill: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func,
  FieldGroup: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].oneOfType([__WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].element, __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func]).isRequired
};



/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_lib_Injector__["inject"])(['FieldGroup'])(ManualCropField));

/***/ }),

/***/ "./node_modules/cropperjs/dist/cropper.js":
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Cropper.js v1.0.0-rc.3
 * https://github.com/fengyuanchen/cropperjs
 *
 * Copyright (c) 2017 Fengyuan Chen
 * Released under the MIT license
 *
 * Date: 2017-07-07T12:56:42.462Z
 */

(function (global, factory) {
   true ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Cropper = factory());
}(this, (function () { 'use strict';

var DEFAULTS = {
  // Define the view mode of the cropper
  viewMode: 0, // 0, 1, 2, 3

  // Define the dragging mode of the cropper
  dragMode: 'crop', // 'crop', 'move' or 'none'

  // Define the aspect ratio of the crop box
  aspectRatio: NaN,

  // An object with the previous cropping result data
  data: null,

  // A selector for adding extra containers to preview
  preview: '',

  // Re-render the cropper when resize the window
  responsive: true,

  // Restore the cropped area after resize the window
  restore: true,

  // Check if the current image is a cross-origin image
  checkCrossOrigin: true,

  // Check the current image's Exif Orientation information
  checkOrientation: true,

  // Show the black modal
  modal: true,

  // Show the dashed lines for guiding
  guides: true,

  // Show the center indicator for guiding
  center: true,

  // Show the white modal to highlight the crop box
  highlight: true,

  // Show the grid background
  background: true,

  // Enable to crop the image automatically when initialize
  autoCrop: true,

  // Define the percentage of automatic cropping area when initializes
  autoCropArea: 0.8,

  // Enable to move the image
  movable: true,

  // Enable to rotate the image
  rotatable: true,

  // Enable to scale the image
  scalable: true,

  // Enable to zoom the image
  zoomable: true,

  // Enable to zoom the image by dragging touch
  zoomOnTouch: true,

  // Enable to zoom the image by wheeling mouse
  zoomOnWheel: true,

  // Define zoom ratio when zoom the image by wheeling mouse
  wheelZoomRatio: 0.1,

  // Enable to move the crop box
  cropBoxMovable: true,

  // Enable to resize the crop box
  cropBoxResizable: true,

  // Toggle drag mode between "crop" and "move" when click twice on the cropper
  toggleDragModeOnDblclick: true,

  // Size limitation
  minCanvasWidth: 0,
  minCanvasHeight: 0,
  minCropBoxWidth: 0,
  minCropBoxHeight: 0,
  minContainerWidth: 200,
  minContainerHeight: 100,

  // Shortcuts of events
  ready: null,
  cropstart: null,
  cropmove: null,
  cropend: null,
  crop: null,
  zoom: null
};

var TEMPLATE = '<div class="cropper-container">' + '<div class="cropper-wrap-box">' + '<div class="cropper-canvas"></div>' + '</div>' + '<div class="cropper-drag-box"></div>' + '<div class="cropper-crop-box">' + '<span class="cropper-view-box"></span>' + '<span class="cropper-dashed dashed-h"></span>' + '<span class="cropper-dashed dashed-v"></span>' + '<span class="cropper-center"></span>' + '<span class="cropper-face"></span>' + '<span class="cropper-line line-e" data-action="e"></span>' + '<span class="cropper-line line-n" data-action="n"></span>' + '<span class="cropper-line line-w" data-action="w"></span>' + '<span class="cropper-line line-s" data-action="s"></span>' + '<span class="cropper-point point-e" data-action="e"></span>' + '<span class="cropper-point point-n" data-action="n"></span>' + '<span class="cropper-point point-w" data-action="w"></span>' + '<span class="cropper-point point-s" data-action="s"></span>' + '<span class="cropper-point point-ne" data-action="ne"></span>' + '<span class="cropper-point point-nw" data-action="nw"></span>' + '<span class="cropper-point point-sw" data-action="sw"></span>' + '<span class="cropper-point point-se" data-action="se"></span>' + '</div>' + '</div>';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

// RegExps
var REGEXP_DATA_URL_HEAD = /^data:.*,/;
var REGEXP_HYPHENATE = /([a-z\d])([A-Z])/g;
var REGEXP_ORIGINS = /^(https?:)\/\/([^:/?#]+):?(\d*)/i;
var REGEXP_SPACES = /\s+/;
var REGEXP_SUFFIX = /^(width|height|left|top|marginLeft|marginTop)$/;
var REGEXP_TRIM = /^\s+(.*)\s+$/;
var REGEXP_USERAGENT = /(Macintosh|iPhone|iPod|iPad).*AppleWebKit/i;

// Utilities
var navigator = typeof window !== 'undefined' ? window.navigator : null;
var IS_SAFARI_OR_UIWEBVIEW = navigator && REGEXP_USERAGENT.test(navigator.userAgent);
var objectProto = Object.prototype;
var toString = objectProto.toString;
var hasOwnProperty = objectProto.hasOwnProperty;
var slice = Array.prototype.slice;
var fromCharCode = String.fromCharCode;

function typeOf(obj) {
  return toString.call(obj).slice(8, -1).toLowerCase();
}

function isNumber(num) {
  return typeof num === 'number' && !isNaN(num);
}

function isUndefined(obj) {
  return typeof obj === 'undefined';
}

function isObject(obj) {
  return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null;
}

function isPlainObject(obj) {
  if (!isObject(obj)) {
    return false;
  }

  try {
    var _constructor = obj.constructor;
    var prototype = _constructor.prototype;

    return _constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
  } catch (e) {
    return false;
  }
}

function isFunction(fn) {
  return typeOf(fn) === 'function';
}

function isArray(arr) {
  return Array.isArray ? Array.isArray(arr) : typeOf(arr) === 'array';
}



function trim(str) {
  if (typeof str === 'string') {
    str = str.trim ? str.trim() : str.replace(REGEXP_TRIM, '$1');
  }

  return str;
}

function each(obj, callback) {
  if (obj && isFunction(callback)) {
    var i = void 0;

    if (isArray(obj) || isNumber(obj.length) /* array-like */) {
        var length = obj.length;

        for (i = 0; i < length; i++) {
          if (callback.call(obj, obj[i], i, obj) === false) {
            break;
          }
        }
      } else if (isObject(obj)) {
      Object.keys(obj).forEach(function (key) {
        callback.call(obj, obj[key], key, obj);
      });
    }
  }

  return obj;
}

function extend(obj) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (isObject(obj) && args.length > 0) {
    if (Object.assign) {
      return Object.assign.apply(Object, [obj].concat(args));
    }

    args.forEach(function (arg) {
      if (isObject(arg)) {
        Object.keys(arg).forEach(function (key) {
          obj[key] = arg[key];
        });
      }
    });
  }

  return obj;
}

function proxy(fn, context) {
  for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  return function () {
    for (var _len3 = arguments.length, args2 = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args2[_key3] = arguments[_key3];
    }

    return fn.apply(context, args.concat(args2));
  };
}

function setStyle(element, styles) {
  var style = element.style;

  each(styles, function (value, property) {
    if (REGEXP_SUFFIX.test(property) && isNumber(value)) {
      value += 'px';
    }

    style[property] = value;
  });
}

function hasClass(element, value) {
  return element.classList ? element.classList.contains(value) : element.className.indexOf(value) > -1;
}

function addClass(element, value) {
  if (!value) {
    return;
  }

  if (isNumber(element.length)) {
    each(element, function (elem) {
      addClass(elem, value);
    });
    return;
  }

  if (element.classList) {
    element.classList.add(value);
    return;
  }

  var className = trim(element.className);

  if (!className) {
    element.className = value;
  } else if (className.indexOf(value) < 0) {
    element.className = className + ' ' + value;
  }
}

function removeClass(element, value) {
  if (!value) {
    return;
  }

  if (isNumber(element.length)) {
    each(element, function (elem) {
      removeClass(elem, value);
    });
    return;
  }

  if (element.classList) {
    element.classList.remove(value);
    return;
  }

  if (element.className.indexOf(value) >= 0) {
    element.className = element.className.replace(value, '');
  }
}

function toggleClass(element, value, added) {
  if (!value) {
    return;
  }

  if (isNumber(element.length)) {
    each(element, function (elem) {
      toggleClass(elem, value, added);
    });
    return;
  }

  // IE10-11 doesn't support the second parameter of `classList.toggle`
  if (added) {
    addClass(element, value);
  } else {
    removeClass(element, value);
  }
}

function hyphenate(str) {
  return str.replace(REGEXP_HYPHENATE, '$1-$2').toLowerCase();
}

function getData$1(element, name) {
  if (isObject(element[name])) {
    return element[name];
  } else if (element.dataset) {
    return element.dataset[name];
  }

  return element.getAttribute('data-' + hyphenate(name));
}

function setData$1(element, name, data) {
  if (isObject(data)) {
    element[name] = data;
  } else if (element.dataset) {
    element.dataset[name] = data;
  } else {
    element.setAttribute('data-' + hyphenate(name), data);
  }
}

function removeData(element, name) {
  if (isObject(element[name])) {
    delete element[name];
  } else if (element.dataset) {
    // #128 Safari not allows to delete dataset property
    try {
      delete element.dataset[name];
    } catch (e) {
      element.dataset[name] = null;
    }
  } else {
    element.removeAttribute('data-' + hyphenate(name));
  }
}

function removeListener(element, type, handler) {
  var types = trim(type).split(REGEXP_SPACES);

  if (types.length > 1) {
    each(types, function (t) {
      removeListener(element, t, handler);
    });
    return;
  }

  if (element.removeEventListener) {
    element.removeEventListener(type, handler, false);
  } else if (element.detachEvent) {
    element.detachEvent('on' + type, handler);
  }
}

function addListener(element, type, _handler, once) {
  var types = trim(type).split(REGEXP_SPACES);
  var originalHandler = _handler;

  if (types.length > 1) {
    each(types, function (t) {
      addListener(element, t, _handler);
    });
    return;
  }

  if (once) {
    _handler = function handler() {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      removeListener(element, type, _handler);

      return originalHandler.apply(element, args);
    };
  }

  if (element.addEventListener) {
    element.addEventListener(type, _handler, false);
  } else if (element.attachEvent) {
    element.attachEvent('on' + type, _handler);
  }
}

function dispatchEvent(element, type, data) {
  if (element.dispatchEvent) {
    var event = void 0;

    // Event and CustomEvent on IE9-11 are global objects, not constructors
    if (isFunction(Event) && isFunction(CustomEvent)) {
      if (isUndefined(data)) {
        event = new Event(type, {
          bubbles: true,
          cancelable: true
        });
      } else {
        event = new CustomEvent(type, {
          detail: data,
          bubbles: true,
          cancelable: true
        });
      }
    } else if (isUndefined(data)) {
      event = document.createEvent('Event');
      event.initEvent(type, true, true);
    } else {
      event = document.createEvent('CustomEvent');
      event.initCustomEvent(type, true, true, data);
    }

    // IE9+
    return element.dispatchEvent(event);
  } else if (element.fireEvent) {
    // IE6-10 (native events only)
    return element.fireEvent('on' + type);
  }

  return true;
}

function getEvent(event) {
  var e = event || window.event;

  // Fix target property (IE8)
  if (!e.target) {
    e.target = e.srcElement || document;
  }

  if (!isNumber(e.pageX) && isNumber(e.clientX)) {
    var eventDoc = event.target.ownerDocument || document;
    var doc = eventDoc.documentElement;
    var body = eventDoc.body;

    e.pageX = e.clientX + ((doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0));
    e.pageY = e.clientY + ((doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0));
  }

  return e;
}

function getOffset(element) {
  var doc = document.documentElement;
  var box = element.getBoundingClientRect();

  return {
    left: box.left + ((window.scrollX || doc && doc.scrollLeft || 0) - (doc && doc.clientLeft || 0)),
    top: box.top + ((window.scrollY || doc && doc.scrollTop || 0) - (doc && doc.clientTop || 0))
  };
}

function getByTag(element, tagName) {
  return element.getElementsByTagName(tagName);
}

function getByClass(element, className) {
  return element.getElementsByClassName ? element.getElementsByClassName(className) : element.querySelectorAll('.' + className);
}

function createElement(tagName) {
  return document.createElement(tagName);
}

function appendChild(element, elem) {
  element.appendChild(elem);
}

function removeChild(element) {
  if (element.parentNode) {
    element.parentNode.removeChild(element);
  }
}

function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function isCrossOriginURL(url) {
  var parts = url.match(REGEXP_ORIGINS);

  return parts && (parts[1] !== location.protocol || parts[2] !== location.hostname || parts[3] !== location.port);
}

function addTimestamp(url) {
  var timestamp = 'timestamp=' + new Date().getTime();

  return url + (url.indexOf('?') === -1 ? '?' : '&') + timestamp;
}

function getImageSize(image, callback) {
  // Modern browsers (ignore Safari)
  if (image.naturalWidth && !IS_SAFARI_OR_UIWEBVIEW) {
    callback(image.naturalWidth, image.naturalHeight);
    return;
  }

  // IE8: Don't use `new Image()` here
  var newImage = createElement('img');

  newImage.onload = function load() {
    callback(this.width, this.height);
  };

  newImage.src = image.src;
}

function getTransforms(data) {
  var transforms = [];
  var translateX = data.translateX;
  var translateY = data.translateY;
  var rotate = data.rotate;
  var scaleX = data.scaleX;
  var scaleY = data.scaleY;

  if (isNumber(translateX) && translateX !== 0) {
    transforms.push('translateX(' + translateX + 'px)');
  }

  if (isNumber(translateY) && translateY !== 0) {
    transforms.push('translateY(' + translateY + 'px)');
  }

  // Rotate should come first before scale to match orientation transform
  if (isNumber(rotate) && rotate !== 0) {
    transforms.push('rotate(' + rotate + 'deg)');
  }

  if (isNumber(scaleX) && scaleX !== 1) {
    transforms.push('scaleX(' + scaleX + ')');
  }

  if (isNumber(scaleY) && scaleY !== 1) {
    transforms.push('scaleY(' + scaleY + ')');
  }

  var transform = transforms.length ? transforms.join(' ') : 'none';

  return {
    WebkitTransform: transform,
    msTransform: transform,
    transform: transform
  };
}

function getRotatedSizes(data, reversed) {
  var deg = Math.abs(data.degree) % 180;
  var arc = (deg > 90 ? 180 - deg : deg) * Math.PI / 180;
  var sinArc = Math.sin(arc);
  var cosArc = Math.cos(arc);
  var width = data.width;
  var height = data.height;
  var aspectRatio = data.aspectRatio;
  var newWidth = void 0;
  var newHeight = void 0;

  if (!reversed) {
    newWidth = width * cosArc + height * sinArc;
    newHeight = width * sinArc + height * cosArc;
  } else {
    newWidth = width / (cosArc + sinArc / aspectRatio);
    newHeight = newWidth / aspectRatio;
  }

  return {
    width: newWidth,
    height: newHeight
  };
}

function getSourceCanvas(image, data, options) {
  var canvas = createElement('canvas');
  var context = canvas.getContext('2d');
  var dstX = 0;
  var dstY = 0;
  var dstWidth = data.naturalWidth;
  var dstHeight = data.naturalHeight;
  var rotate = data.rotate;
  var scaleX = data.scaleX;
  var scaleY = data.scaleY;
  var scalable = isNumber(scaleX) && isNumber(scaleY) && (scaleX !== 1 || scaleY !== 1);
  var rotatable = isNumber(rotate) && rotate !== 0;
  var advanced = rotatable || scalable;
  var canvasWidth = dstWidth * Math.abs(scaleX || 1);
  var canvasHeight = dstHeight * Math.abs(scaleY || 1);
  var translateX = void 0;
  var translateY = void 0;
  var rotated = void 0;

  if (scalable) {
    translateX = canvasWidth / 2;
    translateY = canvasHeight / 2;
  }

  if (rotatable) {
    rotated = getRotatedSizes({
      width: canvasWidth,
      height: canvasHeight,
      degree: rotate
    });

    canvasWidth = rotated.width;
    canvasHeight = rotated.height;
    translateX = canvasWidth / 2;
    translateY = canvasHeight / 2;
  }

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  if (options.fillColor) {
    context.fillStyle = options.fillColor;
    context.fillRect(0, 0, canvasWidth, canvasHeight);
  }

  if (advanced) {
    dstX = -dstWidth / 2;
    dstY = -dstHeight / 2;

    context.save();
    context.translate(translateX, translateY);
  }

  // Rotate should come first before scale as in the "getTransform" function
  if (rotatable) {
    context.rotate(rotate * Math.PI / 180);
  }

  if (scalable) {
    context.scale(scaleX, scaleY);
  }

  context.imageSmoothingEnabled = !!options.imageSmoothingEnabled;

  if (options.imageSmoothingQuality) {
    context.imageSmoothingQuality = options.imageSmoothingQuality;
  }

  context.drawImage(image, Math.floor(dstX), Math.floor(dstY), Math.floor(dstWidth), Math.floor(dstHeight));

  if (advanced) {
    context.restore();
  }

  return canvas;
}

function getStringFromCharCode(dataView, start, length) {
  var str = '';
  var i = start;

  for (length += start; i < length; i++) {
    str += fromCharCode(dataView.getUint8(i));
  }

  return str;
}

function getOrientation(arrayBuffer) {
  var dataView = new DataView(arrayBuffer);
  var length = dataView.byteLength;
  var orientation = void 0;
  var exifIDCode = void 0;
  var tiffOffset = void 0;
  var firstIFDOffset = void 0;
  var littleEndian = void 0;
  var endianness = void 0;
  var app1Start = void 0;
  var ifdStart = void 0;
  var offset = void 0;
  var i = void 0;

  // Only handle JPEG image (start by 0xFFD8)
  if (dataView.getUint8(0) === 0xFF && dataView.getUint8(1) === 0xD8) {
    offset = 2;

    while (offset < length) {
      if (dataView.getUint8(offset) === 0xFF && dataView.getUint8(offset + 1) === 0xE1) {
        app1Start = offset;
        break;
      }

      offset++;
    }
  }

  if (app1Start) {
    exifIDCode = app1Start + 4;
    tiffOffset = app1Start + 10;

    if (getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
      endianness = dataView.getUint16(tiffOffset);
      littleEndian = endianness === 0x4949;

      if (littleEndian || endianness === 0x4D4D /* bigEndian */) {
          if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002A) {
            firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);

            if (firstIFDOffset >= 0x00000008) {
              ifdStart = tiffOffset + firstIFDOffset;
            }
          }
        }
    }
  }

  if (ifdStart) {
    length = dataView.getUint16(ifdStart, littleEndian);

    for (i = 0; i < length; i++) {
      offset = ifdStart + i * 12 + 2;

      if (dataView.getUint16(offset, littleEndian) === 0x0112 /* Orientation */) {
          // 8 is the offset of the current tag's value
          offset += 8;

          // Get the original orientation value
          orientation = dataView.getUint16(offset, littleEndian);

          // Override the orientation with its default value for Safari
          if (IS_SAFARI_OR_UIWEBVIEW) {
            dataView.setUint16(offset, 1, littleEndian);
          }

          break;
        }
    }
  }

  return orientation;
}

function dataURLToArrayBuffer(dataURL) {
  var base64 = dataURL.replace(REGEXP_DATA_URL_HEAD, '');
  var binary = atob(base64);
  var length = binary.length;
  var arrayBuffer = new ArrayBuffer(length);
  var dataView = new Uint8Array(arrayBuffer);
  var i = void 0;

  for (i = 0; i < length; i++) {
    dataView[i] = binary.charCodeAt(i);
  }

  return arrayBuffer;
}

// Only available for JPEG image
function arrayBufferToDataURL(arrayBuffer) {
  var dataView = new Uint8Array(arrayBuffer);
  var length = dataView.length;
  var base64 = '';
  var i = void 0;

  for (i = 0; i < length; i++) {
    base64 += fromCharCode(dataView[i]);
  }

  return 'data:image/jpeg;base64,' + btoa(base64);
}

var render$1 = {
  render: function render() {
    var self = this;

    self.initContainer();
    self.initCanvas();
    self.initCropBox();

    self.renderCanvas();

    if (self.cropped) {
      self.renderCropBox();
    }
  },
  initContainer: function initContainer() {
    var self = this;
    var options = self.options;
    var element = self.element;
    var container = self.container;
    var cropper = self.cropper;
    var hidden = 'cropper-hidden';
    var containerData = void 0;

    addClass(cropper, hidden);
    removeClass(element, hidden);

    self.containerData = containerData = {
      width: Math.max(container.offsetWidth, Number(options.minContainerWidth) || 200),
      height: Math.max(container.offsetHeight, Number(options.minContainerHeight) || 100)
    };

    setStyle(cropper, {
      width: containerData.width,
      height: containerData.height
    });

    addClass(element, hidden);
    removeClass(cropper, hidden);
  },


  // Canvas (image wrapper)
  initCanvas: function initCanvas() {
    var self = this;
    var viewMode = self.options.viewMode;
    var containerData = self.containerData;
    var imageData = self.imageData;
    var rotated = Math.abs(imageData.rotate) % 180 === 90;
    var naturalWidth = rotated ? imageData.naturalHeight : imageData.naturalWidth;
    var naturalHeight = rotated ? imageData.naturalWidth : imageData.naturalHeight;
    var aspectRatio = naturalWidth / naturalHeight;
    var canvasWidth = containerData.width;
    var canvasHeight = containerData.height;

    if (containerData.height * aspectRatio > containerData.width) {
      if (viewMode === 3) {
        canvasWidth = containerData.height * aspectRatio;
      } else {
        canvasHeight = containerData.width / aspectRatio;
      }
    } else if (viewMode === 3) {
      canvasHeight = containerData.width / aspectRatio;
    } else {
      canvasWidth = containerData.height * aspectRatio;
    }

    var canvasData = {
      naturalWidth: naturalWidth,
      naturalHeight: naturalHeight,
      aspectRatio: aspectRatio,
      width: canvasWidth,
      height: canvasHeight
    };

    canvasData.oldLeft = canvasData.left = (containerData.width - canvasWidth) / 2;
    canvasData.oldTop = canvasData.top = (containerData.height - canvasHeight) / 2;

    self.canvasData = canvasData;
    self.limited = viewMode === 1 || viewMode === 2;
    self.limitCanvas(true, true);
    self.initialImageData = extend({}, imageData);
    self.initialCanvasData = extend({}, canvasData);
  },
  limitCanvas: function limitCanvas(sizeLimited, positionLimited) {
    var self = this;
    var options = self.options;
    var viewMode = options.viewMode;
    var containerData = self.containerData;
    var canvasData = self.canvasData;
    var aspectRatio = canvasData.aspectRatio;
    var cropBoxData = self.cropBoxData;
    var cropped = self.cropped && cropBoxData;

    if (sizeLimited) {
      var minCanvasWidth = Number(options.minCanvasWidth) || 0;
      var minCanvasHeight = Number(options.minCanvasHeight) || 0;

      if (viewMode > 1) {
        minCanvasWidth = Math.max(minCanvasWidth, containerData.width);
        minCanvasHeight = Math.max(minCanvasHeight, containerData.height);

        if (viewMode === 3) {
          if (minCanvasHeight * aspectRatio > minCanvasWidth) {
            minCanvasWidth = minCanvasHeight * aspectRatio;
          } else {
            minCanvasHeight = minCanvasWidth / aspectRatio;
          }
        }
      } else if (viewMode > 0) {
        if (minCanvasWidth) {
          minCanvasWidth = Math.max(minCanvasWidth, cropped ? cropBoxData.width : 0);
        } else if (minCanvasHeight) {
          minCanvasHeight = Math.max(minCanvasHeight, cropped ? cropBoxData.height : 0);
        } else if (cropped) {
          minCanvasWidth = cropBoxData.width;
          minCanvasHeight = cropBoxData.height;

          if (minCanvasHeight * aspectRatio > minCanvasWidth) {
            minCanvasWidth = minCanvasHeight * aspectRatio;
          } else {
            minCanvasHeight = minCanvasWidth / aspectRatio;
          }
        }
      }

      if (minCanvasWidth && minCanvasHeight) {
        if (minCanvasHeight * aspectRatio > minCanvasWidth) {
          minCanvasHeight = minCanvasWidth / aspectRatio;
        } else {
          minCanvasWidth = minCanvasHeight * aspectRatio;
        }
      } else if (minCanvasWidth) {
        minCanvasHeight = minCanvasWidth / aspectRatio;
      } else if (minCanvasHeight) {
        minCanvasWidth = minCanvasHeight * aspectRatio;
      }

      canvasData.minWidth = minCanvasWidth;
      canvasData.minHeight = minCanvasHeight;
      canvasData.maxWidth = Infinity;
      canvasData.maxHeight = Infinity;
    }

    if (positionLimited) {
      if (viewMode) {
        var newCanvasLeft = containerData.width - canvasData.width;
        var newCanvasTop = containerData.height - canvasData.height;

        canvasData.minLeft = Math.min(0, newCanvasLeft);
        canvasData.minTop = Math.min(0, newCanvasTop);
        canvasData.maxLeft = Math.max(0, newCanvasLeft);
        canvasData.maxTop = Math.max(0, newCanvasTop);

        if (cropped && self.limited) {
          canvasData.minLeft = Math.min(cropBoxData.left, cropBoxData.left + (cropBoxData.width - canvasData.width));
          canvasData.minTop = Math.min(cropBoxData.top, cropBoxData.top + (cropBoxData.height - canvasData.height));
          canvasData.maxLeft = cropBoxData.left;
          canvasData.maxTop = cropBoxData.top;

          if (viewMode === 2) {
            if (canvasData.width >= containerData.width) {
              canvasData.minLeft = Math.min(0, newCanvasLeft);
              canvasData.maxLeft = Math.max(0, newCanvasLeft);
            }

            if (canvasData.height >= containerData.height) {
              canvasData.minTop = Math.min(0, newCanvasTop);
              canvasData.maxTop = Math.max(0, newCanvasTop);
            }
          }
        }
      } else {
        canvasData.minLeft = -canvasData.width;
        canvasData.minTop = -canvasData.height;
        canvasData.maxLeft = containerData.width;
        canvasData.maxTop = containerData.height;
      }
    }
  },
  renderCanvas: function renderCanvas(changed) {
    var self = this;
    var canvasData = self.canvasData;
    var imageData = self.imageData;
    var rotate = imageData.rotate;

    if (self.rotated) {
      self.rotated = false;

      // Computes rotated sizes with image sizes
      var rotatedData = getRotatedSizes({
        width: imageData.width,
        height: imageData.height,
        degree: rotate
      });
      var aspectRatio = rotatedData.width / rotatedData.height;
      var isSquareImage = imageData.aspectRatio === 1;

      if (isSquareImage || aspectRatio !== canvasData.aspectRatio) {
        canvasData.left -= (rotatedData.width - canvasData.width) / 2;
        canvasData.top -= (rotatedData.height - canvasData.height) / 2;
        canvasData.width = rotatedData.width;
        canvasData.height = rotatedData.height;
        canvasData.aspectRatio = aspectRatio;
        canvasData.naturalWidth = imageData.naturalWidth;
        canvasData.naturalHeight = imageData.naturalHeight;

        // Computes rotated sizes with natural image sizes
        if (isSquareImage && rotate % 90 || rotate % 180) {
          var rotatedData2 = getRotatedSizes({
            width: imageData.naturalWidth,
            height: imageData.naturalHeight,
            degree: rotate
          });

          canvasData.naturalWidth = rotatedData2.width;
          canvasData.naturalHeight = rotatedData2.height;
        }

        self.limitCanvas(true, false);
      }
    }

    if (canvasData.width > canvasData.maxWidth || canvasData.width < canvasData.minWidth) {
      canvasData.left = canvasData.oldLeft;
    }

    if (canvasData.height > canvasData.maxHeight || canvasData.height < canvasData.minHeight) {
      canvasData.top = canvasData.oldTop;
    }

    canvasData.width = Math.min(Math.max(canvasData.width, canvasData.minWidth), canvasData.maxWidth);
    canvasData.height = Math.min(Math.max(canvasData.height, canvasData.minHeight), canvasData.maxHeight);

    self.limitCanvas(false, true);

    canvasData.oldLeft = canvasData.left = Math.min(Math.max(canvasData.left, canvasData.minLeft), canvasData.maxLeft);
    canvasData.oldTop = canvasData.top = Math.min(Math.max(canvasData.top, canvasData.minTop), canvasData.maxTop);

    setStyle(self.canvas, extend({
      width: canvasData.width,
      height: canvasData.height
    }, getTransforms({
      translateX: canvasData.left,
      translateY: canvasData.top
    })));

    self.renderImage();

    if (self.cropped && self.limited) {
      self.limitCropBox(true, true);
    }

    if (changed) {
      self.output();
    }
  },
  renderImage: function renderImage(changed) {
    var self = this;
    var canvasData = self.canvasData;
    var imageData = self.imageData;
    var newImageData = void 0;
    var reversedData = void 0;
    var reversedWidth = void 0;
    var reversedHeight = void 0;

    if (imageData.rotate) {
      reversedData = getRotatedSizes({
        width: canvasData.width,
        height: canvasData.height,
        degree: imageData.rotate,
        aspectRatio: imageData.aspectRatio
      }, true);

      reversedWidth = reversedData.width;
      reversedHeight = reversedData.height;

      newImageData = {
        width: reversedWidth,
        height: reversedHeight,
        left: (canvasData.width - reversedWidth) / 2,
        top: (canvasData.height - reversedHeight) / 2
      };
    }

    extend(imageData, newImageData || {
      width: canvasData.width,
      height: canvasData.height,
      left: 0,
      top: 0
    });

    setStyle(self.image, extend({
      width: imageData.width,
      height: imageData.height
    }, getTransforms(extend({
      translateX: imageData.left,
      translateY: imageData.top
    }, imageData))));

    if (changed) {
      self.output();
    }
  },
  initCropBox: function initCropBox() {
    var self = this;
    var options = self.options;
    var aspectRatio = options.aspectRatio;
    var autoCropArea = Number(options.autoCropArea) || 0.8;
    var canvasData = self.canvasData;
    var cropBoxData = {
      width: canvasData.width,
      height: canvasData.height
    };

    if (aspectRatio) {
      if (canvasData.height * aspectRatio > canvasData.width) {
        cropBoxData.height = cropBoxData.width / aspectRatio;
      } else {
        cropBoxData.width = cropBoxData.height * aspectRatio;
      }
    }

    self.cropBoxData = cropBoxData;
    self.limitCropBox(true, true);

    // Initialize auto crop area
    cropBoxData.width = Math.min(Math.max(cropBoxData.width, cropBoxData.minWidth), cropBoxData.maxWidth);
    cropBoxData.height = Math.min(Math.max(cropBoxData.height, cropBoxData.minHeight), cropBoxData.maxHeight);

    // The width/height of auto crop area must large than "minWidth/Height"
    cropBoxData.width = Math.max(cropBoxData.minWidth, cropBoxData.width * autoCropArea);
    cropBoxData.height = Math.max(cropBoxData.minHeight, cropBoxData.height * autoCropArea);
    cropBoxData.oldLeft = cropBoxData.left = canvasData.left + (canvasData.width - cropBoxData.width) / 2;
    cropBoxData.oldTop = cropBoxData.top = canvasData.top + (canvasData.height - cropBoxData.height) / 2;

    self.initialCropBoxData = extend({}, cropBoxData);
  },
  limitCropBox: function limitCropBox(sizeLimited, positionLimited) {
    var self = this;
    var options = self.options;
    var aspectRatio = options.aspectRatio;
    var containerData = self.containerData;
    var canvasData = self.canvasData;
    var cropBoxData = self.cropBoxData;
    var limited = self.limited;

    if (sizeLimited) {
      var minCropBoxWidth = Number(options.minCropBoxWidth) || 0;
      var minCropBoxHeight = Number(options.minCropBoxHeight) || 0;
      var maxCropBoxWidth = Math.min(containerData.width, limited ? canvasData.width : containerData.width);
      var maxCropBoxHeight = Math.min(containerData.height, limited ? canvasData.height : containerData.height);

      // The min/maxCropBoxWidth/Height must be less than containerWidth/Height
      minCropBoxWidth = Math.min(minCropBoxWidth, containerData.width);
      minCropBoxHeight = Math.min(minCropBoxHeight, containerData.height);

      if (aspectRatio) {
        if (minCropBoxWidth && minCropBoxHeight) {
          if (minCropBoxHeight * aspectRatio > minCropBoxWidth) {
            minCropBoxHeight = minCropBoxWidth / aspectRatio;
          } else {
            minCropBoxWidth = minCropBoxHeight * aspectRatio;
          }
        } else if (minCropBoxWidth) {
          minCropBoxHeight = minCropBoxWidth / aspectRatio;
        } else if (minCropBoxHeight) {
          minCropBoxWidth = minCropBoxHeight * aspectRatio;
        }

        if (maxCropBoxHeight * aspectRatio > maxCropBoxWidth) {
          maxCropBoxHeight = maxCropBoxWidth / aspectRatio;
        } else {
          maxCropBoxWidth = maxCropBoxHeight * aspectRatio;
        }
      }

      // The minWidth/Height must be less than maxWidth/Height
      cropBoxData.minWidth = Math.min(minCropBoxWidth, maxCropBoxWidth);
      cropBoxData.minHeight = Math.min(minCropBoxHeight, maxCropBoxHeight);
      cropBoxData.maxWidth = maxCropBoxWidth;
      cropBoxData.maxHeight = maxCropBoxHeight;
    }

    if (positionLimited) {
      if (limited) {
        cropBoxData.minLeft = Math.max(0, canvasData.left);
        cropBoxData.minTop = Math.max(0, canvasData.top);
        cropBoxData.maxLeft = Math.min(containerData.width, canvasData.left + canvasData.width) - cropBoxData.width;
        cropBoxData.maxTop = Math.min(containerData.height, canvasData.top + canvasData.height) - cropBoxData.height;
      } else {
        cropBoxData.minLeft = 0;
        cropBoxData.minTop = 0;
        cropBoxData.maxLeft = containerData.width - cropBoxData.width;
        cropBoxData.maxTop = containerData.height - cropBoxData.height;
      }
    }
  },
  renderCropBox: function renderCropBox() {
    var self = this;
    var options = self.options;
    var containerData = self.containerData;
    var cropBoxData = self.cropBoxData;

    if (cropBoxData.width > cropBoxData.maxWidth || cropBoxData.width < cropBoxData.minWidth) {
      cropBoxData.left = cropBoxData.oldLeft;
    }

    if (cropBoxData.height > cropBoxData.maxHeight || cropBoxData.height < cropBoxData.minHeight) {
      cropBoxData.top = cropBoxData.oldTop;
    }

    cropBoxData.width = Math.min(Math.max(cropBoxData.width, cropBoxData.minWidth), cropBoxData.maxWidth);
    cropBoxData.height = Math.min(Math.max(cropBoxData.height, cropBoxData.minHeight), cropBoxData.maxHeight);

    self.limitCropBox(false, true);

    cropBoxData.oldLeft = cropBoxData.left = Math.min(Math.max(cropBoxData.left, cropBoxData.minLeft), cropBoxData.maxLeft);
    cropBoxData.oldTop = cropBoxData.top = Math.min(Math.max(cropBoxData.top, cropBoxData.minTop), cropBoxData.maxTop);

    if (options.movable && options.cropBoxMovable) {
      // Turn to move the canvas when the crop box is equal to the container
      setData$1(self.face, 'action', cropBoxData.width === containerData.width && cropBoxData.height === containerData.height ? 'move' : 'all');
    }

    setStyle(self.cropBox, extend({
      width: cropBoxData.width,
      height: cropBoxData.height
    }, getTransforms({
      translateX: cropBoxData.left,
      translateY: cropBoxData.top
    })));

    if (self.cropped && self.limited) {
      self.limitCanvas(true, true);
    }

    if (!self.disabled) {
      self.output();
    }
  },
  output: function output() {
    var self = this;

    self.preview();

    if (self.complete) {
      dispatchEvent(self.element, 'crop', self.getData());
    }
  }
};

var DATA_PREVIEW = 'preview';

var preview$1 = {
  initPreview: function initPreview() {
    var self = this;
    var preview = self.options.preview;
    var image = createElement('img');
    var crossOrigin = self.crossOrigin;
    var url = crossOrigin ? self.crossOriginUrl : self.url;

    if (crossOrigin) {
      image.crossOrigin = crossOrigin;
    }

    image.src = url;
    appendChild(self.viewBox, image);
    self.image2 = image;

    if (!preview) {
      return;
    }

    var previews = preview.querySelector ? [preview] : document.querySelectorAll(preview);

    self.previews = previews;

    each(previews, function (element) {
      var img = createElement('img');

      // Save the original size for recover
      setData$1(element, DATA_PREVIEW, {
        width: element.offsetWidth,
        height: element.offsetHeight,
        html: element.innerHTML
      });

      if (crossOrigin) {
        img.crossOrigin = crossOrigin;
      }

      img.src = url;

      /**
       * Override img element styles
       * Add `display:block` to avoid margin top issue
       * Add `height:auto` to override `height` attribute on IE8
       * (Occur only when margin-top <= -height)
       */

      img.style.cssText = 'display:block;' + 'width:100%;' + 'height:auto;' + 'min-width:0!important;' + 'min-height:0!important;' + 'max-width:none!important;' + 'max-height:none!important;' + 'image-orientation:0deg!important;"';

      empty(element);
      appendChild(element, img);
    });
  },
  resetPreview: function resetPreview() {
    each(this.previews, function (element) {
      var data = getData$1(element, DATA_PREVIEW);

      setStyle(element, {
        width: data.width,
        height: data.height
      });

      element.innerHTML = data.html;
      removeData(element, DATA_PREVIEW);
    });
  },
  preview: function preview() {
    var self = this;
    var imageData = self.imageData;
    var canvasData = self.canvasData;
    var cropBoxData = self.cropBoxData;
    var cropBoxWidth = cropBoxData.width;
    var cropBoxHeight = cropBoxData.height;
    var width = imageData.width;
    var height = imageData.height;
    var left = cropBoxData.left - canvasData.left - imageData.left;
    var top = cropBoxData.top - canvasData.top - imageData.top;

    if (!self.cropped || self.disabled) {
      return;
    }

    setStyle(self.image2, extend({
      width: width,
      height: height
    }, getTransforms(extend({
      translateX: -left,
      translateY: -top
    }, imageData))));

    each(self.previews, function (element) {
      var data = getData$1(element, DATA_PREVIEW);
      var originalWidth = data.width;
      var originalHeight = data.height;
      var newWidth = originalWidth;
      var newHeight = originalHeight;
      var ratio = 1;

      if (cropBoxWidth) {
        ratio = originalWidth / cropBoxWidth;
        newHeight = cropBoxHeight * ratio;
      }

      if (cropBoxHeight && newHeight > originalHeight) {
        ratio = originalHeight / cropBoxHeight;
        newWidth = cropBoxWidth * ratio;
        newHeight = originalHeight;
      }

      setStyle(element, {
        width: newWidth,
        height: newHeight
      });

      setStyle(getByTag(element, 'img')[0], extend({
        width: width * ratio,
        height: height * ratio
      }, getTransforms(extend({
        translateX: -left * ratio,
        translateY: -top * ratio
      }, imageData))));
    });
  }
};

// Globals
var PointerEvent = typeof window !== 'undefined' ? window.PointerEvent : null;

// Events
var EVENT_POINTER_DOWN = PointerEvent ? 'pointerdown' : 'touchstart mousedown';
var EVENT_POINTER_MOVE = PointerEvent ? 'pointermove' : 'touchmove mousemove';
var EVENT_POINTER_UP = PointerEvent ? ' pointerup pointercancel' : 'touchend touchcancel mouseup';
var EVENT_WHEEL = 'wheel mousewheel DOMMouseScroll';
var EVENT_DBLCLICK = 'dblclick';
var EVENT_RESIZE = 'resize';
var EVENT_CROP_START = 'cropstart';
var EVENT_CROP_MOVE = 'cropmove';
var EVENT_CROP_END = 'cropend';
var EVENT_CROP$1 = 'crop';
var EVENT_ZOOM = 'zoom';

var events = {
  bind: function bind() {
    var self = this;
    var options = self.options;
    var element = self.element;
    var cropper = self.cropper;

    if (isFunction(options.cropstart)) {
      addListener(element, EVENT_CROP_START, options.cropstart);
    }

    if (isFunction(options.cropmove)) {
      addListener(element, EVENT_CROP_MOVE, options.cropmove);
    }

    if (isFunction(options.cropend)) {
      addListener(element, EVENT_CROP_END, options.cropend);
    }

    if (isFunction(options.crop)) {
      addListener(element, EVENT_CROP$1, options.crop);
    }

    if (isFunction(options.zoom)) {
      addListener(element, EVENT_ZOOM, options.zoom);
    }

    addListener(cropper, EVENT_POINTER_DOWN, self.onCropStart = proxy(self.cropStart, self));

    if (options.zoomable && options.zoomOnWheel) {
      addListener(cropper, EVENT_WHEEL, self.onWheel = proxy(self.wheel, self));
    }

    if (options.toggleDragModeOnDblclick) {
      addListener(cropper, EVENT_DBLCLICK, self.onDblclick = proxy(self.dblclick, self));
    }

    addListener(document, EVENT_POINTER_MOVE, self.onCropMove = proxy(self.cropMove, self));
    addListener(document, EVENT_POINTER_UP, self.onCropEnd = proxy(self.cropEnd, self));

    if (options.responsive) {
      addListener(window, EVENT_RESIZE, self.onResize = proxy(self.resize, self));
    }
  },
  unbind: function unbind() {
    var self = this;
    var options = self.options;
    var element = self.element;
    var cropper = self.cropper;

    if (isFunction(options.cropstart)) {
      removeListener(element, EVENT_CROP_START, options.cropstart);
    }

    if (isFunction(options.cropmove)) {
      removeListener(element, EVENT_CROP_MOVE, options.cropmove);
    }

    if (isFunction(options.cropend)) {
      removeListener(element, EVENT_CROP_END, options.cropend);
    }

    if (isFunction(options.crop)) {
      removeListener(element, EVENT_CROP$1, options.crop);
    }

    if (isFunction(options.zoom)) {
      removeListener(element, EVENT_ZOOM, options.zoom);
    }

    removeListener(cropper, EVENT_POINTER_DOWN, self.onCropStart);

    if (options.zoomable && options.zoomOnWheel) {
      removeListener(cropper, EVENT_WHEEL, self.onWheel);
    }

    if (options.toggleDragModeOnDblclick) {
      removeListener(cropper, EVENT_DBLCLICK, self.onDblclick);
    }

    removeListener(document, EVENT_POINTER_MOVE, self.onCropMove);
    removeListener(document, EVENT_POINTER_UP, self.onCropEnd);

    if (options.responsive) {
      removeListener(window, EVENT_RESIZE, self.onResize);
    }
  }
};

var REGEXP_ACTIONS = /^(e|w|s|n|se|sw|ne|nw|all|crop|move|zoom)$/;

function getPointer(_ref, endOnly) {
  var pageX = _ref.pageX,
      pageY = _ref.pageY;

  var end = {
    endX: pageX,
    endY: pageY
  };

  if (endOnly) {
    return end;
  }

  return extend({
    startX: pageX,
    startY: pageY
  }, end);
}

var handlers = {
  resize: function resize() {
    var self = this;
    var options = self.options;
    var container = self.container;
    var containerData = self.containerData;
    var minContainerWidth = Number(options.minContainerWidth) || 200;
    var minContainerHeight = Number(options.minContainerHeight) || 100;

    if (self.disabled || containerData.width === minContainerWidth || containerData.height === minContainerHeight) {
      return;
    }

    var ratio = container.offsetWidth / containerData.width;

    // Resize when width changed or height changed
    if (ratio !== 1 || container.offsetHeight !== containerData.height) {
      (function () {
        var canvasData = void 0;
        var cropBoxData = void 0;

        if (options.restore) {
          canvasData = self.getCanvasData();
          cropBoxData = self.getCropBoxData();
        }

        self.render();

        if (options.restore) {
          self.setCanvasData(each(canvasData, function (n, i) {
            canvasData[i] = n * ratio;
          }));
          self.setCropBoxData(each(cropBoxData, function (n, i) {
            cropBoxData[i] = n * ratio;
          }));
        }
      })();
    }
  },
  dblclick: function dblclick() {
    var self = this;

    if (self.disabled || self.options.dragMode === 'none') {
      return;
    }

    self.setDragMode(hasClass(self.dragBox, 'cropper-crop') ? 'move' : 'crop');
  },
  wheel: function wheel(event) {
    var self = this;
    var e = getEvent(event);
    var ratio = Number(self.options.wheelZoomRatio) || 0.1;
    var delta = 1;

    if (self.disabled) {
      return;
    }

    e.preventDefault();

    // Limit wheel speed to prevent zoom too fast (#21)
    if (self.wheeling) {
      return;
    }

    self.wheeling = true;

    setTimeout(function () {
      self.wheeling = false;
    }, 50);

    if (e.deltaY) {
      delta = e.deltaY > 0 ? 1 : -1;
    } else if (e.wheelDelta) {
      delta = -e.wheelDelta / 120;
    } else if (e.detail) {
      delta = e.detail > 0 ? 1 : -1;
    }

    self.zoom(-delta * ratio, e);
  },
  cropStart: function cropStart(event) {
    var self = this;

    if (self.disabled) {
      return;
    }

    var options = self.options;
    var pointers = self.pointers;
    var e = getEvent(event);
    var action = void 0;

    if (e.changedTouches) {
      // Handle touch event
      each(e.changedTouches, function (touch) {
        pointers[touch.identifier] = getPointer(touch);
      });
    } else {
      // Handle mouse event and pointer event
      pointers[e.pointerId || 0] = getPointer(e);
    }

    if (Object.keys(pointers).length > 1 && options.zoomable && options.zoomOnTouch) {
      action = 'zoom';
    } else {
      action = getData$1(e.target, 'action');
    }

    if (!REGEXP_ACTIONS.test(action)) {
      return;
    }

    if (dispatchEvent(self.element, 'cropstart', {
      originalEvent: e,
      action: action
    }) === false) {
      return;
    }

    e.preventDefault();

    self.action = action;
    self.cropping = false;

    if (action === 'crop') {
      self.cropping = true;
      addClass(self.dragBox, 'cropper-modal');
    }
  },
  cropMove: function cropMove(event) {
    var self = this;
    var action = self.action;

    if (self.disabled || !action) {
      return;
    }

    var pointers = self.pointers;
    var e = getEvent(event);

    e.preventDefault();

    if (dispatchEvent(self.element, 'cropmove', {
      originalEvent: e,
      action: action
    }) === false) {
      return;
    }

    if (e.changedTouches) {
      each(e.changedTouches, function (touch) {
        extend(pointers[touch.identifier], getPointer(touch, true));
      });
    } else {
      extend(pointers[e.pointerId || 0], getPointer(e, true));
    }

    self.change(e);
  },
  cropEnd: function cropEnd(event) {
    var self = this;

    if (self.disabled) {
      return;
    }

    var action = self.action;
    var pointers = self.pointers;
    var e = getEvent(event);

    if (e.changedTouches) {
      each(e.changedTouches, function (touch) {
        delete pointers[touch.identifier];
      });
    } else {
      delete pointers[e.pointerId || 0];
    }

    if (!action) {
      return;
    }

    e.preventDefault();

    if (!Object.keys(pointers).length) {
      self.action = '';
    }

    if (self.cropping) {
      self.cropping = false;
      toggleClass(self.dragBox, 'cropper-modal', self.cropped && this.options.modal);
    }

    dispatchEvent(self.element, 'cropend', {
      originalEvent: e,
      action: action
    });
  }
};

// Actions
var ACTION_EAST = 'e';
var ACTION_WEST = 'w';
var ACTION_SOUTH = 's';
var ACTION_NORTH = 'n';
var ACTION_SOUTH_EAST = 'se';
var ACTION_SOUTH_WEST = 'sw';
var ACTION_NORTH_EAST = 'ne';
var ACTION_NORTH_WEST = 'nw';

function getMaxZoomRatio(pointers) {
  var pointers2 = extend({}, pointers);
  var ratios = [];

  each(pointers, function (pointer, pointerId) {
    delete pointers2[pointerId];

    each(pointers2, function (pointer2) {
      var x1 = Math.abs(pointer.startX - pointer2.startX);
      var y1 = Math.abs(pointer.startY - pointer2.startY);
      var x2 = Math.abs(pointer.endX - pointer2.endX);
      var y2 = Math.abs(pointer.endY - pointer2.endY);
      var z1 = Math.sqrt(x1 * x1 + y1 * y1);
      var z2 = Math.sqrt(x2 * x2 + y2 * y2);
      var ratio = (z2 - z1) / z1;

      ratios.push(ratio);
    });
  });

  ratios.sort(function (a, b) {
    return Math.abs(a) < Math.abs(b);
  });

  return ratios[0];
}

var change$1 = {
  change: function change(e) {
    var self = this;
    var options = self.options;
    var containerData = self.containerData;
    var canvasData = self.canvasData;
    var cropBoxData = self.cropBoxData;
    var aspectRatio = options.aspectRatio;
    var action = self.action;
    var width = cropBoxData.width;
    var height = cropBoxData.height;
    var left = cropBoxData.left;
    var top = cropBoxData.top;
    var right = left + width;
    var bottom = top + height;
    var minLeft = 0;
    var minTop = 0;
    var maxWidth = containerData.width;
    var maxHeight = containerData.height;
    var renderable = true;
    var offset = void 0;

    // Locking aspect ratio in "free mode" by holding shift key
    if (!aspectRatio && e.shiftKey) {
      aspectRatio = width && height ? width / height : 1;
    }

    if (self.limited) {
      minLeft = cropBoxData.minLeft;
      minTop = cropBoxData.minTop;
      maxWidth = minLeft + Math.min(containerData.width, canvasData.width, canvasData.left + canvasData.width);
      maxHeight = minTop + Math.min(containerData.height, canvasData.height, canvasData.top + canvasData.height);
    }

    var pointers = self.pointers;
    var pointer = pointers[Object.keys(pointers)[0]];
    var range = {
      x: pointer.endX - pointer.startX,
      y: pointer.endY - pointer.startY
    };

    if (aspectRatio) {
      range.X = range.y * aspectRatio;
      range.Y = range.x / aspectRatio;
    }

    switch (action) {
      // Move crop box
      case 'all':
        left += range.x;
        top += range.y;
        break;

      // Resize crop box
      case ACTION_EAST:
        if (range.x >= 0 && (right >= maxWidth || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
          renderable = false;
          break;
        }

        width += range.x;

        if (aspectRatio) {
          height = width / aspectRatio;
          top -= range.Y / 2;
        }

        if (width < 0) {
          action = ACTION_WEST;
          width = 0;
        }

        break;

      case ACTION_NORTH:
        if (range.y <= 0 && (top <= minTop || aspectRatio && (left <= minLeft || right >= maxWidth))) {
          renderable = false;
          break;
        }

        height -= range.y;
        top += range.y;

        if (aspectRatio) {
          width = height * aspectRatio;
          left += range.X / 2;
        }

        if (height < 0) {
          action = ACTION_SOUTH;
          height = 0;
        }

        break;

      case ACTION_WEST:
        if (range.x <= 0 && (left <= minLeft || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
          renderable = false;
          break;
        }

        width -= range.x;
        left += range.x;

        if (aspectRatio) {
          height = width / aspectRatio;
          top += range.Y / 2;
        }

        if (width < 0) {
          action = ACTION_EAST;
          width = 0;
        }

        break;

      case ACTION_SOUTH:
        if (range.y >= 0 && (bottom >= maxHeight || aspectRatio && (left <= minLeft || right >= maxWidth))) {
          renderable = false;
          break;
        }

        height += range.y;

        if (aspectRatio) {
          width = height * aspectRatio;
          left -= range.X / 2;
        }

        if (height < 0) {
          action = ACTION_NORTH;
          height = 0;
        }

        break;

      case ACTION_NORTH_EAST:
        if (aspectRatio) {
          if (range.y <= 0 && (top <= minTop || right >= maxWidth)) {
            renderable = false;
            break;
          }

          height -= range.y;
          top += range.y;
          width = height * aspectRatio;
        } else {
          if (range.x >= 0) {
            if (right < maxWidth) {
              width += range.x;
            } else if (range.y <= 0 && top <= minTop) {
              renderable = false;
            }
          } else {
            width += range.x;
          }

          if (range.y <= 0) {
            if (top > minTop) {
              height -= range.y;
              top += range.y;
            }
          } else {
            height -= range.y;
            top += range.y;
          }
        }

        if (width < 0 && height < 0) {
          action = ACTION_SOUTH_WEST;
          height = 0;
          width = 0;
        } else if (width < 0) {
          action = ACTION_NORTH_WEST;
          width = 0;
        } else if (height < 0) {
          action = ACTION_SOUTH_EAST;
          height = 0;
        }

        break;

      case ACTION_NORTH_WEST:
        if (aspectRatio) {
          if (range.y <= 0 && (top <= minTop || left <= minLeft)) {
            renderable = false;
            break;
          }

          height -= range.y;
          top += range.y;
          width = height * aspectRatio;
          left += range.X;
        } else {
          if (range.x <= 0) {
            if (left > minLeft) {
              width -= range.x;
              left += range.x;
            } else if (range.y <= 0 && top <= minTop) {
              renderable = false;
            }
          } else {
            width -= range.x;
            left += range.x;
          }

          if (range.y <= 0) {
            if (top > minTop) {
              height -= range.y;
              top += range.y;
            }
          } else {
            height -= range.y;
            top += range.y;
          }
        }

        if (width < 0 && height < 0) {
          action = ACTION_SOUTH_EAST;
          height = 0;
          width = 0;
        } else if (width < 0) {
          action = ACTION_NORTH_EAST;
          width = 0;
        } else if (height < 0) {
          action = ACTION_SOUTH_WEST;
          height = 0;
        }

        break;

      case ACTION_SOUTH_WEST:
        if (aspectRatio) {
          if (range.x <= 0 && (left <= minLeft || bottom >= maxHeight)) {
            renderable = false;
            break;
          }

          width -= range.x;
          left += range.x;
          height = width / aspectRatio;
        } else {
          if (range.x <= 0) {
            if (left > minLeft) {
              width -= range.x;
              left += range.x;
            } else if (range.y >= 0 && bottom >= maxHeight) {
              renderable = false;
            }
          } else {
            width -= range.x;
            left += range.x;
          }

          if (range.y >= 0) {
            if (bottom < maxHeight) {
              height += range.y;
            }
          } else {
            height += range.y;
          }
        }

        if (width < 0 && height < 0) {
          action = ACTION_NORTH_EAST;
          height = 0;
          width = 0;
        } else if (width < 0) {
          action = ACTION_SOUTH_EAST;
          width = 0;
        } else if (height < 0) {
          action = ACTION_NORTH_WEST;
          height = 0;
        }

        break;

      case ACTION_SOUTH_EAST:
        if (aspectRatio) {
          if (range.x >= 0 && (right >= maxWidth || bottom >= maxHeight)) {
            renderable = false;
            break;
          }

          width += range.x;
          height = width / aspectRatio;
        } else {
          if (range.x >= 0) {
            if (right < maxWidth) {
              width += range.x;
            } else if (range.y >= 0 && bottom >= maxHeight) {
              renderable = false;
            }
          } else {
            width += range.x;
          }

          if (range.y >= 0) {
            if (bottom < maxHeight) {
              height += range.y;
            }
          } else {
            height += range.y;
          }
        }

        if (width < 0 && height < 0) {
          action = ACTION_NORTH_WEST;
          height = 0;
          width = 0;
        } else if (width < 0) {
          action = ACTION_SOUTH_WEST;
          width = 0;
        } else if (height < 0) {
          action = ACTION_NORTH_EAST;
          height = 0;
        }

        break;

      // Move canvas
      case 'move':
        self.move(range.x, range.y);
        renderable = false;
        break;

      // Zoom canvas
      case 'zoom':
        self.zoom(getMaxZoomRatio(pointers), e);
        renderable = false;
        break;

      // Create crop box
      case 'crop':
        if (!range.x || !range.y) {
          renderable = false;
          break;
        }

        offset = getOffset(self.cropper);
        left = pointer.startX - offset.left;
        top = pointer.startY - offset.top;
        width = cropBoxData.minWidth;
        height = cropBoxData.minHeight;

        if (range.x > 0) {
          action = range.y > 0 ? ACTION_SOUTH_EAST : ACTION_NORTH_EAST;
        } else if (range.x < 0) {
          left -= width;
          action = range.y > 0 ? ACTION_SOUTH_WEST : ACTION_NORTH_WEST;
        }

        if (range.y < 0) {
          top -= height;
        }

        // Show the crop box if is hidden
        if (!self.cropped) {
          removeClass(self.cropBox, 'cropper-hidden');
          self.cropped = true;

          if (self.limited) {
            self.limitCropBox(true, true);
          }
        }

        break;

      // No default
    }

    if (renderable) {
      cropBoxData.width = width;
      cropBoxData.height = height;
      cropBoxData.left = left;
      cropBoxData.top = top;
      self.action = action;

      self.renderCropBox();
    }

    // Override
    each(pointers, function (p) {
      p.startX = p.endX;
      p.startY = p.endY;
    });
  }
};

function getPointersCenter(pointers) {
  var pageX = 0;
  var pageY = 0;
  var count = 0;

  each(pointers, function (_ref) {
    var startX = _ref.startX,
        startY = _ref.startY;

    pageX += startX;
    pageY += startY;
    count += 1;
  });

  pageX /= count;
  pageY /= count;

  return {
    pageX: pageX,
    pageY: pageY
  };
}

var methods = {
  // Show the crop box manually
  crop: function crop() {
    var self = this;

    if (self.ready && !self.disabled) {
      if (!self.cropped) {
        self.cropped = true;
        self.limitCropBox(true, true);

        if (self.options.modal) {
          addClass(self.dragBox, 'cropper-modal');
        }

        removeClass(self.cropBox, 'cropper-hidden');
      }

      self.setCropBoxData(self.initialCropBoxData);
    }

    return self;
  },


  // Reset the image and crop box to their initial states
  reset: function reset() {
    var self = this;

    if (self.ready && !self.disabled) {
      self.imageData = extend({}, self.initialImageData);
      self.canvasData = extend({}, self.initialCanvasData);
      self.cropBoxData = extend({}, self.initialCropBoxData);

      self.renderCanvas();

      if (self.cropped) {
        self.renderCropBox();
      }
    }

    return self;
  },


  // Clear the crop box
  clear: function clear() {
    var self = this;

    if (self.cropped && !self.disabled) {
      extend(self.cropBoxData, {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      });

      self.cropped = false;
      self.renderCropBox();

      self.limitCanvas();

      // Render canvas after crop box rendered
      self.renderCanvas();

      removeClass(self.dragBox, 'cropper-modal');
      addClass(self.cropBox, 'cropper-hidden');
    }

    return self;
  },


  /**
   * Replace the image's src and rebuild the cropper
   *
   * @param {String} url
   * @param {Boolean} onlyColorChanged (optional)
   */
  replace: function replace(url, onlyColorChanged) {
    var self = this;

    if (!self.disabled && url) {
      if (self.isImg) {
        self.element.src = url;
      }

      if (onlyColorChanged) {
        self.url = url;
        self.image.src = url;

        if (self.ready) {
          self.image2.src = url;

          each(self.previews, function (element) {
            getByTag(element, 'img')[0].src = url;
          });
        }
      } else {
        if (self.isImg) {
          self.replaced = true;
        }

        // Clear previous data
        self.options.data = null;
        self.load(url);
      }
    }

    return self;
  },


  // Enable (unfreeze) the cropper
  enable: function enable() {
    var self = this;

    if (self.ready) {
      self.disabled = false;
      removeClass(self.cropper, 'cropper-disabled');
    }

    return self;
  },


  // Disable (freeze) the cropper
  disable: function disable() {
    var self = this;

    if (self.ready) {
      self.disabled = true;
      addClass(self.cropper, 'cropper-disabled');
    }

    return self;
  },


  // Destroy the cropper and remove the instance from the image
  destroy: function destroy() {
    var self = this;
    var element = self.element;
    var image = self.image;

    if (self.loaded) {
      if (self.isImg && self.replaced) {
        element.src = self.originalUrl;
      }

      self.unbuild();
      removeClass(element, 'cropper-hidden');
    } else if (self.isImg) {
      removeListener(element, 'load', self.onStart);
    } else if (image) {
      removeChild(image);
    }

    removeData(element, 'cropper');

    return self;
  },


  /**
   * Move the canvas with relative offsets
   *
   * @param {Number} offsetX
   * @param {Number} offsetY (optional)
   */
  move: function move(offsetX, offsetY) {
    var self = this;
    var canvasData = self.canvasData;

    return self.moveTo(isUndefined(offsetX) ? offsetX : canvasData.left + Number(offsetX), isUndefined(offsetY) ? offsetY : canvasData.top + Number(offsetY));
  },


  /**
   * Move the canvas to an absolute point
   *
   * @param {Number} x
   * @param {Number} y (optional)
   */
  moveTo: function moveTo(x, y) {
    var self = this;
    var canvasData = self.canvasData;
    var changed = false;

    // If "y" is not present, its default value is "x"
    if (isUndefined(y)) {
      y = x;
    }

    x = Number(x);
    y = Number(y);

    if (self.ready && !self.disabled && self.options.movable) {
      if (isNumber(x)) {
        canvasData.left = x;
        changed = true;
      }

      if (isNumber(y)) {
        canvasData.top = y;
        changed = true;
      }

      if (changed) {
        self.renderCanvas(true);
      }
    }

    return self;
  },


  /**
   * Zoom the canvas with a relative ratio
   *
   * @param {Number} ratio
   * @param {Event} _originalEvent (private)
   */
  zoom: function zoom(ratio, _originalEvent) {
    var self = this;
    var canvasData = self.canvasData;

    ratio = Number(ratio);

    if (ratio < 0) {
      ratio = 1 / (1 - ratio);
    } else {
      ratio = 1 + ratio;
    }

    return self.zoomTo(canvasData.width * ratio / canvasData.naturalWidth, _originalEvent);
  },


  /**
   * Zoom the canvas to an absolute ratio
   *
   * @param {Number} ratio
   * @param {Event} _originalEvent (private)
   */
  zoomTo: function zoomTo(ratio, _originalEvent) {
    var self = this;
    var options = self.options;
    var canvasData = self.canvasData;
    var width = canvasData.width;
    var height = canvasData.height;
    var naturalWidth = canvasData.naturalWidth;
    var naturalHeight = canvasData.naturalHeight;

    ratio = Number(ratio);

    if (ratio >= 0 && self.ready && !self.disabled && options.zoomable) {
      var newWidth = naturalWidth * ratio;
      var newHeight = naturalHeight * ratio;

      if (dispatchEvent(self.element, 'zoom', {
        originalEvent: _originalEvent,
        oldRatio: width / naturalWidth,
        ratio: newWidth / naturalWidth
      }) === false) {
        return self;
      }

      if (_originalEvent) {
        var pointers = self.pointers;
        var offset = getOffset(self.cropper);
        var center = pointers && Object.keys(pointers).length ? getPointersCenter(pointers) : {
          pageX: _originalEvent.pageX,
          pageY: _originalEvent.pageY
        };

        // Zoom from the triggering point of the event
        canvasData.left -= (newWidth - width) * ((center.pageX - offset.left - canvasData.left) / width);
        canvasData.top -= (newHeight - height) * ((center.pageY - offset.top - canvasData.top) / height);
      } else {
        // Zoom from the center of the canvas
        canvasData.left -= (newWidth - width) / 2;
        canvasData.top -= (newHeight - height) / 2;
      }

      canvasData.width = newWidth;
      canvasData.height = newHeight;
      self.renderCanvas(true);
    }

    return self;
  },


  /**
   * Rotate the canvas with a relative degree
   *
   * @param {Number} degree
   */
  rotate: function rotate(degree) {
    var self = this;

    return self.rotateTo((self.imageData.rotate || 0) + Number(degree));
  },


  /**
   * Rotate the canvas to an absolute degree
   * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function#rotate()
   *
   * @param {Number} degree
   */
  rotateTo: function rotateTo(degree) {
    var self = this;

    degree = Number(degree);

    if (isNumber(degree) && self.ready && !self.disabled && self.options.rotatable) {
      self.imageData.rotate = degree % 360;
      self.rotated = true;
      self.renderCanvas(true);
    }

    return self;
  },


  /**
   * Scale the image
   * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function#scale()
   *
   * @param {Number} scaleX
   * @param {Number} scaleY (optional)
   */
  scale: function scale(scaleX, scaleY) {
    var self = this;
    var imageData = self.imageData;
    var changed = false;

    // If "scaleY" is not present, its default value is "scaleX"
    if (isUndefined(scaleY)) {
      scaleY = scaleX;
    }

    scaleX = Number(scaleX);
    scaleY = Number(scaleY);

    if (self.ready && !self.disabled && self.options.scalable) {
      if (isNumber(scaleX)) {
        imageData.scaleX = scaleX;
        changed = true;
      }

      if (isNumber(scaleY)) {
        imageData.scaleY = scaleY;
        changed = true;
      }

      if (changed) {
        self.renderImage(true);
      }
    }

    return self;
  },


  /**
   * Scale the abscissa of the image
   *
   * @param {Number} scaleX
   */
  scaleX: function scaleX(_scaleX) {
    var self = this;
    var scaleY = self.imageData.scaleY;

    return self.scale(_scaleX, isNumber(scaleY) ? scaleY : 1);
  },


  /**
   * Scale the ordinate of the image
   *
   * @param {Number} scaleY
   */
  scaleY: function scaleY(_scaleY) {
    var self = this;
    var scaleX = self.imageData.scaleX;

    return self.scale(isNumber(scaleX) ? scaleX : 1, _scaleY);
  },


  /**
   * Get the cropped area position and size data (base on the original image)
   *
   * @param {Boolean} rounded (optional)
   * @return {Object} data
   */
  getData: function getData(rounded) {
    var self = this;
    var options = self.options;
    var imageData = self.imageData;
    var canvasData = self.canvasData;
    var cropBoxData = self.cropBoxData;
    var ratio = void 0;
    var data = void 0;

    if (self.ready && self.cropped) {
      data = {
        x: cropBoxData.left - canvasData.left,
        y: cropBoxData.top - canvasData.top,
        width: cropBoxData.width,
        height: cropBoxData.height
      };

      ratio = imageData.width / imageData.naturalWidth;

      each(data, function (n, i) {
        n /= ratio;
        data[i] = rounded ? Math.round(n) : n;
      });
    } else {
      data = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    }

    if (options.rotatable) {
      data.rotate = imageData.rotate || 0;
    }

    if (options.scalable) {
      data.scaleX = imageData.scaleX || 1;
      data.scaleY = imageData.scaleY || 1;
    }

    return data;
  },


  /**
   * Set the cropped area position and size with new data
   *
   * @param {Object} data
   */
  setData: function setData(data) {
    var self = this;
    var options = self.options;
    var imageData = self.imageData;
    var canvasData = self.canvasData;
    var cropBoxData = {};
    var rotated = void 0;
    var scaled = void 0;
    var ratio = void 0;

    if (isFunction(data)) {
      data = data.call(self.element);
    }

    if (self.ready && !self.disabled && isPlainObject(data)) {
      if (options.rotatable) {
        if (isNumber(data.rotate) && data.rotate !== imageData.rotate) {
          imageData.rotate = data.rotate;
          self.rotated = rotated = true;
        }
      }

      if (options.scalable) {
        if (isNumber(data.scaleX) && data.scaleX !== imageData.scaleX) {
          imageData.scaleX = data.scaleX;
          scaled = true;
        }

        if (isNumber(data.scaleY) && data.scaleY !== imageData.scaleY) {
          imageData.scaleY = data.scaleY;
          scaled = true;
        }
      }

      if (rotated) {
        self.renderCanvas();
      } else if (scaled) {
        self.renderImage();
      }

      ratio = imageData.width / imageData.naturalWidth;

      if (isNumber(data.x)) {
        cropBoxData.left = data.x * ratio + canvasData.left;
      }

      if (isNumber(data.y)) {
        cropBoxData.top = data.y * ratio + canvasData.top;
      }

      if (isNumber(data.width)) {
        cropBoxData.width = data.width * ratio;
      }

      if (isNumber(data.height)) {
        cropBoxData.height = data.height * ratio;
      }

      self.setCropBoxData(cropBoxData);
    }

    return self;
  },


  /**
   * Get the container size data
   *
   * @return {Object} data
   */
  getContainerData: function getContainerData() {
    var self = this;

    return self.ready ? self.containerData : {};
  },


  /**
   * Get the image position and size data
   *
   * @return {Object} data
   */
  getImageData: function getImageData() {
    var self = this;

    return self.loaded ? self.imageData : {};
  },


  /**
   * Get the canvas position and size data
   *
   * @return {Object} data
   */
  getCanvasData: function getCanvasData() {
    var self = this;
    var canvasData = self.canvasData;
    var data = {};

    if (self.ready) {
      each(['left', 'top', 'width', 'height', 'naturalWidth', 'naturalHeight'], function (n) {
        data[n] = canvasData[n];
      });
    }

    return data;
  },


  /**
   * Set the canvas position and size with new data
   *
   * @param {Object} data
   */
  setCanvasData: function setCanvasData(data) {
    var self = this;
    var canvasData = self.canvasData;
    var aspectRatio = canvasData.aspectRatio;

    if (isFunction(data)) {
      data = data.call(self.element);
    }

    if (self.ready && !self.disabled && isPlainObject(data)) {
      if (isNumber(data.left)) {
        canvasData.left = data.left;
      }

      if (isNumber(data.top)) {
        canvasData.top = data.top;
      }

      if (isNumber(data.width)) {
        canvasData.width = data.width;
        canvasData.height = data.width / aspectRatio;
      } else if (isNumber(data.height)) {
        canvasData.height = data.height;
        canvasData.width = data.height * aspectRatio;
      }

      self.renderCanvas(true);
    }

    return self;
  },


  /**
   * Get the crop box position and size data
   *
   * @return {Object} data
   */
  getCropBoxData: function getCropBoxData() {
    var self = this;
    var cropBoxData = self.cropBoxData;
    var data = void 0;

    if (self.ready && self.cropped) {
      data = {
        left: cropBoxData.left,
        top: cropBoxData.top,
        width: cropBoxData.width,
        height: cropBoxData.height
      };
    }

    return data || {};
  },


  /**
   * Set the crop box position and size with new data
   *
   * @param {Object} data
   */
  setCropBoxData: function setCropBoxData(data) {
    var self = this;
    var cropBoxData = self.cropBoxData;
    var aspectRatio = self.options.aspectRatio;
    var widthChanged = void 0;
    var heightChanged = void 0;

    if (isFunction(data)) {
      data = data.call(self.element);
    }

    if (self.ready && self.cropped && !self.disabled && isPlainObject(data)) {
      if (isNumber(data.left)) {
        cropBoxData.left = data.left;
      }

      if (isNumber(data.top)) {
        cropBoxData.top = data.top;
      }

      if (isNumber(data.width) && data.width !== cropBoxData.width) {
        widthChanged = true;
        cropBoxData.width = data.width;
      }

      if (isNumber(data.height) && data.height !== cropBoxData.height) {
        heightChanged = true;
        cropBoxData.height = data.height;
      }

      if (aspectRatio) {
        if (widthChanged) {
          cropBoxData.height = cropBoxData.width / aspectRatio;
        } else if (heightChanged) {
          cropBoxData.width = cropBoxData.height * aspectRatio;
        }
      }

      self.renderCropBox();
    }

    return self;
  },


  /**
   * Get a canvas drawn the cropped image
   *
   * @param {Object} options (optional)
   * @return {HTMLCanvasElement} canvas
   */
  getCroppedCanvas: function getCroppedCanvas(options) {
    var self = this;

    if (!self.ready || !window.HTMLCanvasElement) {
      return null;
    }

    if (!isPlainObject(options)) {
      options = {};
    }

    // Return the whole canvas if not cropped
    if (!self.cropped) {
      return getSourceCanvas(self.image, self.imageData, options);
    }

    var data = self.getData();
    var originalWidth = data.width;
    var originalHeight = data.height;
    var aspectRatio = originalWidth / originalHeight;
    var scaledWidth = void 0;
    var scaledHeight = void 0;
    var scaledRatio = void 0;

    if (isPlainObject(options)) {
      scaledWidth = options.width;
      scaledHeight = options.height;

      if (scaledWidth) {
        scaledHeight = scaledWidth / aspectRatio;
        scaledRatio = scaledWidth / originalWidth;
      } else if (scaledHeight) {
        scaledWidth = scaledHeight * aspectRatio;
        scaledRatio = scaledHeight / originalHeight;
      }
    }

    // The canvas element will use `Math.floor` on a float number, so floor first
    var canvasWidth = Math.floor(scaledWidth || originalWidth);
    var canvasHeight = Math.floor(scaledHeight || originalHeight);

    var canvas = createElement('canvas');
    var context = canvas.getContext('2d');

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    if (options.fillColor) {
      context.fillStyle = options.fillColor;
      context.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.drawImage
    var parameters = function () {
      var source = getSourceCanvas(self.image, self.imageData, options);
      var sourceWidth = source.width;
      var sourceHeight = source.height;
      var canvasData = self.canvasData;
      var params = [source];

      // Source canvas
      var srcX = data.x + canvasData.naturalWidth * (Math.abs(data.scaleX || 1) - 1) / 2;
      var srcY = data.y + canvasData.naturalHeight * (Math.abs(data.scaleY || 1) - 1) / 2;
      var srcWidth = void 0;
      var srcHeight = void 0;

      // Destination canvas
      var dstX = void 0;
      var dstY = void 0;
      var dstWidth = void 0;
      var dstHeight = void 0;

      if (srcX <= -originalWidth || srcX > sourceWidth) {
        srcX = srcWidth = dstX = dstWidth = 0;
      } else if (srcX <= 0) {
        dstX = -srcX;
        srcX = 0;
        srcWidth = dstWidth = Math.min(sourceWidth, originalWidth + srcX);
      } else if (srcX <= sourceWidth) {
        dstX = 0;
        srcWidth = dstWidth = Math.min(originalWidth, sourceWidth - srcX);
      }

      if (srcWidth <= 0 || srcY <= -originalHeight || srcY > sourceHeight) {
        srcY = srcHeight = dstY = dstHeight = 0;
      } else if (srcY <= 0) {
        dstY = -srcY;
        srcY = 0;
        srcHeight = dstHeight = Math.min(sourceHeight, originalHeight + srcY);
      } else if (srcY <= sourceHeight) {
        dstY = 0;
        srcHeight = dstHeight = Math.min(originalHeight, sourceHeight - srcY);
      }

      params.push(Math.floor(srcX), Math.floor(srcY), Math.floor(srcWidth), Math.floor(srcHeight));

      // Scale destination sizes
      if (scaledRatio) {
        dstX *= scaledRatio;
        dstY *= scaledRatio;
        dstWidth *= scaledRatio;
        dstHeight *= scaledRatio;
      }

      // Avoid "IndexSizeError" in IE and Firefox
      if (dstWidth > 0 && dstHeight > 0) {
        params.push(Math.floor(dstX), Math.floor(dstY), Math.floor(dstWidth), Math.floor(dstHeight));
      }

      return params;
    }();

    context.imageSmoothingEnabled = !!options.imageSmoothingEnabled;

    if (options.imageSmoothingQuality) {
      context.imageSmoothingQuality = options.imageSmoothingQuality;
    }

    context.drawImage.apply(context, toConsumableArray(parameters));

    return canvas;
  },


  /**
   * Change the aspect ratio of the crop box
   *
   * @param {Number} aspectRatio
   */
  setAspectRatio: function setAspectRatio(aspectRatio) {
    var self = this;
    var options = self.options;

    if (!self.disabled && !isUndefined(aspectRatio)) {
      // 0 -> NaN
      options.aspectRatio = Math.max(0, aspectRatio) || NaN;

      if (self.ready) {
        self.initCropBox();

        if (self.cropped) {
          self.renderCropBox();
        }
      }
    }

    return self;
  },


  /**
   * Change the drag mode
   *
   * @param {String} mode (optional)
   */
  setDragMode: function setDragMode(mode) {
    var self = this;
    var options = self.options;
    var dragBox = self.dragBox;
    var face = self.face;
    var croppable = void 0;
    var movable = void 0;

    if (self.loaded && !self.disabled) {
      croppable = mode === 'crop';
      movable = options.movable && mode === 'move';
      mode = croppable || movable ? mode : 'none';

      setData$1(dragBox, 'action', mode);
      toggleClass(dragBox, 'cropper-crop', croppable);
      toggleClass(dragBox, 'cropper-move', movable);

      if (!options.cropBoxMovable) {
        // Sync drag mode to crop box when it is not movable
        setData$1(face, 'action', mode);
        toggleClass(face, 'cropper-crop', croppable);
        toggleClass(face, 'cropper-move', movable);
      }
    }

    return self;
  }
};

// Constants
var NAMESPACE = 'cropper';

// Classes
var CLASS_HIDDEN = NAMESPACE + '-hidden';

// Events
var EVENT_ERROR = 'error';
var EVENT_LOAD = 'load';
var EVENT_READY = 'ready';
var EVENT_CROP = 'crop';

// RegExps
var REGEXP_DATA_URL = /^data:/;
var REGEXP_DATA_URL_JPEG = /^data:image\/jpeg;base64,/;

var AnotherCropper = void 0;

var Cropper = function () {
  function Cropper(element, options) {
    classCallCheck(this, Cropper);

    var self = this;

    self.element = element;
    self.options = extend({}, DEFAULTS, isPlainObject(options) && options);
    self.loaded = false;
    self.ready = false;
    self.complete = false;
    self.rotated = false;
    self.cropped = false;
    self.disabled = false;
    self.replaced = false;
    self.limited = false;
    self.wheeling = false;
    self.isImg = false;
    self.originalUrl = '';
    self.canvasData = null;
    self.cropBoxData = null;
    self.previews = null;
    self.pointers = {};
    self.init();
  }

  createClass(Cropper, [{
    key: 'init',
    value: function init() {
      var self = this;
      var element = self.element;
      var tagName = element.tagName.toLowerCase();
      var url = void 0;

      if (getData$1(element, NAMESPACE)) {
        return;
      }

      setData$1(element, NAMESPACE, self);

      if (tagName === 'img') {
        self.isImg = true;

        // e.g.: "img/picture.jpg"
        self.originalUrl = url = element.getAttribute('src');

        // Stop when it's a blank image
        if (!url) {
          return;
        }

        // e.g.: "http://example.com/img/picture.jpg"
        url = element.src;
      } else if (tagName === 'canvas' && window.HTMLCanvasElement) {
        url = element.toDataURL();
      }

      self.load(url);
    }
  }, {
    key: 'load',
    value: function load(url) {
      var self = this;
      var options = self.options;
      var element = self.element;

      if (!url) {
        return;
      }

      self.url = url;
      self.imageData = {};

      if (!options.checkOrientation || !window.ArrayBuffer) {
        self.clone();
        return;
      }

      // XMLHttpRequest disallows to open a Data URL in some browsers like IE11 and Safari
      if (REGEXP_DATA_URL.test(url)) {
        if (REGEXP_DATA_URL_JPEG.test(url)) {
          self.read(dataURLToArrayBuffer(url));
        } else {
          self.clone();
        }
        return;
      }

      var xhr = new XMLHttpRequest();

      xhr.onerror = xhr.onabort = function () {
        self.clone();
      };

      xhr.onload = function () {
        self.read(xhr.response);
      };

      if (options.checkCrossOrigin && isCrossOriginURL(url) && element.crossOrigin) {
        url = addTimestamp(url);
      }

      xhr.open('get', url);
      xhr.responseType = 'arraybuffer';
      xhr.withCredentials = element.crossOrigin === 'use-credentials';
      xhr.send();
    }
  }, {
    key: 'read',
    value: function read(arrayBuffer) {
      var self = this;
      var options = self.options;
      var orientation = getOrientation(arrayBuffer);
      var imageData = self.imageData;
      var rotate = 0;
      var scaleX = 1;
      var scaleY = 1;

      if (orientation > 1) {
        self.url = arrayBufferToDataURL(arrayBuffer);

        switch (orientation) {

          // flip horizontal
          case 2:
            scaleX = -1;
            break;

          // rotate left 180°
          case 3:
            rotate = -180;
            break;

          // flip vertical
          case 4:
            scaleY = -1;
            break;

          // flip vertical + rotate right 90°
          case 5:
            rotate = 90;
            scaleY = -1;
            break;

          // rotate right 90°
          case 6:
            rotate = 90;
            break;

          // flip horizontal + rotate right 90°
          case 7:
            rotate = 90;
            scaleX = -1;
            break;

          // rotate left 90°
          case 8:
            rotate = -90;
            break;
        }
      }

      if (options.rotatable) {
        imageData.rotate = rotate;
      }

      if (options.scalable) {
        imageData.scaleX = scaleX;
        imageData.scaleY = scaleY;
      }

      self.clone();
    }
  }, {
    key: 'clone',
    value: function clone() {
      var self = this;
      var element = self.element;
      var url = self.url;
      var crossOrigin = void 0;
      var crossOriginUrl = void 0;
      var start = void 0;
      var stop = void 0;

      if (self.options.checkCrossOrigin && isCrossOriginURL(url)) {
        crossOrigin = element.crossOrigin;

        if (crossOrigin) {
          crossOriginUrl = url;
        } else {
          crossOrigin = 'anonymous';

          // Bust cache when there is not a "crossOrigin" property
          crossOriginUrl = addTimestamp(url);
        }
      }

      self.crossOrigin = crossOrigin;
      self.crossOriginUrl = crossOriginUrl;

      var image = createElement('img');

      if (crossOrigin) {
        image.crossOrigin = crossOrigin;
      }

      image.src = crossOriginUrl || url;
      self.image = image;
      self.onStart = start = proxy(self.start, self);
      self.onStop = stop = proxy(self.stop, self);

      if (self.isImg) {
        if (element.complete) {
          self.start();
        } else {
          addListener(element, EVENT_LOAD, start);
        }
      } else {
        addListener(image, EVENT_LOAD, start);
        addListener(image, EVENT_ERROR, stop);
        addClass(image, 'cropper-hide');
        element.parentNode.insertBefore(image, element.nextSibling);
      }
    }
  }, {
    key: 'start',
    value: function start(event) {
      var self = this;
      var image = self.isImg ? self.element : self.image;

      if (event) {
        removeListener(image, EVENT_LOAD, self.onStart);
        removeListener(image, EVENT_ERROR, self.onStop);
      }

      getImageSize(image, function (naturalWidth, naturalHeight) {
        extend(self.imageData, {
          naturalWidth: naturalWidth,
          naturalHeight: naturalHeight,
          aspectRatio: naturalWidth / naturalHeight
        });

        self.loaded = true;
        self.build();
      });
    }
  }, {
    key: 'stop',
    value: function stop() {
      var self = this;
      var image = self.image;

      removeListener(image, EVENT_LOAD, self.onStart);
      removeListener(image, EVENT_ERROR, self.onStop);

      removeChild(image);
      self.image = null;
    }
  }, {
    key: 'build',
    value: function build() {
      var self = this;
      var options = self.options;
      var element = self.element;
      var image = self.image;
      var container = void 0;
      var cropper = void 0;
      var canvas = void 0;
      var dragBox = void 0;
      var cropBox = void 0;
      var face = void 0;

      if (!self.loaded) {
        return;
      }

      // Unbuild first when replace
      if (self.ready) {
        self.unbuild();
      }

      var template = createElement('div');
      template.innerHTML = TEMPLATE;

      // Create cropper elements
      self.container = container = element.parentNode;
      self.cropper = cropper = getByClass(template, 'cropper-container')[0];
      self.canvas = canvas = getByClass(cropper, 'cropper-canvas')[0];
      self.dragBox = dragBox = getByClass(cropper, 'cropper-drag-box')[0];
      self.cropBox = cropBox = getByClass(cropper, 'cropper-crop-box')[0];
      self.viewBox = getByClass(cropper, 'cropper-view-box')[0];
      self.face = face = getByClass(cropBox, 'cropper-face')[0];

      appendChild(canvas, image);

      // Hide the original image
      addClass(element, CLASS_HIDDEN);

      // Inserts the cropper after to the current image
      container.insertBefore(cropper, element.nextSibling);

      // Show the image if is hidden
      if (!self.isImg) {
        removeClass(image, 'cropper-hide');
      }

      self.initPreview();
      self.bind();

      options.aspectRatio = Math.max(0, options.aspectRatio) || NaN;
      options.viewMode = Math.max(0, Math.min(3, Math.round(options.viewMode))) || 0;

      self.cropped = options.autoCrop;

      if (options.autoCrop) {
        if (options.modal) {
          addClass(dragBox, 'cropper-modal');
        }
      } else {
        addClass(cropBox, CLASS_HIDDEN);
      }

      if (!options.guides) {
        addClass(getByClass(cropBox, 'cropper-dashed'), CLASS_HIDDEN);
      }

      if (!options.center) {
        addClass(getByClass(cropBox, 'cropper-center'), CLASS_HIDDEN);
      }

      if (options.background) {
        addClass(cropper, 'cropper-bg');
      }

      if (!options.highlight) {
        addClass(face, 'cropper-invisible');
      }

      if (options.cropBoxMovable) {
        addClass(face, 'cropper-move');
        setData$1(face, 'action', 'all');
      }

      if (!options.cropBoxResizable) {
        addClass(getByClass(cropBox, 'cropper-line'), CLASS_HIDDEN);
        addClass(getByClass(cropBox, 'cropper-point'), CLASS_HIDDEN);
      }

      self.setDragMode(options.dragMode);
      self.render();
      self.ready = true;
      self.setData(options.data);

      // Call the "ready" option asynchronously to keep "image.cropper" is defined
      self.completing = setTimeout(function () {
        if (isFunction(options.ready)) {
          addListener(element, EVENT_READY, options.ready, true);
        }

        dispatchEvent(element, EVENT_READY);
        dispatchEvent(element, EVENT_CROP, self.getData());

        self.complete = true;
      }, 0);
    }
  }, {
    key: 'unbuild',
    value: function unbuild() {
      var self = this;

      if (!self.ready) {
        return;
      }

      if (!self.complete) {
        clearTimeout(self.completing);
      }

      self.ready = false;
      self.complete = false;
      self.initialImageData = null;

      // Clear `initialCanvasData` is necessary when replace
      self.initialCanvasData = null;
      self.initialCropBoxData = null;
      self.containerData = null;
      self.canvasData = null;

      // Clear `cropBoxData` is necessary when replace
      self.cropBoxData = null;
      self.unbind();

      self.resetPreview();
      self.previews = null;

      self.viewBox = null;
      self.cropBox = null;
      self.dragBox = null;
      self.canvas = null;
      self.container = null;

      removeChild(self.cropper);
      self.cropper = null;
    }
  }], [{
    key: 'noConflict',
    value: function noConflict() {
      window.Cropper = AnotherCropper;
      return Cropper;
    }
  }, {
    key: 'setDefaults',
    value: function setDefaults(options) {
      extend(DEFAULTS, isPlainObject(options) && options);
    }
  }]);
  return Cropper;
}();

extend(Cropper.prototype, render$1);
extend(Cropper.prototype, preview$1);
extend(Cropper.prototype, events);
extend(Cropper.prototype, handlers);
extend(Cropper.prototype, change$1);
extend(Cropper.prototype, methods);

if (typeof window !== 'undefined') {
  AnotherCropper = window.Cropper;
  window.Cropper = Cropper;
}

return Cropper;

})));


/***/ }),

/***/ "./node_modules/fbjs/lib/emptyFunction.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),

/***/ "./node_modules/fbjs/lib/invariant.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (true) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),

/***/ "./node_modules/fbjs/lib/warning.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__("./node_modules/fbjs/lib/emptyFunction.js");

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (true) {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;

/***/ }),

/***/ "./node_modules/object-assign/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  var invariant = __webpack_require__("./node_modules/fbjs/lib/invariant.js");
  var warning = __webpack_require__("./node_modules/fbjs/lib/warning.js");
  var ReactPropTypesSecret = __webpack_require__("./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__("./node_modules/fbjs/lib/emptyFunction.js");
var invariant = __webpack_require__("./node_modules/fbjs/lib/invariant.js");
var warning = __webpack_require__("./node_modules/fbjs/lib/warning.js");
var assign = __webpack_require__("./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__("./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var checkPropTypes = __webpack_require__("./node_modules/prop-types/checkPropTypes.js");

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if ("development" !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
       true ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/prop-types/index.js":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__("./node_modules/prop-types/factoryWithTypeCheckers.js")(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = require('./factoryWithThrowingShims')();
}


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/react-cropper/dist/react-cropper.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _cropperjs = __webpack_require__("./node_modules/cropperjs/dist/cropper.js");

var _cropperjs2 = _interopRequireDefault(_cropperjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var optionProps = ['dragMode', 'aspectRatio', 'data', 'crop',
// unchangeable props start from here
'viewMode', 'preview', 'responsive', 'restore', 'checkCrossOrigin', 'checkOrientation', 'modal', 'guides', 'center', 'highlight', 'background', 'autoCrop', 'autoCropArea', 'movable', 'rotatable', 'scalable', 'zoomable', 'zoomOnTouch', 'zoomOnWheel', 'wheelZoomRation', 'cropBoxMovable', 'cropBoxResizable', 'toggleDragModeOnDblclick', 'minContainerWidth', 'minContainerHeight', 'minCanvasWidth', 'minCanvasHeight', 'minCropBoxWidth', 'minCropBoxHeight', 'ready', 'cropstart', 'cropmove', 'cropend', 'zoom'];

var unchangeableProps = optionProps.slice(4);

var ReactCropper = function (_Component) {
  _inherits(ReactCropper, _Component);

  function ReactCropper() {
    _classCallCheck(this, ReactCropper);

    return _possibleConstructorReturn(this, (ReactCropper.__proto__ || Object.getPrototypeOf(ReactCropper)).apply(this, arguments));
  }

  _createClass(ReactCropper, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var options = Object.keys(this.props).filter(function (propKey) {
        return optionProps.indexOf(propKey) !== -1;
      }).reduce(function (prevOptions, propKey) {
        return _extends({}, prevOptions, _defineProperty({}, propKey, _this2.props[propKey]));
      }, {});
      this.cropper = new _cropperjs2.default(this.img, options);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      if (nextProps.src !== this.props.src) {
        this.cropper.reset().clear().replace(nextProps.src);
      }
      if (nextProps.aspectRatio !== this.props.aspectRatio) {
        this.setAspectRatio(nextProps.aspectRatio);
      }
      if (nextProps.data !== this.props.data) {
        this.setData(nextProps.data);
      }
      if (nextProps.dragMode !== this.props.dragMode) {
        this.setDragMode(nextProps.dragMode);
      }
      if (nextProps.cropBoxData !== this.props.cropBoxData) {
        this.setCropBoxData(nextProps.cropBoxData);
      }
      if (nextProps.canvasData !== this.props.canvasData) {
        this.setCanvasData(nextProps.canvasData);
      }
      if (nextProps.moveTo !== this.props.moveTo) {
        if (nextProps.moveTo.length > 1) {
          this.moveTo(nextProps.moveTo[0], nextProps.moveTo[1]);
        } else {
          this.moveTo(nextProps.moveTo[0]);
        }
      }
      if (nextProps.zoomTo !== this.props.zoomTo) {
        this.zoomTo(nextProps.zoomTo);
      }
      if (nextProps.rotateTo !== this.props.rotateTo) {
        this.rotateTo(nextProps.rotateTo);
      }
      if (nextProps.scaleX !== this.props.scaleX) {
        this.scaleX(nextProps.scaleX);
      }
      if (nextProps.scaleY !== this.props.scaleY) {
        this.scaleY(nextProps.scaleY);
      }
      if (nextProps.enable !== this.props.enable) {
        if (nextProps.enable) {
          this.enable();
        } else {
          this.disable();
        }
      }

      Object.keys(nextProps).forEach(function (propKey) {
        var isDifferentVal = nextProps[propKey] !== _this3.props[propKey];
        var isUnchangeableProps = unchangeableProps.indexOf(propKey) !== -1;

        if (typeof nextProps[propKey] === 'function' && typeof _this3.props[propKey] === 'function') {
          isDifferentVal = nextProps[propKey].toString() !== _this3.props[propKey].toString();
        }

        if (isDifferentVal && isUnchangeableProps) {
          throw new Error('prop: ' + propKey + ' can\'t be change after componentDidMount');
        }
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.img) {
        // Destroy the cropper, this makes sure events such as resize are cleaned up and do not leak
        this.cropper.destroy();
        delete this.img;
        delete this.cropper;
      }
    }
  }, {
    key: 'setDragMode',
    value: function setDragMode(mode) {
      return this.cropper.setDragMode(mode);
    }
  }, {
    key: 'setAspectRatio',
    value: function setAspectRatio(aspectRatio) {
      return this.cropper.setAspectRatio(aspectRatio);
    }
  }, {
    key: 'getCroppedCanvas',
    value: function getCroppedCanvas(options) {
      return this.cropper.getCroppedCanvas(options);
    }
  }, {
    key: 'setCropBoxData',
    value: function setCropBoxData(data) {
      return this.cropper.setCropBoxData(data);
    }
  }, {
    key: 'getCropBoxData',
    value: function getCropBoxData() {
      return this.cropper.getCropBoxData();
    }
  }, {
    key: 'setCanvasData',
    value: function setCanvasData(data) {
      return this.cropper.setCanvasData(data);
    }
  }, {
    key: 'getCanvasData',
    value: function getCanvasData() {
      return this.cropper.getCanvasData();
    }
  }, {
    key: 'getImageData',
    value: function getImageData() {
      return this.cropper.getImageData();
    }
  }, {
    key: 'getContainerData',
    value: function getContainerData() {
      return this.cropper.getContainerData();
    }
  }, {
    key: 'setData',
    value: function setData(data) {
      return this.cropper.setData(data);
    }
  }, {
    key: 'getData',
    value: function getData(rounded) {
      return this.cropper.getData(rounded);
    }
  }, {
    key: 'crop',
    value: function crop() {
      return this.cropper.crop();
    }
  }, {
    key: 'move',
    value: function move(offsetX, offsetY) {
      return this.cropper.move(offsetX, offsetY);
    }
  }, {
    key: 'moveTo',
    value: function moveTo(x, y) {
      return this.cropper.moveTo(x, y);
    }
  }, {
    key: 'zoom',
    value: function zoom(ratio) {
      return this.cropper.zoom(ratio);
    }
  }, {
    key: 'zoomTo',
    value: function zoomTo(ratio) {
      return this.cropper.zoomTo(ratio);
    }
  }, {
    key: 'rotate',
    value: function rotate(degree) {
      return this.cropper.rotate(degree);
    }
  }, {
    key: 'rotateTo',
    value: function rotateTo(degree) {
      return this.cropper.rotateTo(degree);
    }
  }, {
    key: 'enable',
    value: function enable() {
      return this.cropper.enable();
    }
  }, {
    key: 'disable',
    value: function disable() {
      return this.cropper.disable();
    }
  }, {
    key: 'reset',
    value: function reset() {
      return this.cropper.reset();
    }
  }, {
    key: 'clear',
    value: function clear() {
      return this.cropper.clear();
    }
  }, {
    key: 'replace',
    value: function replace(url, onlyColorChanged) {
      return this.cropper.replace(url, onlyColorChanged);
    }
  }, {
    key: 'scale',
    value: function scale(scaleX, scaleY) {
      return this.cropper.scale(scaleX, scaleY);
    }
  }, {
    key: 'scaleX',
    value: function scaleX(_scaleX) {
      return this.cropper.scaleX(_scaleX);
    }
  }, {
    key: 'scaleY',
    value: function scaleY(_scaleY) {
      return this.cropper.scaleY(_scaleY);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          src = _props.src,
          alt = _props.alt,
          crossOrigin = _props.crossOrigin;


      return _react2.default.createElement(
        'div',
        {
          src: null,
          crossOrigin: null,
          alt: null,
          style: this.props.style,
          className: this.props.className
        },
        _react2.default.createElement('img', {
          crossOrigin: crossOrigin,
          ref: function ref(img) {
            _this4.img = img;
          },
          src: src,
          alt: alt === undefined ? 'picture' : alt,
          style: { opacity: 0 }
        })
      );
    }
  }]);

  return ReactCropper;
}(_react.Component);

ReactCropper.propTypes = {
  style: _propTypes2.default.object, // eslint-disable-line react/forbid-prop-types
  className: _propTypes2.default.string,

  // react cropper options
  crossOrigin: _propTypes2.default.string,
  src: _propTypes2.default.string,
  alt: _propTypes2.default.string,

  // props of option can be changed after componentDidmount
  aspectRatio: _propTypes2.default.number,
  dragMode: _propTypes2.default.oneOf(['crop', 'move', 'none']),
  data: _propTypes2.default.shape({
    x: _propTypes2.default.number,
    y: _propTypes2.default.number,
    width: _propTypes2.default.number,
    height: _propTypes2.default.number,
    rotate: _propTypes2.default.number,
    scaleX: _propTypes2.default.number,
    scaleY: _propTypes2.default.number
  }),
  scaleX: _propTypes2.default.number,
  scaleY: _propTypes2.default.number,
  enable: _propTypes2.default.bool,
  cropBoxData: _propTypes2.default.shape({
    left: _propTypes2.default.number,
    top: _propTypes2.default.number,
    width: _propTypes2.default.number,
    height: _propTypes2.default.number
  }),
  canvasData: _propTypes2.default.shape({
    left: _propTypes2.default.number,
    top: _propTypes2.default.number,
    width: _propTypes2.default.number,
    height: _propTypes2.default.number
  }),
  zoomTo: _propTypes2.default.number,
  moveTo: _propTypes2.default.arrayOf(_propTypes2.default.number),
  rotateTo: _propTypes2.default.number,

  // cropperjs options
  // https://github.com/fengyuanchen/cropperjs#options
  // aspectRatio, dragMode, data
  viewMode: _propTypes2.default.oneOf([0, 1, 2, 3]),
  preview: _propTypes2.default.string,
  responsive: _propTypes2.default.bool,
  restore: _propTypes2.default.bool,
  checkCrossOrigin: _propTypes2.default.bool,
  checkOrientation: _propTypes2.default.bool,
  modal: _propTypes2.default.bool,
  guides: _propTypes2.default.bool,
  center: _propTypes2.default.bool,
  highlight: _propTypes2.default.bool,
  background: _propTypes2.default.bool,
  autoCrop: _propTypes2.default.bool,
  autoCropArea: _propTypes2.default.number,
  movable: _propTypes2.default.bool,
  rotatable: _propTypes2.default.bool,
  scalable: _propTypes2.default.bool,
  zoomable: _propTypes2.default.bool,
  zoomOnTouch: _propTypes2.default.bool,
  zoomOnWheel: _propTypes2.default.bool,
  wheelZoomRation: _propTypes2.default.number,
  cropBoxMovable: _propTypes2.default.bool,
  cropBoxResizable: _propTypes2.default.bool,
  toggleDragModeOnDblclick: _propTypes2.default.bool,
  minContainerWidth: _propTypes2.default.number,
  minContainerHeight: _propTypes2.default.number,
  minCanvasWidth: _propTypes2.default.number,
  minCanvasHeight: _propTypes2.default.number,
  minCropBoxWidth: _propTypes2.default.number,
  minCropBoxHeight: _propTypes2.default.number,
  ready: _propTypes2.default.func,
  cropstart: _propTypes2.default.func,
  cropmove: _propTypes2.default.func,
  cropend: _propTypes2.default.func,
  crop: _propTypes2.default.func,
  zoom: _propTypes2.default.func
};

ReactCropper.defaultProps = {
  src: null,
  dragMode: 'crop',
  data: null,
  scaleX: 1,
  scaleY: 1,
  enable: true,
  zoomTo: 1,
  rotateTo: 0
};

exports.default = ReactCropper;


/***/ }),

/***/ 0:
/***/ (function(module, exports) {

module.exports = Injector;

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = classnames;

/***/ })

/******/ });
//# sourceMappingURL=main.js.map