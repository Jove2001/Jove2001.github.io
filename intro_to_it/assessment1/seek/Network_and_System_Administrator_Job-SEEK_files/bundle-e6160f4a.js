(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _newArrowCheck(innerThis, boundThis) {
    if (innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var utils = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () {
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

    exports.isDebugBuild = isDebugBuild;
    exports.isUndefined = isUndefined;
    exports.isDefined = isDefined;
    exports.isString = isString;
    exports.isFunction = isFunction;
    exports.isNumeric = isNumeric;
    exports.isObject = isObject;
    exports.isBlank = isBlank;
    exports.newZDate = newZDate;
    exports.shallowClone = shallowClone;
    exports.encodeAsQueryParameters = encodeAsQueryParameters;
    exports.log = log;
    exports.timeStamp = timeStamp;
    exports.addPassiveListener = addPassiveListener;
    exports.debounce = debounce;
    exports.isUuid = isUuid;
    exports.uuidV4 = uuidV4;
    exports.operaVersion = operaVersion;
    exports.chromeVersion = chromeVersion;
    exports.edgeVersion = edgeVersion;
    exports.firefoxVersion = firefoxVersion;
    exports.safariVersion = safariVersion;
    exports.ieVersion = ieVersion;

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    /* eslint-env browser */

    /* global Uint8Array DEBUG */


    function isDebugBuild() {
      return typeof DEBUG === 'undefined' ? true : DEBUG;
    }

    function toString(value) {
      return Object.prototype.toString.call(value);
    }

    function isUndefined(val) {
      return val === void 0;
    }

    function isDefined(val) {
      return !isUndefined(val);
    }

    var stringifyJson = exports.stringifyJson = JSON.stringify;

    function isString(obj) {
      return toString(obj) === '[object String]';
    }

    function isFunction(f) {
      return typeof f === "function";
    }

    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function isObject(obj) {
      return obj === Object(obj) && !isArray(obj);
    }

    var isArray = exports.isArray = Array.isArray || function (obj) {
      return toString(obj) === '[object Array]';
    };

    function isBlank(string) {
      return isUndefined(string) || string === null || string === "";
    }

    function newZDate() {
      return new Date().toISOString();
    }

    function shallowClone(src) {
      if (isObject(src)) {
        var clone = {};

        for (var prop in src) {
          if (src.hasOwnProperty(prop)) {
            clone[prop] = src[prop];
          }
        }

        return clone;
      } else {
        return src;
      }
    }

    function encodeAsQueryParameters(object) {
      return Object.keys(object).map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(object[key]);
      }).join('&');
    }

    function log(level) {
      if (console && console.timeStamp) {
        // Hack to call log in IE...
        var _log = Function.prototype.bind.call(console[level] || console.log, console);

        _log.apply(console, [].slice.call(arguments, 1));
      }
    }

    function timeStamp() {
      if (console && console.timeStamp && isDebugBuild()) {
        console.timeStamp.apply(console, arguments);
      }
    }

    var browserSupportsPassive = false;

    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function get() {
          return browserSupportsPassive = true;
        }
      });
      window.addEventListener("testPassive", null, opts);
      window.removeEventListener("testPassive", null, opts);
    } catch (e) {// eslint-disable-next-line no-empty
    }

    var passiveListenerOptions = browserSupportsPassive ? {
      passive: true
    } : false;

    function addPassiveListener(target, type, listener) {
      target.addEventListener(type, listener, passiveListenerOptions);
      return function () {
        target.removeEventListener(type, listener, passiveListenerOptions);
      };
    }

    function debounce(func, wait) {
      var timeout = null;

      function callFunc(context, args) {
        timeout = null;
        func.apply(context, args);
      }

      return function () {
        if (timeout) {
          return;
        }

        timeout = setTimeout(callFunc, wait, this, arguments);
      };
    }

    function isUuid(value) {
      return /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(value);
    }
    /**
    * Returns a UUID V4.
    */


    function uuidV4() {
      var buf = getRandomValues(16);
      buf[6] = buf[6] & 0x0f | 0x40;
      buf[8] = buf[8] & 0x3f | 0x80;
      return bytes2Uuid(buf);
    }

    function getRandomValues(size) {
      if (typeof crypto !== "undefined" && crypto.getRandomValues) {
        var buf = new Uint8Array(size);
        crypto.getRandomValues(buf);
        return buf;
      } else {
        var _buf = [];

        for (var i = 0; i < size; i++) {
          _buf.push(Math.floor(Math.random() * 256));
        }

        return _buf;
      }
    }

    var bh = [];

    for (var i = 0; i < 256; ++i) {
      bh[i] = (i + 0x100).toString(16).substr(1);
    }

    function bytes2Uuid(buf) {
      return bh[buf[0]] + bh[buf[1]] + bh[buf[2]] + bh[buf[3]] + "-" + bh[buf[4]] + bh[buf[5]] + "-" + bh[buf[6]] + bh[buf[7]] + "-" + bh[buf[8]] + bh[buf[9]] + "-" + bh[buf[10]] + bh[buf[11]] + bh[buf[12]] + bh[buf[13]] + bh[buf[14]] + bh[buf[15]];
    }

    function operaVersion(userAgent) {
      var match = userAgent.match(/(?:^opera.+?version|opr)\/(\d+)/i);
      return match !== null && Number(match[1]);
    }

    function chromeVersion(userAgent, vendor) {
      var match = /google inc/i.test(vendor) ? userAgent.match(/(?:chrome|crios)\/(\d+)/i) : null;
      return match !== null && !operaVersion(userAgent) && Number(match[1]);
    }

    function edgeVersion(userAgent) {
      var match = userAgent.match(/edge\/(\d+)/i);
      return match !== null && Number(match[1]);
    }

    function firefoxVersion(userAgent) {
      var match = userAgent.match(/(?:firefox|fxios)\/(\d+)/i);
      return match !== null && Number(match[1]);
    }

    function safariVersion(userAgent) {
      var match = userAgent.match(/version\/(\d+).+?safari/i);
      return match !== null && Number(match[1]);
    }

    function ieVersion(userAgent) {
      var match = userAgent.match(/(?:msie |trident.+?; rv:)(\d+)/i);
      return match !== null && Number(match[1]);
    }

    var TinyMap = exports.TinyMap = function () {
      function TinyMap() {
        _classCallCheck(this, TinyMap);

        this._keys = [];
        this._values = [];
      }

      _createClass(TinyMap, [{
        key: 'get',
        value: function get(key) {
          return this._values[this._keys.indexOf(key)];
        }
      }, {
        key: 'set',
        value: function set(key, value) {
          var idx = this._keys.indexOf(key);

          if (idx !== -1) {
            this._values[idx] = value;
          } else {
            this._keys.push(key);

            this._values.push(value);
          }
        }
      }, {
        key: 'delete',
        value: function _delete(key) {
          var idx = this._keys.indexOf(key);

          if (idx !== -1) {
            this._keys.splice(idx, 1);

            this._values.splice(idx, 1);
          }
        }
      }, {
        key: 'size',
        value: function size() {
          return this._keys.length;
        }
      }]);

      return TinyMap;
    }();
  });
  unwrapExports(utils);
  var utils_1 = utils.isDebugBuild;
  var utils_2 = utils.isUndefined;
  var utils_3 = utils.isDefined;
  var utils_4 = utils.isString;
  var utils_5 = utils.isFunction;
  var utils_6 = utils.isNumeric;
  var utils_7 = utils.isObject;
  var utils_8 = utils.isBlank;
  var utils_9 = utils.newZDate;
  var utils_10 = utils.shallowClone;
  var utils_11 = utils.encodeAsQueryParameters;
  var utils_12 = utils.log;
  var utils_13 = utils.timeStamp;
  var utils_14 = utils.addPassiveListener;
  var utils_15 = utils.debounce;
  var utils_16 = utils.isUuid;
  var utils_17 = utils.uuidV4;
  var utils_18 = utils.operaVersion;
  var utils_19 = utils.chromeVersion;
  var utils_20 = utils.edgeVersion;
  var utils_21 = utils.firefoxVersion;
  var utils_22 = utils.safariVersion;
  var utils_23 = utils.ieVersion;
  var utils_24 = utils.stringifyJson;
  var utils_25 = utils.isArray;
  var utils_26 = utils.TinyMap;

  var tracking = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.percentVisible = percentVisible;
    exports.element = element;
    exports.callbackWhenTrueFor = callbackWhenTrueFor;

    function percentVisible(elem) {
      var bounding = clippedBounds(elem);
      return bounding.visible ? (bounding.clipBottom - bounding.clipTop) / bounding.height : 0;
    }
    /* eslint-env browser */


    function clippedBounds(element) {
      var elRect = element.getBoundingClientRect();
      elRect.clipLeft = elRect.left;
      elRect.clipTop = elRect.top;
      elRect.clipRight = elRect.right;
      elRect.clipBottom = elRect.bottom;
      elRect.clipWidth = elRect.width;
      elRect.clipHeight = elRect.height;
      elRect.visible = true;
      elRect.contained = true;
      var ownerWindow = element.ownerDocument && element.ownerDocument.defaultView;

      if (!ownerWindow || !element.offsetWidth || !element.offsetHeight) {
        elRect.clipLeft = 0;
        elRect.clipTop = 0;
        elRect.clipRight = 0;
        elRect.clipBottom = 0;
        elRect.clipWidth = 0;
        elRect.clipHeight = 0;
        elRect.visible = false;
        elRect.contained = false;
        return elRect;
      }

      var clipRects = [{
        left: 0,
        top: 0,
        right: ownerWindow.innerWidth,
        bottom: ownerWindow.innerHeight
      }];
      var parent = element;

      while (parent = scrollParent(parent)) {
        clipRects.push(parent.getBoundingClientRect());
      }

      for (var i = 0; i < clipRects.length; i += 1) {
        var rect = clipRects[i];
        elRect.clipLeft = Math.max(elRect.clipLeft, rect.left);
        elRect.clipTop = Math.max(elRect.clipTop, rect.top);
        elRect.clipRight = Math.min(elRect.clipRight, rect.right);
        elRect.clipBottom = Math.min(elRect.clipBottom, rect.bottom);
      }

      elRect.clipLeft = Math.min(elRect.clipLeft, elRect.clipRight);
      elRect.clipTop = Math.min(elRect.clipTop, elRect.clipBottom);
      elRect.clipRight = Math.max(elRect.clipLeft, elRect.clipRight);
      elRect.clipBottom = Math.max(elRect.clipTop, elRect.clipBottom);
      elRect.clipWidth = elRect.clipRight - elRect.clipLeft;
      elRect.clipHeight = elRect.clipBottom - elRect.clipTop;
      elRect.visible = elRect.clipWidth > 0 && elRect.clipHeight > 0;
      elRect.contained = elRect.clipWidth === elRect.width && elRect.clipHeight === elRect.height;
      return elRect;
    }

    function element(elemId) {
      if (elemId instanceof Element) {
        return elemId;
      } else {
        var byId = document.getElementById(elemId);

        if (byId !== null) {
          return byId;
        } else {
          var bySelector = document.querySelectorAll(elemId);

          if (bySelector.length > 1) {
            return null;
          } else {
            return bySelector[0];
          }
        }
      }
    }

    function scrollParent(element, includeHidden) {
      var style = getComputedStyle(element);
      var excludeStaticParent = style.position === "absolute";
      var overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/;

      for (var parent = element; parent = parent.parentElement;) {
        style = getComputedStyle(parent);

        if (excludeStaticParent && style.position === "static") {
          continue;
        } else if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX)) {
          return parent;
        }
      }

      return null;
    }

    function scrollParents(element, includeHidden) {
      var scrollParents = [];

      for (var parent = element; parent = scrollParent(parent, includeHidden);) {
        scrollParents.push(parent);
      }

      return scrollParents;
    }

    function callbackWhenTrueFor(elemId, time, predicate, callback) {
      var timer = undefined;
      var elem = element(elemId);

      function registerImpression() {
        if (elem && predicate(elem)) {
          done();
          callback();
        }
      }

      function on() {
        if (!timer) {
          timer = setTimeout(registerImpression, time);
        }
      }

      function off() {
        if (timer) {
          timer = clearTimeout(timer);
        }
      }

      function checkPredicate() {
        if (elem && predicate(elem)) {
          on();
        } else {
          off();
        }
      }

      var debouncedCheckPredicate = (0, utils.debounce)(checkPredicate, 50); // TODO: configure

      var listeners = [];

      if (document.readyState !== 'complete') {
        listeners.push((0, utils.addPassiveListener)(document, "readystatechange", debouncedCheckPredicate));
      }

      listeners.push((0, utils.addPassiveListener)(window, "resize", debouncedCheckPredicate));
      listeners.push((0, utils.addPassiveListener)(window, "scroll", debouncedCheckPredicate));
      scrollParents(elem).forEach(function (parent) {
        listeners.push((0, utils.addPassiveListener)(parent, "scroll", debouncedCheckPredicate));
      });

      function done() {
        off();
        listeners.forEach(function (done) {
          return done();
        });
      } // This MUST be the non debounced version so the 1st check is executed synchronously.


      checkPredicate();
      return done;
    }
  });
  unwrapExports(tracking);
  var tracking_1 = tracking.percentVisible;
  var tracking_2 = tracking.element;
  var tracking_3 = tracking.callbackWhenTrueFor;

  var storage_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var storage = function () {
      function _get(key) {
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
      }
      /**
      * There is a problem with the set logic that couses some cookie persistence under invalid domains
      * as ".com" only for instance. This function treats this situation.
      * @param {*} domain
      * 
      */


      var isIncompleteDomain = function isIncompleteDomain(domain) {
        return !domain || domain !== 'localhost' && domain.substr(0, domain.lastIndexOf('.')).length <= 3;
      };

      function _set(key, value, domain) {
        var expires = new Date();
        expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000);
        document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value) + "; domain=" + domain + "; expires=" + expires.toUTCString() + "; path=/" + "; SameSite=Strict" + "; Secure";
        return _get(key) === value;
      }

      return {
        set: function set(key, value) {
          var host = document.location.host.split(':')[0];
          var domainParts = host.split('.'); // This finds the shortest domain we are allowed to set the cookie against

          for (var i = domainParts.length - 1; i >= 0; i--) {
            var domain = domainParts.slice(i).join('.');
            if (isIncompleteDomain(domain)) continue;

            if (_set(key, value, '.' + domain)) {
              return;
            }

            if (_set(key, value, domain)) {
              return;
            }
          }
        },
        get: function get(key) {
          return _get(key);
        }
      };
    }();

    exports.storage = storage;
  });
  unwrapExports(storage_1);
  var storage_2 = storage_1.storage;

  var transport = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Transport = undefined;

    var _typeof$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
      return _typeof(obj);
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof(obj);
    };
    /*
     * Copyright (c) 2010-2018 SEEK.  All rights reserved.
     */

    /*global navigator fetch Promise*/


    function supportsFetchWithKeepalive() {
      // Unfortunately there's no client side only way to do feature detection for this
      var userAgent = (typeof navigator === "undefined" ? "undefined" : _typeof$1(navigator)) === "object" && navigator.userAgent || "";
      var vendor = (typeof navigator === "undefined" ? "undefined" : _typeof$1(navigator)) === "object" && navigator.vendor || "";
      return supportsFetch() && ((0, utils.chromeVersion)(userAgent, vendor) >= 66 // https://www.chromestatus.com/feature/5760375567941632
      || (0, utils.edgeVersion)(userAgent, vendor) >= 16 // https://github.com/MicrosoftEdge/Status/issues/551
      // || firefoxVersion(userAgent, vendor) >= SEE -> https://bugzilla.mozilla.org/show_bug.cgi?id=1342484
      // || safariVersion(userAgent, vendor) >= SEE -> https://bugs.webkit.org/show_bug.cgi?id=168865
      );
    }

    function supportsBeacon() {
      return (typeof navigator === "undefined" ? "undefined" : _typeof$1(navigator)) === "object" && (0, utils.isFunction)(navigator.sendBeacon);
    }

    function supportsFetch() {
      return (typeof window === "undefined" ? "undefined" : _typeof$1(window)) === "object" && (0, utils.isFunction)(window.fetch);
    }

    function Transport() {
      // Setup the interactive transport
      if (supportsFetch()) {
        this.proto = "fetch+";
        this._sendWhileInteractive = this._sendFetch;
      } else {
        this.proto = "xhr+";
        this._sendWhileInteractive = this._sendXHRAsync;
      } // And the fallback (page unload safe) protocol so we don't lose events on unload


      if (supportsBeacon()) {
        this.proto += "beacon";
        this._sendWhileUnloading = this._sendBeacon;
      } else if (supportsFetchWithKeepalive()) {
        this.proto += "keepalive";
        this._sendWhileUnloading = this._sendFetch;
      } else {
        this.proto += "sxhr";
        this._sendWhileUnloading = this._sendXHRSync;
      }
    }

    Transport.prototype.send = function (baseUrl, requestParameters, events, documentIsUnloading, onResponse, onError) {
      var queryParams = (0, utils.encodeAsQueryParameters)(requestParameters);
      var requestUrl = baseUrl + "?" + queryParams;
      var requestBody = JSON.stringify(events);

      if (documentIsUnloading) {
        this._sendWhileUnloading(requestUrl, requestBody, onResponse, onError);
      } else {
        this._sendWhileInteractive(requestUrl, requestBody, onResponse, onError);
      }
    };

    Transport.prototype._sendBeacon = function (requestUrl, requestBody) {
      navigator.sendBeacon(requestUrl, requestBody);
    };

    Transport.prototype._sendFetch = function (requestUrl, requestBody, onResponse, onError) {
      fetch(requestUrl, {
        method: "POST",
        body: requestBody,
        // keepalive: true,
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function (response) {
        return Promise.all([response.status, response.headers, response.text()]);
      }).then(function (statusHeadersAndBody) {
        onResponse(statusHeadersAndBody[0], statusHeadersAndBody[1], statusHeadersAndBody[2]);
      })["catch"](function (exception) {
        onError(exception);
      });
    };

    Transport.prototype._sendXHRSync = function (requestUrl, requestBody, onResponse, onError) {
      this._sendXHR(requestUrl, requestBody, true, onResponse, onError);
    };

    Transport.prototype._sendXHRAsync = function (requestUrl, requestBody, onResponse, onError) {
      this._sendXHR(requestUrl, requestBody, false, onResponse, onError);
    };

    Transport.prototype._sendXHR = function (requestUrl, requestBody, synchronous, onResponse, onError) {
      var req = new XMLHttpRequest();
      req.open("POST", requestUrl, !synchronous);
      req.withCredentials = false;
      req.setRequestHeader("Content-Type", "application/json");
      req.addEventListener("load", function () {
        onResponse(req.status, {
          get: function get(header) {
            return req.getResponseHeader(header);
          }
        }, req.responseText);
      });
      req.addEventListener("error", function () {
        onError();
      });
      req.send(requestBody);
    };

    exports.Transport = Transport;
  });
  unwrapExports(transport);
  var transport_1 = transport.Transport;

  var version_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    /**
     * This is the right place to add the public version for sol js.
     * When the version changes, the cache routine will be in place to refresh the request content body for all the cdn consumers.
     * This version will exposed at:
     *  etag 
     *  sol.version
     *  x-version response reader
     * 
     * 
     *  This is set automatically by the build/release process. Keep the version as is.
     */

    var version = exports.version = 'npm-320';
  });
  unwrapExports(version_1);
  var version_2 = version_1.version;

  var module = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Sol = undefined;

    function Sol() {
      (0, utils.timeStamp)("Sol constructor"); // Make sure we're getting included properly

      if (!window['sol']) {
        throw '"sol" snippet must be included before the script tag';
      } else if (window['sol'].loaded) {
        throw '"sol" object is already loaded';
      } // Default config


      this.context = {
        version: "sol-js/" + version_1.version,
        debug: (0, utils.isDebugBuild)(),
        batch: true,
        // Should events be batched
        batchLingerMs: 500,
        // Duration to wait for events to accumulate before sending.
        // A longer duration can improve throughput due to greater batching, but increases latency
        visitorId: '@visitorId',
        apiHost: 'https://web.sol-data.com',
        apiPath: '/v1/events',
        userAgent: window.navigator.userAgent,
        referrerUrl: window.document.referrer,
        impressionDuration: 1000,
        // Time in ms a job ad needs to be visible for an impression
        impressionVisible: 0.5,
        // Percentage of job ad which needs to be visible for and impression
        transport: new transport.Transport(),
        _lastRequestMetrics: {
          _sessionId: (0, utils.uuidV4)().substring(0, 8),
          _seqNum: 0,
          _cfRay: null,
          _failures: 0,
          _requestDuration: null,
          _status: null // Setup the buffer handling logic

        }
      };
      this._buffer = [];
      this._failedBuffer = [];
      this._bufferFlushTimer = null;
      this.impressionListeners = Map ? new Map() : new utils.TinyMap();

      var onUnloadHandler = function () {
        window.clearTimeout(this._bufferFlushTimer);
        this._unloading = true;

        if (this._buffer.length > 0) {
          this._flushBuffer();
        }
      }.bind(this);

      if ("onpagehide" in window) {
        window.addEventListener("pagehide", onUnloadHandler, false);
      } else {
        window.addEventListener("beforeunload", onUnloadHandler, false);
      } // Finally hook into the global `sol` API entry-point


      window['sol'].loaded = true;

      if (document.readyState === 'loading') {
        document.addEventListener("DOMContentLoaded", this._attachToGlobal.bind(this), false);
      } else {
        this._attachToGlobal();
      }
    }
    /*
     * Copyright (c) 2010-2018 SEEK.  All rights reserved.
     */

    /* global Map */


    Sol.prototype._track = function (trackType) {
      // Since this method is called from client code we prevent this function from throwing exceptions
      try {
        // If called with no arguments just return this
        if ((0, utils.isUndefined)(trackType)) return this; // Otherwise check if it's one of the supported track calls

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        switch (trackType = trackType.toUpperCase()) {
          case "INIT":
            this._init.apply(this, args);

            break;

          case "CONFIG":
            this._config.apply(this, args);

            break;

          case "SEARCH":
            this._search.apply(this, args);

            break;

          case "ACTIVITY":
            this._activity.apply(this, args);

            break;

          case "MONITOR:IMPRESSION":
            this._watchImpression.apply(this, args);

            break;

          case "MONITOR:IMPRESSION:OFF":
            this._watchImpressionOff.apply(this, args);

            break;

          case "RECOMMENDATIONS_DISPLAYED":
            this._recommendationsDisplayed.apply(this, args);

            break;

          case "DISPLAY":
            this._display.apply(this, args);

            break;

          default:
            this._error('Invalid trackType "' + trackType + '"');

        }
      } catch (e) {
        this._error(e);
      }
    };

    Sol.prototype.getVisitorId = function () {
      return this._visitorIdProvider();
    };

    Sol.prototype._visitorIdProvider = function () {
      var VISITOR_ID_KEY = "sol_id";

      var storedVid = storage_1.storage.get(VISITOR_ID_KEY);

      if (!(0, utils.isUuid)(storedVid)) {
        storedVid = (0, utils.isUuid)(this.context.visitorId) ? this.context.visitorId : (0, utils.uuidV4)();
      }

      storage_1.storage.set(VISITOR_ID_KEY, storedVid);

      return storedVid;
    };

    Sol.prototype._init = function (partnerId, config) {
      this.context.partnerId = partnerId;

      this._config(config);
    };

    Sol.prototype._config = function (config) {
      if (config) {
        if ((0, utils.isDefined)(config.debug)) this.context.debug = config.debug;
        if ((0, utils.isDefined)(config.loginId)) this.context.loginId = config.loginId;
        if ((0, utils.isDefined)(config.apiHost)) this.context.apiHost = config.apiHost;
        if ((0, utils.isDefined)(config.apiPath)) this.context.apiPath = config.apiPath;
      }
    };

    Sol.prototype._search = function (data, oncomplete) {
      data.type = "SEARCH";

      this._bufferEvent(data, oncomplete);
    };

    Sol.prototype._activity = function (activityType, data, oncomplete) {
      (0, utils.timeStamp)("Sol _activity " + activityType);
      data.type = "ACTIVITY";
      data.activityType = activityType;

      this._bufferEvent(data, oncomplete);
    };

    Sol.prototype._display = function (data, oncomplete) {
      data.type = "DISPLAY";

      this._bufferEvent(data, oncomplete);
    };

    Sol.prototype._recommendationsDisplayed = function (data, oncomplete) {
      data.type = "RECOMMENDATIONS_DISPLAYED";

      this._bufferEvent(data, oncomplete);
    };

    Sol.prototype._watchImpression = function (elemId, data, oncomplete) {
      (0, utils.timeStamp)("Sol _watchImpression");
      var registeredImpression = this.impressionListeners.get(elemId);

      if (registeredImpression && JSON.stringify(data) === JSON.stringify(registeredImpression.data)) {
        this._warn("Impression tracker was registered multiple times with same parameters. Ignoring.");
      } else {
        if (registeredImpression) {
          this._warn("Impression tracker was registered multiple times with differing parameters. Deregistering previous tracker.");

          registeredImpression.off();
        }

        var offFunction = (0, tracking.callbackWhenTrueFor)(elemId, this.context.impressionDuration, function (elem) {
          return (0, tracking.percentVisible)(elem) > this.context.impressionVisible;
        }.bind(this), this._activity.bind(this, "IMPRESSION", data, oncomplete));
        this.impressionListeners.set(elemId, {
          off: offFunction,
          data: (0, utils.shallowClone)(data)
        });
      }
    };

    Sol.prototype._watchImpressionOff = function (elemId) {
      (0, utils.timeStamp)("Sol _watchImpressionOff");
      var registeredImpression = this.impressionListeners.get(elemId);

      if (registeredImpression) {
        this.impressionListeners["delete"](elemId);
        registeredImpression.off();
      } else {
        this._error('Unable to stop impression tracking. No impression tracker found for elementId:' + elemId);
      }
    };

    Sol.prototype._attachToGlobal = function () {
      (0, utils.timeStamp)("Sol _attachToGlobal");
      var calls = window['sol'].q || [];

      for (var i = 0; i < calls.length; i++) {
        this._track.apply(this, calls[i]);
      }

      window['sol'] = this._track.bind(this);
      window['sol'].loaded = true;
      window['sol'].version = version_1.version;
    };

    Sol.prototype._cloneAndAddMetadata = function (event) {
      var payload = (0, utils.shallowClone)(event);
      payload.eventTime = (0, utils.newZDate)();
      payload.visitorId = this._visitorIdProvider();

      if (this.context.loginId) {
        payload.loginId = this.context.loginId;
      }

      payload.url = window.location.href;
      payload.referrerUrl = this.context.referrerUrl;
      payload.userAgent = this.context.userAgent;
      var tags = payload.tags = (0, utils.isObject)(event.tags) ? (0, utils.shallowClone)(event.tags) : {};
      var lastRequestMetrics = this.context._lastRequestMetrics;
      tags["solJs:tp"] = this.context.transport.proto;
      tags["solJs:sid"] = lastRequestMetrics._sessionId;
      tags["solJs:seq"] = "" + lastRequestMetrics._seqNum;

      if (lastRequestMetrics._cfRay && lastRequestMetrics._cfRay.length > 0) {
        tags["solJs:cfRay"] = "" + lastRequestMetrics._cfRay;
      }

      return payload;
    };

    Sol.prototype._bufferEvent = function (data, oncomplete) {
      // 1st buffer the event
      this._buffer.push({
        data: this._cloneAndAddMetadata(data),
        oncomplete: oncomplete
      }); // Now check if we need to flush it or not


      if (this._shouldFlush()) {
        // If there's already some buffered waiting to send we'll send those now too
        if (!this._bufferFlushTimer) {
          clearTimeout(this._bufferFlushTimer);
          this._bufferFlushTimer = null;
        }

        this._flushBuffer();
      } else {
        if (!this._bufferFlushTimer) {
          this._bufferFlushTimer = setTimeout(function () {
            this._bufferFlushTimer = null;

            this._flushBuffer();
          }.bind(this), this.context.batchLingerMs);
        }
      }
    };

    Sol.prototype._shouldFlush = function () {
      return this._unloading || this.context.batch !== true;
    };

    Sol.prototype._getApiServer = function () {
      return this.context.apiHost + this.context.apiPath;
    };

    Sol.prototype._flushBuffer = function () {
      if (this._buffer.length < 1) {
        this._error("_flushBuffer called when buffer is empty");

        return;
      }

      var buffer = this._buffer;
      this._buffer = [];
      var requestParams = {
        "X-Partner-ID": this.context.partnerId,
        "X-Request-Time": (0, utils.newZDate)(),
        "X-Client-Version": this.context.version
      };

      if (this.context.debug) {
        requestParams["X-Development-Response"] = true;
      } // Send the request metrics for monitoring


      var lastRequestMetrics = this.context._lastRequestMetrics; // Increment the request metrics seq

      lastRequestMetrics._seqNum++;

      if (lastRequestMetrics._requestDuration !== null) {
        requestParams["X-Last-Request-Duration"] = lastRequestMetrics._requestDuration;
      } // If there were previous failures we will try and send them with this request


      if (lastRequestMetrics._failures > 0) {
        // Prepend the events which failed to deliver to the current payload
        var failedBuffer = this._failedBuffer;

        if (failedBuffer.length > 0) {
          this._failedBuffer = [];
          buffer = failedBuffer.concat(buffer);
          requestParams["X-Retried-Events"] = failedBuffer.length;
        }

        requestParams["X-Last-Request-Failures"] = lastRequestMetrics._failures;
        requestParams["X-Last-Request-Status"] = lastRequestMetrics._status;
      } // Event handlers
      // Track the request duration for metric collection


      var requestStartTime = new Date().getTime();

      var onComplete = function (status, headers, responseText) {
        try {
          var requestDuration = new Date().getTime() - requestStartTime;
          lastRequestMetrics._requestDuration = requestDuration;
          lastRequestMetrics._cfRay = headers.get("CF-Ray");
          var statusCodeRange = status / 100 | 0; // a 2xx means we were successful

          if (statusCodeRange === 2) {
            delete lastRequestMetrics._failures;
            delete lastRequestMetrics._status;
          } else {
            // save the events for retry on everything except a 3xx or 4xx
            if (statusCodeRange !== 3 && statusCodeRange !== 4) {
              this._failedBuffer = this._failedBuffer.concat(buffer);
            }

            lastRequestMetrics._failures = (lastRequestMetrics._failures | 0) + 1;
            lastRequestMetrics._status = status;
          }

          if (status !== 204) {
            this._error(status + ":" + responseText);
          } // Callback


          for (var i = 0; i < buffer.length; i++) {
            if (buffer[i].oncomplete) {
              buffer[i].oncomplete(status, responseText);
            }
          }
        } catch (e) {
          this._error(e);
        }
      }.bind(this);

      var onError = function (error) {
        this._error(error);
      }.bind(this); // Collect the messages into an array


      var events = [];

      for (var i = 0; i < buffer.length; i++) {
        events.push(buffer[i].data);
      }

      this.context.transport.send(this._getApiServer(), requestParams, events, this._unloading === true, onComplete, onError);
    };

    Sol.prototype._log = function () {
      if (this.context.debug) {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        utils.log.apply(undefined, ["info"].concat(args));
      }
    };

    Sol.prototype._warn = function () {
      if (this.context.debug) {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        utils.log.apply(undefined, ["warn"].concat(args));
      }
    };

    Sol.prototype._error = function () {
      if (this.context.debug) {
        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        utils.log.apply(undefined, ["error"].concat(args));
      }
    };

    exports.Sol = Sol;
  });
  unwrapExports(module);
  var module_1 = module.Sol;

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray = Array.isArray;
  var isArray_1 = isArray;

  /** Detect free variable `global` from Node.js. */

  var freeGlobal = _typeof(commonjsGlobal) == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  var _freeGlobal = freeGlobal;

  /** Detect free variable `self`. */

  var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;
  /** Used as a reference to the global object. */

  var root = _freeGlobal || freeSelf || Function('return this')();
  var _root = root;

  /** Built-in value references. */

  var _Symbol2 = _root.Symbol;
  var _Symbol = _Symbol2;

  /** Used for built-in method references. */

  var objectProto = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty = objectProto.hasOwnProperty;
  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */

  var nativeObjectToString = objectProto.toString;
  /** Built-in value references. */

  var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;
  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */

  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag),
        tag = value[symToStringTag];

    try {
      value[symToStringTag] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString.call(value);

    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }

    return result;
  }

  var _getRawTag = getRawTag;

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;
  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */

  var nativeObjectToString$1 = objectProto$1.toString;
  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */

  function objectToString(value) {
    return nativeObjectToString$1.call(value);
  }

  var _objectToString = objectToString;

  /** `Object#toString` result references. */

  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';
  /** Built-in value references. */

  var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;
  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */

  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }

    return symToStringTag$1 && symToStringTag$1 in Object(value) ? _getRawTag(value) : _objectToString(value);
  }

  var _baseGetTag = baseGetTag;

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && _typeof(value) == 'object';
  }

  var isObjectLike_1 = isObjectLike;

  /** `Object#toString` result references. */

  var symbolTag = '[object Symbol]';
  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */

  function isSymbol(value) {
    return _typeof(value) == 'symbol' || isObjectLike_1(value) && _baseGetTag(value) == symbolTag;
  }

  var isSymbol_1 = isSymbol;

  /** Used to match property names within property paths. */

  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/;
  /**
   * Checks if `value` is a property name and not a property path.
   *
   * @private
   * @param {*} value The value to check.
   * @param {Object} [object] The object to query keys on.
   * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
   */

  function isKey(value, object) {
    if (isArray_1(value)) {
      return false;
    }

    var type = _typeof(value);

    if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol_1(value)) {
      return true;
    }

    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
  }

  var _isKey = isKey;

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = _typeof(value);

    return value != null && (type == 'object' || type == 'function');
  }

  var isObject_1 = isObject;

  /** `Object#toString` result references. */

  var asyncTag = '[object AsyncFunction]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      proxyTag = '[object Proxy]';
  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */

  function isFunction(value) {
    if (!isObject_1(value)) {
      return false;
    } // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.


    var tag = _baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  var isFunction_1 = isFunction;

  /** Used to detect overreaching core-js shims. */

  var coreJsData = _root['__core-js_shared__'];
  var _coreJsData = coreJsData;

  /** Used to detect methods masquerading as native. */

  var maskSrcKey = function () {
    var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
    return uid ? 'Symbol(src)_1.' + uid : '';
  }();
  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */


  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }

  var _isMasked = isMasked;

  /** Used for built-in method references. */
  var funcProto = Function.prototype;
  /** Used to resolve the decompiled source of functions. */

  var funcToString = funcProto.toString;
  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */

  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {}

      try {
        return func + '';
      } catch (e) {}
    }

    return '';
  }

  var _toSource = toSource;

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */

  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  /** Used to detect host constructors (Safari). */

  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  /** Used for built-in method references. */

  var funcProto$1 = Function.prototype,
      objectProto$2 = Object.prototype;
  /** Used to resolve the decompiled source of functions. */

  var funcToString$1 = funcProto$1.toString;
  /** Used to check objects for own properties. */

  var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
  /** Used to detect if a method is native. */

  var reIsNative = RegExp('^' + funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */

  function baseIsNative(value) {
    if (!isObject_1(value) || _isMasked(value)) {
      return false;
    }

    var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
    return pattern.test(_toSource(value));
  }

  var _baseIsNative = baseIsNative;

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  var _getValue = getValue;

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */

  function getNative(object, key) {
    var value = _getValue(object, key);
    return _baseIsNative(value) ? value : undefined;
  }

  var _getNative = getNative;

  /* Built-in method references that are verified to be native. */

  var nativeCreate = _getNative(Object, 'create');
  var _nativeCreate = nativeCreate;

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */

  function hashClear() {
    this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
    this.size = 0;
  }

  var _hashClear = hashClear;

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }

  var _hashDelete = hashDelete;

  /** Used to stand-in for `undefined` hash values. */

  var HASH_UNDEFINED = '__lodash_hash_undefined__';
  /** Used for built-in method references. */

  var objectProto$3 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */

  function hashGet(key) {
    var data = this.__data__;

    if (_nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? undefined : result;
    }

    return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
  }

  var _hashGet = hashGet;

  /** Used for built-in method references. */

  var objectProto$4 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */

  function hashHas(key) {
    var data = this.__data__;
    return _nativeCreate ? data[key] !== undefined : hasOwnProperty$3.call(data, key);
  }

  var _hashHas = hashHas;

  /** Used to stand-in for `undefined` hash values. */

  var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';
  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */

  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = _nativeCreate && value === undefined ? HASH_UNDEFINED$1 : value;
    return this;
  }

  var _hashSet = hashSet;

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function Hash(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;
    this.clear();

    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  } // Add methods to `Hash`.


  Hash.prototype.clear = _hashClear;
  Hash.prototype['delete'] = _hashDelete;
  Hash.prototype.get = _hashGet;
  Hash.prototype.has = _hashHas;
  Hash.prototype.set = _hashSet;
  var _Hash = Hash;

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }

  var _listCacheClear = listCacheClear;

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }

  var eq_1 = eq;

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */

  function assocIndexOf(array, key) {
    var length = array.length;

    while (length--) {
      if (eq_1(array[length][0], key)) {
        return length;
      }
    }

    return -1;
  }

  var _assocIndexOf = assocIndexOf;

  /** Used for built-in method references. */

  var arrayProto = Array.prototype;
  /** Built-in value references. */

  var splice = arrayProto.splice;
  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */

  function listCacheDelete(key) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }

    var lastIndex = data.length - 1;

    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }

    --this.size;
    return true;
  }

  var _listCacheDelete = listCacheDelete;

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */

  function listCacheGet(key) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);
    return index < 0 ? undefined : data[index][1];
  }

  var _listCacheGet = listCacheGet;

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */

  function listCacheHas(key) {
    return _assocIndexOf(this.__data__, key) > -1;
  }

  var _listCacheHas = listCacheHas;

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */

  function listCacheSet(key, value) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }

    return this;
  }

  var _listCacheSet = listCacheSet;

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function ListCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;
    this.clear();

    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  } // Add methods to `ListCache`.


  ListCache.prototype.clear = _listCacheClear;
  ListCache.prototype['delete'] = _listCacheDelete;
  ListCache.prototype.get = _listCacheGet;
  ListCache.prototype.has = _listCacheHas;
  ListCache.prototype.set = _listCacheSet;
  var _ListCache = ListCache;

  /* Built-in method references that are verified to be native. */

  var Map$1 = _getNative(_root, 'Map');
  var _Map = Map$1;

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */

  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      'hash': new _Hash(),
      'map': new (_Map || _ListCache)(),
      'string': new _Hash()
    };
  }

  var _mapCacheClear = mapCacheClear;

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable(value) {
    var type = _typeof(value);

    return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
  }

  var _isKeyable = isKeyable;

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */

  function getMapData(map, key) {
    var data = map.__data__;
    return _isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
  }

  var _getMapData = getMapData;

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */

  function mapCacheDelete(key) {
    var result = _getMapData(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }

  var _mapCacheDelete = mapCacheDelete;

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */

  function mapCacheGet(key) {
    return _getMapData(this, key).get(key);
  }

  var _mapCacheGet = mapCacheGet;

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */

  function mapCacheHas(key) {
    return _getMapData(this, key).has(key);
  }

  var _mapCacheHas = mapCacheHas;

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */

  function mapCacheSet(key, value) {
    var data = _getMapData(this, key),
        size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }

  var _mapCacheSet = mapCacheSet;

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function MapCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;
    this.clear();

    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  } // Add methods to `MapCache`.


  MapCache.prototype.clear = _mapCacheClear;
  MapCache.prototype['delete'] = _mapCacheDelete;
  MapCache.prototype.get = _mapCacheGet;
  MapCache.prototype.has = _mapCacheHas;
  MapCache.prototype.set = _mapCacheSet;
  var _MapCache = MapCache;

  /** Error message constants. */

  var FUNC_ERROR_TEXT = 'Expected a function';
  /**
   * Creates a function that memoizes the result of `func`. If `resolver` is
   * provided, it determines the cache key for storing the result based on the
   * arguments provided to the memoized function. By default, the first argument
   * provided to the memoized function is used as the map cache key. The `func`
   * is invoked with the `this` binding of the memoized function.
   *
   * **Note:** The cache is exposed as the `cache` property on the memoized
   * function. Its creation may be customized by replacing the `_.memoize.Cache`
   * constructor with one whose instances implement the
   * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
   * method interface of `clear`, `delete`, `get`, `has`, and `set`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to have its output memoized.
   * @param {Function} [resolver] The function to resolve the cache key.
   * @returns {Function} Returns the new memoized function.
   * @example
   *
   * var object = { 'a': 1, 'b': 2 };
   * var other = { 'c': 3, 'd': 4 };
   *
   * var values = _.memoize(_.values);
   * values(object);
   * // => [1, 2]
   *
   * values(other);
   * // => [3, 4]
   *
   * object.a = 2;
   * values(object);
   * // => [1, 2]
   *
   * // Modify the result cache.
   * values.cache.set(object, ['a', 'b']);
   * values(object);
   * // => ['a', 'b']
   *
   * // Replace `_.memoize.Cache`.
   * _.memoize.Cache = WeakMap;
   */

  function memoize(func, resolver) {
    if (typeof func != 'function' || resolver != null && typeof resolver != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }

    var memoized = function memoized() {
      var args = arguments,
          key = resolver ? resolver.apply(this, args) : args[0],
          cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }

      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };

    memoized.cache = new (memoize.Cache || _MapCache)();
    return memoized;
  } // Expose `MapCache`.


  memoize.Cache = _MapCache;
  var memoize_1 = memoize;

  /** Used as the maximum memoize cache size. */

  var MAX_MEMOIZE_SIZE = 500;
  /**
   * A specialized version of `_.memoize` which clears the memoized function's
   * cache when it exceeds `MAX_MEMOIZE_SIZE`.
   *
   * @private
   * @param {Function} func The function to have its output memoized.
   * @returns {Function} Returns the new memoized function.
   */

  function memoizeCapped(func) {
    var result = memoize_1(func, function (key) {
      if (cache.size === MAX_MEMOIZE_SIZE) {
        cache.clear();
      }

      return key;
    });
    var cache = result.cache;
    return result;
  }

  var _memoizeCapped = memoizeCapped;

  /** Used to match property names within property paths. */

  var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
  /** Used to match backslashes in property paths. */

  var reEscapeChar = /\\(\\)?/g;
  /**
   * Converts `string` to a property path array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the property path array.
   */

  var stringToPath = _memoizeCapped(function (string) {
    var result = [];

    if (string.charCodeAt(0) === 46
    /* . */
    ) {
        result.push('');
      }

    string.replace(rePropName, function (match, number, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match);
    });
    return result;
  });
  var _stringToPath = stringToPath;

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }

    return result;
  }

  var _arrayMap = arrayMap;

  /** Used as references for various `Number` constants. */

  var INFINITY = 1 / 0;
  /** Used to convert symbols to primitives and strings. */

  var symbolProto = _Symbol ? _Symbol.prototype : undefined,
      symbolToString = symbolProto ? symbolProto.toString : undefined;
  /**
   * The base implementation of `_.toString` which doesn't convert nullish
   * values to empty strings.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */

  function baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
      return value;
    }

    if (isArray_1(value)) {
      // Recursively convert values (susceptible to call stack limits).
      return _arrayMap(value, baseToString) + '';
    }

    if (isSymbol_1(value)) {
      return symbolToString ? symbolToString.call(value) : '';
    }

    var result = value + '';
    return result == '0' && 1 / value == -INFINITY ? '-0' : result;
  }

  var _baseToString = baseToString;

  /**
   * Converts `value` to a string. An empty string is returned for `null`
   * and `undefined` values. The sign of `-0` is preserved.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   * @example
   *
   * _.toString(null);
   * // => ''
   *
   * _.toString(-0);
   * // => '-0'
   *
   * _.toString([1, 2, 3]);
   * // => '1,2,3'
   */

  function toString(value) {
    return value == null ? '' : _baseToString(value);
  }

  var toString_1 = toString;

  /**
   * Casts `value` to a path array if it's not one.
   *
   * @private
   * @param {*} value The value to inspect.
   * @param {Object} [object] The object to query keys on.
   * @returns {Array} Returns the cast property path array.
   */

  function castPath(value, object) {
    if (isArray_1(value)) {
      return value;
    }

    return _isKey(value, object) ? [value] : _stringToPath(toString_1(value));
  }

  var _castPath = castPath;

  /** Used as references for various `Number` constants. */

  var INFINITY$1 = 1 / 0;
  /**
   * Converts `value` to a string key if it's not a string or symbol.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {string|symbol} Returns the key.
   */

  function toKey(value) {
    if (typeof value == 'string' || isSymbol_1(value)) {
      return value;
    }

    var result = value + '';
    return result == '0' && 1 / value == -INFINITY$1 ? '-0' : result;
  }

  var _toKey = toKey;

  /**
   * The base implementation of `_.get` without support for default values.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @returns {*} Returns the resolved value.
   */

  function baseGet(object, path) {
    path = _castPath(path, object);
    var index = 0,
        length = path.length;

    while (object != null && index < length) {
      object = object[_toKey(path[index++])];
    }

    return index && index == length ? object : undefined;
  }

  var _baseGet = baseGet;

  /**
   * Gets the value at `path` of `object`. If the resolved value is
   * `undefined`, the `defaultValue` is returned in its place.
   *
   * @static
   * @memberOf _
   * @since 3.7.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @param {*} [defaultValue] The value returned for `undefined` resolved values.
   * @returns {*} Returns the resolved value.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 3 } }] };
   *
   * _.get(object, 'a[0].b.c');
   * // => 3
   *
   * _.get(object, ['a', '0', 'b', 'c']);
   * // => 3
   *
   * _.get(object, 'a.b.c', 'default');
   * // => 'default'
   */

  function get(object, path, defaultValue) {
    var result = object == null ? undefined : _baseGet(object, path);
    return result === undefined ? defaultValue : result;
  }

  var get_1 = get;

  /** Built-in value references. */

  var objectCreate = Object.create;
  /**
   * The base implementation of `_.create` without support for assigning
   * properties to the created object.
   *
   * @private
   * @param {Object} proto The object to inherit from.
   * @returns {Object} Returns the new object.
   */

  var baseCreate = function () {
    function object() {}

    return function (proto) {
      if (!isObject_1(proto)) {
        return {};
      }

      if (objectCreate) {
        return objectCreate(proto);
      }

      object.prototype = proto;
      var result = new object();
      object.prototype = undefined;
      return result;
    };
  }();

  var _baseCreate = baseCreate;

  /**
   * The function whose prototype chain sequence wrappers inherit from.
   *
   * @private
   */
  function baseLodash() {// No operation performed.
  }

  var _baseLodash = baseLodash;

  /**
   * The base constructor for creating `lodash` wrapper objects.
   *
   * @private
   * @param {*} value The value to wrap.
   * @param {boolean} [chainAll] Enable explicit method chain sequences.
   */

  function LodashWrapper(value, chainAll) {
    this.__wrapped__ = value;
    this.__actions__ = [];
    this.__chain__ = !!chainAll;
    this.__index__ = 0;
    this.__values__ = undefined;
  }

  LodashWrapper.prototype = _baseCreate(_baseLodash.prototype);
  LodashWrapper.prototype.constructor = LodashWrapper;
  var _LodashWrapper = LodashWrapper;

  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */
  function arrayPush(array, values) {
    var index = -1,
        length = values.length,
        offset = array.length;

    while (++index < length) {
      array[offset + index] = values[index];
    }

    return array;
  }

  var _arrayPush = arrayPush;

  /** `Object#toString` result references. */

  var argsTag = '[object Arguments]';
  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */

  function baseIsArguments(value) {
    return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
  }

  var _baseIsArguments = baseIsArguments;

  /** Used for built-in method references. */

  var objectProto$5 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
  /** Built-in value references. */

  var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;
  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */

  var isArguments = _baseIsArguments(function () {
    return arguments;
  }()) ? _baseIsArguments : function (value) {
    return isObjectLike_1(value) && hasOwnProperty$4.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
  };
  var isArguments_1 = isArguments;

  /** Built-in value references. */

  var spreadableSymbol = _Symbol ? _Symbol.isConcatSpreadable : undefined;
  /**
   * Checks if `value` is a flattenable `arguments` object or array.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
   */

  function isFlattenable(value) {
    return isArray_1(value) || isArguments_1(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
  }

  var _isFlattenable = isFlattenable;

  /**
   * The base implementation of `_.flatten` with support for restricting flattening.
   *
   * @private
   * @param {Array} array The array to flatten.
   * @param {number} depth The maximum recursion depth.
   * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
   * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
   * @param {Array} [result=[]] The initial result value.
   * @returns {Array} Returns the new flattened array.
   */

  function baseFlatten(array, depth, predicate, isStrict, result) {
    var index = -1,
        length = array.length;
    predicate || (predicate = _isFlattenable);
    result || (result = []);

    while (++index < length) {
      var value = array[index];

      if (depth > 0 && predicate(value)) {
        if (depth > 1) {
          // Recursively flatten arrays (susceptible to call stack limits).
          baseFlatten(value, depth - 1, predicate, isStrict, result);
        } else {
          _arrayPush(result, value);
        }
      } else if (!isStrict) {
        result[result.length] = value;
      }
    }

    return result;
  }

  var _baseFlatten = baseFlatten;

  /**
   * Flattens `array` a single level deep.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to flatten.
   * @returns {Array} Returns the new flattened array.
   * @example
   *
   * _.flatten([1, [2, [3, [4]], 5]]);
   * // => [1, 2, [3, [4]], 5]
   */

  function flatten(array) {
    var length = array == null ? 0 : array.length;
    return length ? _baseFlatten(array, 1) : [];
  }

  var flatten_1 = flatten;

  /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0:
        return func.call(thisArg);

      case 1:
        return func.call(thisArg, args[0]);

      case 2:
        return func.call(thisArg, args[0], args[1]);

      case 3:
        return func.call(thisArg, args[0], args[1], args[2]);
    }

    return func.apply(thisArg, args);
  }

  var _apply = apply;

  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeMax = Math.max;
  /**
   * A specialized version of `baseRest` which transforms the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @param {Function} transform The rest array transform.
   * @returns {Function} Returns the new function.
   */

  function overRest(func, start, transform) {
    start = nativeMax(start === undefined ? func.length - 1 : start, 0);
    return function () {
      var args = arguments,
          index = -1,
          length = nativeMax(args.length - start, 0),
          array = Array(length);

      while (++index < length) {
        array[index] = args[start + index];
      }

      index = -1;
      var otherArgs = Array(start + 1);

      while (++index < start) {
        otherArgs[index] = args[index];
      }

      otherArgs[start] = transform(array);
      return _apply(func, this, otherArgs);
    };
  }

  var _overRest = overRest;

  /**
   * Creates a function that returns `value`.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {*} value The value to return from the new function.
   * @returns {Function} Returns the new constant function.
   * @example
   *
   * var objects = _.times(2, _.constant({ 'a': 1 }));
   *
   * console.log(objects);
   * // => [{ 'a': 1 }, { 'a': 1 }]
   *
   * console.log(objects[0] === objects[1]);
   * // => true
   */
  function constant(value) {
    return function () {
      return value;
    };
  }

  var constant_1 = constant;

  var defineProperty = function () {
    try {
      var func = _getNative(Object, 'defineProperty');
      func({}, '', {});
      return func;
    } catch (e) {}
  }();

  var _defineProperty = defineProperty;

  /**
   * This method returns the first argument it receives.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'a': 1 };
   *
   * console.log(_.identity(object) === object);
   * // => true
   */
  function identity(value) {
    return value;
  }

  var identity_1 = identity;

  /**
   * The base implementation of `setToString` without support for hot loop shorting.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */

  var baseSetToString = !_defineProperty ? identity_1 : function (func, string) {
    return _defineProperty(func, 'toString', {
      'configurable': true,
      'enumerable': false,
      'value': constant_1(string),
      'writable': true
    });
  };
  var _baseSetToString = baseSetToString;

  /** Used to detect hot functions by number of calls within a span of milliseconds. */
  var HOT_COUNT = 800,
      HOT_SPAN = 16;
  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeNow = Date.now;
  /**
   * Creates a function that'll short out and invoke `identity` instead
   * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
   * milliseconds.
   *
   * @private
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new shortable function.
   */

  function shortOut(func) {
    var count = 0,
        lastCalled = 0;
    return function () {
      var stamp = nativeNow(),
          remaining = HOT_SPAN - (stamp - lastCalled);
      lastCalled = stamp;

      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0];
        }
      } else {
        count = 0;
      }

      return func.apply(undefined, arguments);
    };
  }

  var _shortOut = shortOut;

  /**
   * Sets the `toString` method of `func` to return `string`.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */

  var setToString = _shortOut(_baseSetToString);
  var _setToString = setToString;

  /**
   * A specialized version of `baseRest` which flattens the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @returns {Function} Returns the new function.
   */

  function flatRest(func) {
    return _setToString(_overRest(func, undefined, flatten_1), func + '');
  }

  var _flatRest = flatRest;

  /* Built-in method references that are verified to be native. */

  var WeakMap = _getNative(_root, 'WeakMap');
  var _WeakMap = WeakMap;

  /** Used to store function metadata. */

  var metaMap = _WeakMap && new _WeakMap();
  var _metaMap = metaMap;

  /**
   * This method returns `undefined`.
   *
   * @static
   * @memberOf _
   * @since 2.3.0
   * @category Util
   * @example
   *
   * _.times(2, _.noop);
   * // => [undefined, undefined]
   */
  function noop() {// No operation performed.
  }

  var noop_1 = noop;

  /**
   * Gets metadata for `func`.
   *
   * @private
   * @param {Function} func The function to query.
   * @returns {*} Returns the metadata for `func`.
   */

  var getData = !_metaMap ? noop_1 : function (func) {
    return _metaMap.get(func);
  };
  var _getData = getData;

  /** Used to lookup unminified function names. */
  var realNames = {};
  var _realNames = realNames;

  /** Used for built-in method references. */

  var objectProto$6 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
  /**
   * Gets the name of `func`.
   *
   * @private
   * @param {Function} func The function to query.
   * @returns {string} Returns the function name.
   */

  function getFuncName(func) {
    var result = func.name + '',
        array = _realNames[result],
        length = hasOwnProperty$5.call(_realNames, result) ? array.length : 0;

    while (length--) {
      var data = array[length],
          otherFunc = data.func;

      if (otherFunc == null || otherFunc == func) {
        return data.name;
      }
    }

    return result;
  }

  var _getFuncName = getFuncName;

  /** Used as references for the maximum length and index of an array. */

  var MAX_ARRAY_LENGTH = 4294967295;
  /**
   * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
   *
   * @private
   * @constructor
   * @param {*} value The value to wrap.
   */

  function LazyWrapper(value) {
    this.__wrapped__ = value;
    this.__actions__ = [];
    this.__dir__ = 1;
    this.__filtered__ = false;
    this.__iteratees__ = [];
    this.__takeCount__ = MAX_ARRAY_LENGTH;
    this.__views__ = [];
  } // Ensure `LazyWrapper` is an instance of `baseLodash`.


  LazyWrapper.prototype = _baseCreate(_baseLodash.prototype);
  LazyWrapper.prototype.constructor = LazyWrapper;
  var _LazyWrapper = LazyWrapper;

  /**
   * Copies the values of `source` to `array`.
   *
   * @private
   * @param {Array} source The array to copy values from.
   * @param {Array} [array=[]] The array to copy values to.
   * @returns {Array} Returns `array`.
   */
  function copyArray(source, array) {
    var index = -1,
        length = source.length;
    array || (array = Array(length));

    while (++index < length) {
      array[index] = source[index];
    }

    return array;
  }

  var _copyArray = copyArray;

  /**
   * Creates a clone of `wrapper`.
   *
   * @private
   * @param {Object} wrapper The wrapper to clone.
   * @returns {Object} Returns the cloned wrapper.
   */

  function wrapperClone(wrapper) {
    if (wrapper instanceof _LazyWrapper) {
      return wrapper.clone();
    }

    var result = new _LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
    result.__actions__ = _copyArray(wrapper.__actions__);
    result.__index__ = wrapper.__index__;
    result.__values__ = wrapper.__values__;
    return result;
  }

  var _wrapperClone = wrapperClone;

  /** Used for built-in method references. */

  var objectProto$7 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
  /**
   * Creates a `lodash` object which wraps `value` to enable implicit method
   * chain sequences. Methods that operate on and return arrays, collections,
   * and functions can be chained together. Methods that retrieve a single value
   * or may return a primitive value will automatically end the chain sequence
   * and return the unwrapped value. Otherwise, the value must be unwrapped
   * with `_#value`.
   *
   * Explicit chain sequences, which must be unwrapped with `_#value`, may be
   * enabled using `_.chain`.
   *
   * The execution of chained methods is lazy, that is, it's deferred until
   * `_#value` is implicitly or explicitly called.
   *
   * Lazy evaluation allows several methods to support shortcut fusion.
   * Shortcut fusion is an optimization to merge iteratee calls; this avoids
   * the creation of intermediate arrays and can greatly reduce the number of
   * iteratee executions. Sections of a chain sequence qualify for shortcut
   * fusion if the section is applied to an array and iteratees accept only
   * one argument. The heuristic for whether a section qualifies for shortcut
   * fusion is subject to change.
   *
   * Chaining is supported in custom builds as long as the `_#value` method is
   * directly or indirectly included in the build.
   *
   * In addition to lodash methods, wrappers have `Array` and `String` methods.
   *
   * The wrapper `Array` methods are:
   * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
   *
   * The wrapper `String` methods are:
   * `replace` and `split`
   *
   * The wrapper methods that support shortcut fusion are:
   * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
   * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
   * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
   *
   * The chainable wrapper methods are:
   * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
   * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
   * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
   * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
   * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
   * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
   * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
   * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
   * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
   * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
   * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
   * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
   * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
   * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
   * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
   * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
   * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
   * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
   * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
   * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
   * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
   * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
   * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
   * `zipObject`, `zipObjectDeep`, and `zipWith`
   *
   * The wrapper methods that are **not** chainable by default are:
   * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
   * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
   * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
   * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
   * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
   * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
   * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
   * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
   * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
   * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
   * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
   * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
   * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
   * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
   * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
   * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
   * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
   * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
   * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
   * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
   * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
   * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
   * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
   * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
   * `upperFirst`, `value`, and `words`
   *
   * @name _
   * @constructor
   * @category Seq
   * @param {*} value The value to wrap in a `lodash` instance.
   * @returns {Object} Returns the new `lodash` wrapper instance.
   * @example
   *
   * function square(n) {
   *   return n * n;
   * }
   *
   * var wrapped = _([1, 2, 3]);
   *
   * // Returns an unwrapped value.
   * wrapped.reduce(_.add);
   * // => 6
   *
   * // Returns a wrapped value.
   * var squares = wrapped.map(square);
   *
   * _.isArray(squares);
   * // => false
   *
   * _.isArray(squares.value());
   * // => true
   */

  function lodash(value) {
    if (isObjectLike_1(value) && !isArray_1(value) && !(value instanceof _LazyWrapper)) {
      if (value instanceof _LodashWrapper) {
        return value;
      }

      if (hasOwnProperty$6.call(value, '__wrapped__')) {
        return _wrapperClone(value);
      }
    }

    return new _LodashWrapper(value);
  } // Ensure wrappers are instances of `baseLodash`.


  lodash.prototype = _baseLodash.prototype;
  lodash.prototype.constructor = lodash;
  var wrapperLodash = lodash;

  /**
   * Checks if `func` has a lazy counterpart.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
   *  else `false`.
   */

  function isLaziable(func) {
    var funcName = _getFuncName(func),
        other = wrapperLodash[funcName];

    if (typeof other != 'function' || !(funcName in _LazyWrapper.prototype)) {
      return false;
    }

    if (func === other) {
      return true;
    }

    var data = _getData(other);
    return !!data && func === data[0];
  }

  var _isLaziable = isLaziable;

  /** Error message constants. */

  var FUNC_ERROR_TEXT$1 = 'Expected a function';
  /** Used to compose bitmasks for function metadata. */

  var WRAP_CURRY_FLAG = 8,
      WRAP_PARTIAL_FLAG = 32,
      WRAP_ARY_FLAG = 128,
      WRAP_REARG_FLAG = 256;
  /**
   * Creates a `_.flow` or `_.flowRight` function.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new flow function.
   */

  function createFlow(fromRight) {
    return _flatRest(function (funcs) {
      var length = funcs.length,
          index = length,
          prereq = _LodashWrapper.prototype.thru;

      if (fromRight) {
        funcs.reverse();
      }

      while (index--) {
        var func = funcs[index];

        if (typeof func != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT$1);
        }

        if (prereq && !wrapper && _getFuncName(func) == 'wrapper') {
          var wrapper = new _LodashWrapper([], true);
        }
      }

      index = wrapper ? index : length;

      while (++index < length) {
        func = funcs[index];
        var funcName = _getFuncName(func),
            data = funcName == 'wrapper' ? _getData(func) : undefined;

        if (data && _isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
          wrapper = wrapper[_getFuncName(data[0])].apply(wrapper, data[3]);
        } else {
          wrapper = func.length == 1 && _isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
        }
      }

      return function () {
        var args = arguments,
            value = args[0];

        if (wrapper && args.length == 1 && isArray_1(value)) {
          return wrapper.plant(value).value();
        }

        var index = 0,
            result = length ? funcs[index].apply(this, args) : value;

        while (++index < length) {
          result = funcs[index].call(this, result);
        }

        return result;
      };
    });
  }

  var _createFlow = createFlow;

  /**
   * Creates a function that returns the result of invoking the given functions
   * with the `this` binding of the created function, where each successive
   * invocation is supplied the return value of the previous.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Util
   * @param {...(Function|Function[])} [funcs] The functions to invoke.
   * @returns {Function} Returns the new composite function.
   * @see _.flowRight
   * @example
   *
   * function square(n) {
   *   return n * n;
   * }
   *
   * var addSquare = _.flow([_.add, square]);
   * addSquare(1, 2);
   * // => 9
   */

  var flow = _createFlow();
  var flow_1 = flow;

  /**
   * The base implementation of `_.slice` without an iteratee call guard.
   *
   * @private
   * @param {Array} array The array to slice.
   * @param {number} [start=0] The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns the slice of `array`.
   */
  function baseSlice(array, start, end) {
    var index = -1,
        length = array.length;

    if (start < 0) {
      start = -start > length ? 0 : length + start;
    }

    end = end > length ? length : end;

    if (end < 0) {
      end += length;
    }

    length = start > end ? 0 : end - start >>> 0;
    start >>>= 0;
    var result = Array(length);

    while (++index < length) {
      result[index] = array[index + start];
    }

    return result;
  }

  var _baseSlice = baseSlice;

  /**
   * Casts `array` to a slice if it's needed.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {number} start The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns the cast slice.
   */

  function castSlice(array, start, end) {
    var length = array.length;
    end = end === undefined ? length : end;
    return !start && end >= length ? array : _baseSlice(array, start, end);
  }

  var _castSlice = castSlice;

  /** Used to compose unicode character classes. */
  var rsAstralRange = "\\ud800-\\udfff",
      rsComboMarksRange = "\\u0300-\\u036f",
      reComboHalfMarksRange = "\\ufe20-\\ufe2f",
      rsComboSymbolsRange = "\\u20d0-\\u20ff",
      rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
      rsVarRange = "\\ufe0e\\ufe0f";
  /** Used to compose unicode capture groups. */

  var rsZWJ = "\\u200d";
  /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */

  var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + ']');
  /**
   * Checks if `string` contains Unicode symbols.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {boolean} Returns `true` if a symbol is found, else `false`.
   */

  function hasUnicode(string) {
    return reHasUnicode.test(string);
  }

  var _hasUnicode = hasUnicode;

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER = 9007199254740991;
  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */

  function isLength(value) {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }

  var isLength_1 = isLength;

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */

  function isArrayLike(value) {
    return value != null && isLength_1(value.length) && !isFunction_1(value);
  }

  var isArrayLike_1 = isArrayLike;

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER$1 = 9007199254740991;
  /** Used to detect unsigned integer values. */

  var reIsUint = /^(?:0|[1-9]\d*)$/;
  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */

  function isIndex(value, length) {
    var type = _typeof(value);

    length = length == null ? MAX_SAFE_INTEGER$1 : length;
    return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
  }

  var _isIndex = isIndex;

  /**
   * Checks if the given arguments are from an iteratee call.
   *
   * @private
   * @param {*} value The potential iteratee value argument.
   * @param {*} index The potential iteratee index or key argument.
   * @param {*} object The potential iteratee object argument.
   * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
   *  else `false`.
   */

  function isIterateeCall(value, index, object) {
    if (!isObject_1(object)) {
      return false;
    }

    var type = _typeof(index);

    if (type == 'number' ? isArrayLike_1(object) && _isIndex(index, object.length) : type == 'string' && index in object) {
      return eq_1(object[index], value);
    }

    return false;
  }

  var _isIterateeCall = isIterateeCall;

  /** `Object#toString` result references. */

  var regexpTag = '[object RegExp]';
  /**
   * The base implementation of `_.isRegExp` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
   */

  function baseIsRegExp(value) {
    return isObjectLike_1(value) && _baseGetTag(value) == regexpTag;
  }

  var _baseIsRegExp = baseIsRegExp;

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function (value) {
      return func(value);
    };
  }

  var _baseUnary = baseUnary;

  var _nodeUtil = createCommonjsModule(function (module, exports) {
    /** Detect free variable `exports`. */
    var freeExports =  exports && !exports.nodeType && exports;
    /** Detect free variable `module`. */

    var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
    /** Detect the popular CommonJS extension `module.exports`. */

    var moduleExports = freeModule && freeModule.exports === freeExports;
    /** Detect free variable `process` from Node.js. */

    var freeProcess = moduleExports && _freeGlobal.process;
    /** Used to access faster Node.js helpers. */

    var nodeUtil = function () {
      try {
        // Use `util.types` for Node.js 10+.
        var types = freeModule && freeModule.require && freeModule.require('util').types;

        if (types) {
          return types;
        } // Legacy `process.binding('util')` for Node.js < 10.


        return freeProcess && freeProcess.binding && freeProcess.binding('util');
      } catch (e) {}
    }();

    module.exports = nodeUtil;
  });

  /* Node.js helper references. */

  var nodeIsRegExp = _nodeUtil && _nodeUtil.isRegExp;
  /**
   * Checks if `value` is classified as a `RegExp` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
   * @example
   *
   * _.isRegExp(/abc/);
   * // => true
   *
   * _.isRegExp('/abc/');
   * // => false
   */

  var isRegExp = nodeIsRegExp ? _baseUnary(nodeIsRegExp) : _baseIsRegExp;
  var isRegExp_1 = isRegExp;

  /**
   * Converts an ASCII `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function asciiToArray(string) {
    return string.split('');
  }

  var _asciiToArray = asciiToArray;

  /** Used to compose unicode character classes. */
  var rsAstralRange$1 = "\\ud800-\\udfff",
      rsComboMarksRange$1 = "\\u0300-\\u036f",
      reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f",
      rsComboSymbolsRange$1 = "\\u20d0-\\u20ff",
      rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1,
      rsVarRange$1 = "\\ufe0e\\ufe0f";
  /** Used to compose unicode capture groups. */

  var rsAstral = '[' + rsAstralRange$1 + ']',
      rsCombo = '[' + rsComboRange$1 + ']',
      rsFitz = "\\ud83c[\\udffb-\\udfff]",
      rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
      rsNonAstral = '[^' + rsAstralRange$1 + ']',
      rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      rsZWJ$1 = "\\u200d";
  /** Used to compose unicode regexes. */

  var reOptMod = rsModifier + '?',
      rsOptVar = '[' + rsVarRange$1 + ']?',
      rsOptJoin = '(?:' + rsZWJ$1 + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
      rsSeq = rsOptVar + reOptMod + rsOptJoin,
      rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
  /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */

  var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');
  /**
   * Converts a Unicode `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */

  function unicodeToArray(string) {
    return string.match(reUnicode) || [];
  }

  var _unicodeToArray = unicodeToArray;

  /**
   * Converts `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */

  function stringToArray(string) {
    return _hasUnicode(string) ? _unicodeToArray(string) : _asciiToArray(string);
  }

  var _stringToArray = stringToArray;

  /** Used as references for the maximum length and index of an array. */

  var MAX_ARRAY_LENGTH$1 = 4294967295;
  /**
   * Splits `string` by `separator`.
   *
   * **Note:** This method is based on
   * [`String#split`](https://mdn.io/String/split).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category String
   * @param {string} [string=''] The string to split.
   * @param {RegExp|string} separator The separator pattern to split by.
   * @param {number} [limit] The length to truncate results to.
   * @returns {Array} Returns the string segments.
   * @example
   *
   * _.split('a-b-c', '-', 2);
   * // => ['a', 'b']
   */

  function split(string, separator, limit) {
    if (limit && typeof limit != 'number' && _isIterateeCall(string, separator, limit)) {
      separator = limit = undefined;
    }

    limit = limit === undefined ? MAX_ARRAY_LENGTH$1 : limit >>> 0;

    if (!limit) {
      return [];
    }

    string = toString_1(string);

    if (string && (typeof separator == 'string' || separator != null && !isRegExp_1(separator))) {
      separator = _baseToString(separator);

      if (!separator && _hasUnicode(string)) {
        return _castSlice(_stringToArray(string), 0, limit);
      }
    }

    return string.split(separator, limit);
  }

  var split_1 = split;

  /**
   * The base implementation of `_.nth` which doesn't coerce arguments.
   *
   * @private
   * @param {Array} array The array to query.
   * @param {number} n The index of the element to return.
   * @returns {*} Returns the nth element of `array`.
   */

  function baseNth(array, n) {
    var length = array.length;

    if (!length) {
      return;
    }

    n += n < 0 ? length : 0;
    return _isIndex(n, length) ? array[n] : undefined;
  }

  var _baseNth = baseNth;

  /** Used as references for various `Number` constants. */

  var NAN = 0 / 0;
  /** Used to match leading and trailing whitespace. */

  var reTrim = /^\s+|\s+$/g;
  /** Used to detect bad signed hexadecimal string values. */

  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
  /** Used to detect binary string values. */

  var reIsBinary = /^0b[01]+$/i;
  /** Used to detect octal string values. */

  var reIsOctal = /^0o[0-7]+$/i;
  /** Built-in method references without a dependency on `root`. */

  var freeParseInt = parseInt;
  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */

  function toNumber(value) {
    if (typeof value == 'number') {
      return value;
    }

    if (isSymbol_1(value)) {
      return NAN;
    }

    if (isObject_1(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject_1(other) ? other + '' : other;
    }

    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }

    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
  }

  var toNumber_1 = toNumber;

  /** Used as references for various `Number` constants. */

  var INFINITY$2 = 1 / 0,
      MAX_INTEGER = 1.7976931348623157e+308;
  /**
   * Converts `value` to a finite number.
   *
   * @static
   * @memberOf _
   * @since 4.12.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {number} Returns the converted number.
   * @example
   *
   * _.toFinite(3.2);
   * // => 3.2
   *
   * _.toFinite(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toFinite(Infinity);
   * // => 1.7976931348623157e+308
   *
   * _.toFinite('3.2');
   * // => 3.2
   */

  function toFinite(value) {
    if (!value) {
      return value === 0 ? value : 0;
    }

    value = toNumber_1(value);

    if (value === INFINITY$2 || value === -INFINITY$2) {
      var sign = value < 0 ? -1 : 1;
      return sign * MAX_INTEGER;
    }

    return value === value ? value : 0;
  }

  var toFinite_1 = toFinite;

  /**
   * Converts `value` to an integer.
   *
   * **Note:** This method is loosely based on
   * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {number} Returns the converted integer.
   * @example
   *
   * _.toInteger(3.2);
   * // => 3
   *
   * _.toInteger(Number.MIN_VALUE);
   * // => 0
   *
   * _.toInteger(Infinity);
   * // => 1.7976931348623157e+308
   *
   * _.toInteger('3.2');
   * // => 3
   */

  function toInteger(value) {
    var result = toFinite_1(value),
        remainder = result % 1;
    return result === result ? remainder ? result - remainder : result : 0;
  }

  var toInteger_1 = toInteger;

  /**
   * Gets the element at index `n` of `array`. If `n` is negative, the nth
   * element from the end is returned.
   *
   * @static
   * @memberOf _
   * @since 4.11.0
   * @category Array
   * @param {Array} array The array to query.
   * @param {number} [n=0] The index of the element to return.
   * @returns {*} Returns the nth element of `array`.
   * @example
   *
   * var array = ['a', 'b', 'c', 'd'];
   *
   * _.nth(array, 1);
   * // => 'b'
   *
   * _.nth(array, -2);
   * // => 'c';
   */

  function nth(array, n) {
    return array && array.length ? _baseNth(array, toInteger_1(n)) : undefined;
  }

  var nth_1 = nth;

  /**
   * Replaces matches for `pattern` in `string` with `replacement`.
   *
   * **Note:** This method is based on
   * [`String#replace`](https://mdn.io/String/replace).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category String
   * @param {string} [string=''] The string to modify.
   * @param {RegExp|string} pattern The pattern to replace.
   * @param {Function|string} replacement The match replacement.
   * @returns {string} Returns the modified string.
   * @example
   *
   * _.replace('Hi Fred', 'Fred', 'Barney');
   * // => 'Hi Barney'
   */

  function replace() {
    var args = arguments,
        string = toString_1(args[0]);
    return args.length < 3 ? string : string.replace(args[1], args[2]);
  }

  var replace_1 = replace;

  var _this = undefined;

  var getLocalValue = function getLocalValue(str, localStorage) {
    _newArrowCheck(this, _this);

    return localStorage ? localStorage.getItem(str) : null;
  }.bind(undefined);

  var toJson = function toJson(str) {
    _newArrowCheck(this, _this);

    try {
      return JSON.parse(str);
    } catch (e) {
      return null;
    }
  }.bind(undefined);

  var getAuthToken = function getAuthToken(parsedToken) {
    _newArrowCheck(this, _this);

    return replace_1(get_1(parsedToken, 'data.token'), 'Bearer ');
  }.bind(undefined);

  var extractSeekerIdFromJwtPayload = function extractSeekerIdFromJwtPayload(jwtString) {
    _newArrowCheck(this, _this);

    try {
      var payloadString = nth_1(split_1(jwtString, '.', 2), 1);
      var payload = toJson(atob(payloadString || ''));
      return get_1(payload, 'sub.id');
    } catch (e) {
      return null;
    }
  }.bind(undefined);

  var getJobSeekerId = function getJobSeekerId() {
    var localStorage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.localStorage;

    _newArrowCheck(this, _this);

    return flow_1([getLocalValue, toJson, getAuthToken, extractSeekerIdFromJwtPayload])('SeekAuthorisationToken', localStorage) || '';
  }.bind(undefined);

  /**
   * Removes all key-value entries from the stack.
   *
   * @private
   * @name clear
   * @memberOf Stack
   */

  function stackClear() {
    this.__data__ = new _ListCache();
    this.size = 0;
  }

  var _stackClear = stackClear;

  /**
   * Removes `key` and its value from the stack.
   *
   * @private
   * @name delete
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function stackDelete(key) {
    var data = this.__data__,
        result = data['delete'](key);
    this.size = data.size;
    return result;
  }

  var _stackDelete = stackDelete;

  /**
   * Gets the stack value for `key`.
   *
   * @private
   * @name get
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function stackGet(key) {
    return this.__data__.get(key);
  }

  var _stackGet = stackGet;

  /**
   * Checks if a stack value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function stackHas(key) {
    return this.__data__.has(key);
  }

  var _stackHas = stackHas;

  /** Used as the size to enable large array optimizations. */

  var LARGE_ARRAY_SIZE = 200;
  /**
   * Sets the stack `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Stack
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the stack cache instance.
   */

  function stackSet(key, value) {
    var data = this.__data__;

    if (data instanceof _ListCache) {
      var pairs = data.__data__;

      if (!_Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }

      data = this.__data__ = new _MapCache(pairs);
    }

    data.set(key, value);
    this.size = data.size;
    return this;
  }

  var _stackSet = stackSet;

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function Stack(entries) {
    var data = this.__data__ = new _ListCache(entries);
    this.size = data.size;
  } // Add methods to `Stack`.


  Stack.prototype.clear = _stackClear;
  Stack.prototype['delete'] = _stackDelete;
  Stack.prototype.get = _stackGet;
  Stack.prototype.has = _stackHas;
  Stack.prototype.set = _stackSet;
  var _Stack = Stack;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';
  /**
   * Adds `value` to the array cache.
   *
   * @private
   * @name add
   * @memberOf SetCache
   * @alias push
   * @param {*} value The value to cache.
   * @returns {Object} Returns the cache instance.
   */

  function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED$2);

    return this;
  }

  var _setCacheAdd = setCacheAdd;

  /**
   * Checks if `value` is in the array cache.
   *
   * @private
   * @name has
   * @memberOf SetCache
   * @param {*} value The value to search for.
   * @returns {number} Returns `true` if `value` is found, else `false`.
   */
  function setCacheHas(value) {
    return this.__data__.has(value);
  }

  var _setCacheHas = setCacheHas;

  /**
   *
   * Creates an array cache object to store unique values.
   *
   * @private
   * @constructor
   * @param {Array} [values] The values to cache.
   */

  function SetCache(values) {
    var index = -1,
        length = values == null ? 0 : values.length;
    this.__data__ = new _MapCache();

    while (++index < length) {
      this.add(values[index]);
    }
  } // Add methods to `SetCache`.


  SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
  SetCache.prototype.has = _setCacheHas;
  var _SetCache = SetCache;

  /**
   * A specialized version of `_.some` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   */
  function arraySome(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }

    return false;
  }

  var _arraySome = arraySome;

  /**
   * Checks if a `cache` value for `key` exists.
   *
   * @private
   * @param {Object} cache The cache to query.
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function cacheHas(cache, key) {
    return cache.has(key);
  }

  var _cacheHas = cacheHas;

  /** Used to compose bitmasks for value comparisons. */

  var COMPARE_PARTIAL_FLAG = 1,
      COMPARE_UNORDERED_FLAG = 2;
  /**
   * A specialized version of `baseIsEqualDeep` for arrays with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Array} array The array to compare.
   * @param {Array} other The other array to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `array` and `other` objects.
   * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
   */

  function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
        arrLength = array.length,
        othLength = other.length;

    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false;
    } // Assume cyclic values are equal.


    var stacked = stack.get(array);

    if (stacked && stack.get(other)) {
      return stacked == other;
    }

    var index = -1,
        result = true,
        seen = bitmask & COMPARE_UNORDERED_FLAG ? new _SetCache() : undefined;
    stack.set(array, other);
    stack.set(other, array); // Ignore non-index properties.

    while (++index < arrLength) {
      var arrValue = array[index],
          othValue = other[index];

      if (customizer) {
        var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
      }

      if (compared !== undefined) {
        if (compared) {
          continue;
        }

        result = false;
        break;
      } // Recursively compare arrays (susceptible to call stack limits).


      if (seen) {
        if (!_arraySome(other, function (othValue, othIndex) {
          if (!_cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
            return seen.push(othIndex);
          }
        })) {
          result = false;
          break;
        }
      } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
        result = false;
        break;
      }
    }

    stack['delete'](array);
    stack['delete'](other);
    return result;
  }

  var _equalArrays = equalArrays;

  /** Built-in value references. */

  var Uint8Array$1 = _root.Uint8Array;
  var _Uint8Array = Uint8Array$1;

  /**
   * Converts `map` to its key-value pairs.
   *
   * @private
   * @param {Object} map The map to convert.
   * @returns {Array} Returns the key-value pairs.
   */
  function mapToArray(map) {
    var index = -1,
        result = Array(map.size);
    map.forEach(function (value, key) {
      result[++index] = [key, value];
    });
    return result;
  }

  var _mapToArray = mapToArray;

  /**
   * Converts `set` to an array of its values.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the values.
   */
  function setToArray(set) {
    var index = -1,
        result = Array(set.size);
    set.forEach(function (value) {
      result[++index] = value;
    });
    return result;
  }

  var _setToArray = setToArray;

  /** Used to compose bitmasks for value comparisons. */

  var COMPARE_PARTIAL_FLAG$1 = 1,
      COMPARE_UNORDERED_FLAG$1 = 2;
  /** `Object#toString` result references. */

  var boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      regexpTag$1 = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      symbolTag$1 = '[object Symbol]';
  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]';
  /** Used to convert symbols to primitives and strings. */

  var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined,
      symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : undefined;
  /**
   * A specialized version of `baseIsEqualDeep` for comparing objects of
   * the same `toStringTag`.
   *
   * **Note:** This function only supports comparing values with tags of
   * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {string} tag The `toStringTag` of the objects to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */

  function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
      case dataViewTag:
        if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
          return false;
        }

        object = object.buffer;
        other = other.buffer;

      case arrayBufferTag:
        if (object.byteLength != other.byteLength || !equalFunc(new _Uint8Array(object), new _Uint8Array(other))) {
          return false;
        }

        return true;

      case boolTag:
      case dateTag:
      case numberTag:
        // Coerce booleans to `1` or `0` and dates to milliseconds.
        // Invalid dates are coerced to `NaN`.
        return eq_1(+object, +other);

      case errorTag:
        return object.name == other.name && object.message == other.message;

      case regexpTag$1:
      case stringTag:
        // Coerce regexes to strings and treat strings, primitives and objects,
        // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
        // for more details.
        return object == other + '';

      case mapTag:
        var convert = _mapToArray;

      case setTag:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1;
        convert || (convert = _setToArray);

        if (object.size != other.size && !isPartial) {
          return false;
        } // Assume cyclic values are equal.


        var stacked = stack.get(object);

        if (stacked) {
          return stacked == other;
        }

        bitmask |= COMPARE_UNORDERED_FLAG$1; // Recursively compare objects (susceptible to call stack limits).

        stack.set(object, other);
        var result = _equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
        stack['delete'](object);
        return result;

      case symbolTag$1:
        if (symbolValueOf) {
          return symbolValueOf.call(object) == symbolValueOf.call(other);
        }

    }

    return false;
  }

  var _equalByTag = equalByTag;

  /**
   * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
   * `keysFunc` and `symbolsFunc` to get the enumerable property names and
   * symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @param {Function} symbolsFunc The function to get the symbols of `object`.
   * @returns {Array} Returns the array of property names and symbols.
   */

  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
  }

  var _baseGetAllKeys = baseGetAllKeys;

  /**
   * A specialized version of `_.filter` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  function arrayFilter(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];

      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }

    return result;
  }

  var _arrayFilter = arrayFilter;

  /**
   * This method returns a new empty array.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {Array} Returns the new empty array.
   * @example
   *
   * var arrays = _.times(2, _.stubArray);
   *
   * console.log(arrays);
   * // => [[], []]
   *
   * console.log(arrays[0] === arrays[1]);
   * // => false
   */
  function stubArray() {
    return [];
  }

  var stubArray_1 = stubArray;

  /** Used for built-in method references. */

  var objectProto$8 = Object.prototype;
  /** Built-in value references. */

  var propertyIsEnumerable$1 = objectProto$8.propertyIsEnumerable;
  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeGetSymbols = Object.getOwnPropertySymbols;
  /**
   * Creates an array of the own enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */

  var getSymbols = !nativeGetSymbols ? stubArray_1 : function (object) {
    if (object == null) {
      return [];
    }

    object = Object(object);
    return _arrayFilter(nativeGetSymbols(object), function (symbol) {
      return propertyIsEnumerable$1.call(object, symbol);
    });
  };
  var _getSymbols = getSymbols;

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }

    return result;
  }

  var _baseTimes = baseTimes;

  /**
   * This method returns `false`.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {boolean} Returns `false`.
   * @example
   *
   * _.times(2, _.stubFalse);
   * // => [false, false]
   */
  function stubFalse() {
    return false;
  }

  var stubFalse_1 = stubFalse;

  var isBuffer_1 = createCommonjsModule(function (module, exports) {
    /** Detect free variable `exports`. */
    var freeExports =  exports && !exports.nodeType && exports;
    /** Detect free variable `module`. */

    var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
    /** Detect the popular CommonJS extension `module.exports`. */

    var moduleExports = freeModule && freeModule.exports === freeExports;
    /** Built-in value references. */

    var Buffer = moduleExports ? _root.Buffer : undefined;
    /* Built-in method references for those with the same name as other `lodash` methods. */

    var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
    /**
     * Checks if `value` is a buffer.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
     * @example
     *
     * _.isBuffer(new Buffer(2));
     * // => true
     *
     * _.isBuffer(new Uint8Array(2));
     * // => false
     */

    var isBuffer = nativeIsBuffer || stubFalse_1;
    module.exports = isBuffer;
  });

  /** `Object#toString` result references. */

  var argsTag$1 = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag$1 = '[object Boolean]',
      dateTag$1 = '[object Date]',
      errorTag$1 = '[object Error]',
      funcTag$1 = '[object Function]',
      mapTag$1 = '[object Map]',
      numberTag$1 = '[object Number]',
      objectTag = '[object Object]',
      regexpTag$2 = '[object RegExp]',
      setTag$1 = '[object Set]',
      stringTag$1 = '[object String]',
      weakMapTag = '[object WeakMap]';
  var arrayBufferTag$1 = '[object ArrayBuffer]',
      dataViewTag$1 = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';
  /** Used to identify `toStringTag` values of typed arrays. */

  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] = typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag$1] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$1] = typedArrayTags[numberTag$1] = typedArrayTags[objectTag] = typedArrayTags[regexpTag$2] = typedArrayTags[setTag$1] = typedArrayTags[stringTag$1] = typedArrayTags[weakMapTag] = false;
  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */

  function baseIsTypedArray(value) {
    return isObjectLike_1(value) && isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
  }

  var _baseIsTypedArray = baseIsTypedArray;

  /* Node.js helper references. */

  var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;
  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */

  var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;
  var isTypedArray_1 = isTypedArray;

  /** Used for built-in method references. */

  var objectProto$9 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */

  function arrayLikeKeys(value, inherited) {
    var isArr = isArray_1(value),
        isArg = !isArr && isArguments_1(value),
        isBuff = !isArr && !isArg && isBuffer_1(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? _baseTimes(value.length, String) : [],
        length = result.length;

    for (var key in value) {
      if ((inherited || hasOwnProperty$7.call(value, key)) && !(skipIndexes && ( // Safari 9 has enumerable `arguments.length` in strict mode.
      key == 'length' || // Node.js 0.10 has enumerable non-index properties on buffers.
      isBuff && (key == 'offset' || key == 'parent') || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') || // Skip index properties.
      _isIndex(key, length)))) {
        result.push(key);
      }
    }

    return result;
  }

  var _arrayLikeKeys = arrayLikeKeys;

  /** Used for built-in method references. */
  var objectProto$a = Object.prototype;
  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */

  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = typeof Ctor == 'function' && Ctor.prototype || objectProto$a;
    return value === proto;
  }

  var _isPrototype = isPrototype;

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function (arg) {
      return func(transform(arg));
    };
  }

  var _overArg = overArg;

  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeKeys = _overArg(Object.keys, Object);
  var _nativeKeys = nativeKeys;

  /** Used for built-in method references. */

  var objectProto$b = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$8 = objectProto$b.hasOwnProperty;
  /**
   * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */

  function baseKeys(object) {
    if (!_isPrototype(object)) {
      return _nativeKeys(object);
    }

    var result = [];

    for (var key in Object(object)) {
      if (hasOwnProperty$8.call(object, key) && key != 'constructor') {
        result.push(key);
      }
    }

    return result;
  }

  var _baseKeys = baseKeys;

  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * for more details.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */

  function keys(object) {
    return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
  }

  var keys_1 = keys;

  /**
   * Creates an array of own enumerable property names and symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */

  function getAllKeys(object) {
    return _baseGetAllKeys(object, keys_1, _getSymbols);
  }

  var _getAllKeys = getAllKeys;

  /** Used to compose bitmasks for value comparisons. */

  var COMPARE_PARTIAL_FLAG$2 = 1;
  /** Used for built-in method references. */

  var objectProto$c = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$9 = objectProto$c.hasOwnProperty;
  /**
   * A specialized version of `baseIsEqualDeep` for objects with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */

  function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2,
        objProps = _getAllKeys(object),
        objLength = objProps.length,
        othProps = _getAllKeys(other),
        othLength = othProps.length;

    if (objLength != othLength && !isPartial) {
      return false;
    }

    var index = objLength;

    while (index--) {
      var key = objProps[index];

      if (!(isPartial ? key in other : hasOwnProperty$9.call(other, key))) {
        return false;
      }
    } // Assume cyclic values are equal.


    var stacked = stack.get(object);

    if (stacked && stack.get(other)) {
      return stacked == other;
    }

    var result = true;
    stack.set(object, other);
    stack.set(other, object);
    var skipCtor = isPartial;

    while (++index < objLength) {
      key = objProps[index];
      var objValue = object[key],
          othValue = other[key];

      if (customizer) {
        var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
      } // Recursively compare objects (susceptible to call stack limits).


      if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
        result = false;
        break;
      }

      skipCtor || (skipCtor = key == 'constructor');
    }

    if (result && !skipCtor) {
      var objCtor = object.constructor,
          othCtor = other.constructor; // Non `Object` object instances with different constructors are not equal.

      if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
        result = false;
      }
    }

    stack['delete'](object);
    stack['delete'](other);
    return result;
  }

  var _equalObjects = equalObjects;

  /* Built-in method references that are verified to be native. */

  var DataView = _getNative(_root, 'DataView');
  var _DataView = DataView;

  /* Built-in method references that are verified to be native. */

  var Promise$1 = _getNative(_root, 'Promise');
  var _Promise = Promise$1;

  /* Built-in method references that are verified to be native. */

  var Set = _getNative(_root, 'Set');
  var _Set = Set;

  /** `Object#toString` result references. */

  var mapTag$2 = '[object Map]',
      objectTag$1 = '[object Object]',
      promiseTag = '[object Promise]',
      setTag$2 = '[object Set]',
      weakMapTag$1 = '[object WeakMap]';
  var dataViewTag$2 = '[object DataView]';
  /** Used to detect maps, sets, and weakmaps. */

  var dataViewCtorString = _toSource(_DataView),
      mapCtorString = _toSource(_Map),
      promiseCtorString = _toSource(_Promise),
      setCtorString = _toSource(_Set),
      weakMapCtorString = _toSource(_WeakMap);
  /**
   * Gets the `toStringTag` of `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */

  var getTag = _baseGetTag; // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.

  if (_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$2 || _Map && getTag(new _Map()) != mapTag$2 || _Promise && getTag(_Promise.resolve()) != promiseTag || _Set && getTag(new _Set()) != setTag$2 || _WeakMap && getTag(new _WeakMap()) != weakMapTag$1) {
    getTag = function getTag(value) {
      var result = _baseGetTag(value),
          Ctor = result == objectTag$1 ? value.constructor : undefined,
          ctorString = Ctor ? _toSource(Ctor) : '';

      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag$2;

          case mapCtorString:
            return mapTag$2;

          case promiseCtorString:
            return promiseTag;

          case setCtorString:
            return setTag$2;

          case weakMapCtorString:
            return weakMapTag$1;
        }
      }

      return result;
    };
  }

  var _getTag = getTag;

  /** Used to compose bitmasks for value comparisons. */

  var COMPARE_PARTIAL_FLAG$3 = 1;
  /** `Object#toString` result references. */

  var argsTag$2 = '[object Arguments]',
      arrayTag$1 = '[object Array]',
      objectTag$2 = '[object Object]';
  /** Used for built-in method references. */

  var objectProto$d = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$a = objectProto$d.hasOwnProperty;
  /**
   * A specialized version of `baseIsEqual` for arrays and objects which performs
   * deep comparisons and tracks traversed objects enabling objects with circular
   * references to be compared.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} [stack] Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */

  function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray_1(object),
        othIsArr = isArray_1(other),
        objTag = objIsArr ? arrayTag$1 : _getTag(object),
        othTag = othIsArr ? arrayTag$1 : _getTag(other);
    objTag = objTag == argsTag$2 ? objectTag$2 : objTag;
    othTag = othTag == argsTag$2 ? objectTag$2 : othTag;
    var objIsObj = objTag == objectTag$2,
        othIsObj = othTag == objectTag$2,
        isSameTag = objTag == othTag;

    if (isSameTag && isBuffer_1(object)) {
      if (!isBuffer_1(other)) {
        return false;
      }

      objIsArr = true;
      objIsObj = false;
    }

    if (isSameTag && !objIsObj) {
      stack || (stack = new _Stack());
      return objIsArr || isTypedArray_1(object) ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack) : _equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }

    if (!(bitmask & COMPARE_PARTIAL_FLAG$3)) {
      var objIsWrapped = objIsObj && hasOwnProperty$a.call(object, '__wrapped__'),
          othIsWrapped = othIsObj && hasOwnProperty$a.call(other, '__wrapped__');

      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object,
            othUnwrapped = othIsWrapped ? other.value() : other;
        stack || (stack = new _Stack());
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
      }
    }

    if (!isSameTag) {
      return false;
    }

    stack || (stack = new _Stack());
    return _equalObjects(object, other, bitmask, customizer, equalFunc, stack);
  }

  var _baseIsEqualDeep = baseIsEqualDeep;

  /**
   * The base implementation of `_.isEqual` which supports partial comparisons
   * and tracks traversed objects.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @param {boolean} bitmask The bitmask flags.
   *  1 - Unordered comparison
   *  2 - Partial comparison
   * @param {Function} [customizer] The function to customize comparisons.
   * @param {Object} [stack] Tracks traversed `value` and `other` objects.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   */

  function baseIsEqual(value, other, bitmask, customizer, stack) {
    if (value === other) {
      return true;
    }

    if (value == null || other == null || !isObjectLike_1(value) && !isObjectLike_1(other)) {
      return value !== value && other !== other;
    }

    return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
  }

  var _baseIsEqual = baseIsEqual;

  /** Used to compose bitmasks for value comparisons. */

  var COMPARE_PARTIAL_FLAG$4 = 1,
      COMPARE_UNORDERED_FLAG$2 = 2;
  /**
   * The base implementation of `_.isMatch` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to inspect.
   * @param {Object} source The object of property values to match.
   * @param {Array} matchData The property names, values, and compare flags to match.
   * @param {Function} [customizer] The function to customize comparisons.
   * @returns {boolean} Returns `true` if `object` is a match, else `false`.
   */

  function baseIsMatch(object, source, matchData, customizer) {
    var index = matchData.length,
        length = index,
        noCustomizer = !customizer;

    if (object == null) {
      return !length;
    }

    object = Object(object);

    while (index--) {
      var data = matchData[index];

      if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
        return false;
      }
    }

    while (++index < length) {
      data = matchData[index];
      var key = data[0],
          objValue = object[key],
          srcValue = data[1];

      if (noCustomizer && data[2]) {
        if (objValue === undefined && !(key in object)) {
          return false;
        }
      } else {
        var stack = new _Stack();

        if (customizer) {
          var result = customizer(objValue, srcValue, key, object, source, stack);
        }

        if (!(result === undefined ? _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$4 | COMPARE_UNORDERED_FLAG$2, customizer, stack) : result)) {
          return false;
        }
      }
    }

    return true;
  }

  var _baseIsMatch = baseIsMatch;

  /**
   * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` if suitable for strict
   *  equality comparisons, else `false`.
   */

  function isStrictComparable(value) {
    return value === value && !isObject_1(value);
  }

  var _isStrictComparable = isStrictComparable;

  /**
   * Gets the property names, values, and compare flags of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the match data of `object`.
   */

  function getMatchData(object) {
    var result = keys_1(object),
        length = result.length;

    while (length--) {
      var key = result[length],
          value = object[key];
      result[length] = [key, value, _isStrictComparable(value)];
    }

    return result;
  }

  var _getMatchData = getMatchData;

  /**
   * A specialized version of `matchesProperty` for source values suitable
   * for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @param {*} srcValue The value to match.
   * @returns {Function} Returns the new spec function.
   */
  function matchesStrictComparable(key, srcValue) {
    return function (object) {
      if (object == null) {
        return false;
      }

      return object[key] === srcValue && (srcValue !== undefined || key in Object(object));
    };
  }

  var _matchesStrictComparable = matchesStrictComparable;

  /**
   * The base implementation of `_.matches` which doesn't clone `source`.
   *
   * @private
   * @param {Object} source The object of property values to match.
   * @returns {Function} Returns the new spec function.
   */

  function baseMatches(source) {
    var matchData = _getMatchData(source);

    if (matchData.length == 1 && matchData[0][2]) {
      return _matchesStrictComparable(matchData[0][0], matchData[0][1]);
    }

    return function (object) {
      return object === source || _baseIsMatch(object, source, matchData);
    };
  }

  var _baseMatches = baseMatches;

  /**
   * The base implementation of `_.hasIn` without support for deep paths.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {Array|string} key The key to check.
   * @returns {boolean} Returns `true` if `key` exists, else `false`.
   */
  function baseHasIn(object, key) {
    return object != null && key in Object(object);
  }

  var _baseHasIn = baseHasIn;

  /**
   * Checks if `path` exists on `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @param {Function} hasFunc The function to check properties.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   */

  function hasPath(object, path, hasFunc) {
    path = _castPath(path, object);
    var index = -1,
        length = path.length,
        result = false;

    while (++index < length) {
      var key = _toKey(path[index]);

      if (!(result = object != null && hasFunc(object, key))) {
        break;
      }

      object = object[key];
    }

    if (result || ++index != length) {
      return result;
    }

    length = object == null ? 0 : object.length;
    return !!length && isLength_1(length) && _isIndex(key, length) && (isArray_1(object) || isArguments_1(object));
  }

  var _hasPath = hasPath;

  /**
   * Checks if `path` is a direct or inherited property of `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   * @example
   *
   * var object = _.create({ 'a': _.create({ 'b': 2 }) });
   *
   * _.hasIn(object, 'a');
   * // => true
   *
   * _.hasIn(object, 'a.b');
   * // => true
   *
   * _.hasIn(object, ['a', 'b']);
   * // => true
   *
   * _.hasIn(object, 'b');
   * // => false
   */

  function hasIn(object, path) {
    return object != null && _hasPath(object, path, _baseHasIn);
  }

  var hasIn_1 = hasIn;

  /** Used to compose bitmasks for value comparisons. */

  var COMPARE_PARTIAL_FLAG$5 = 1,
      COMPARE_UNORDERED_FLAG$3 = 2;
  /**
   * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
   *
   * @private
   * @param {string} path The path of the property to get.
   * @param {*} srcValue The value to match.
   * @returns {Function} Returns the new spec function.
   */

  function baseMatchesProperty(path, srcValue) {
    if (_isKey(path) && _isStrictComparable(srcValue)) {
      return _matchesStrictComparable(_toKey(path), srcValue);
    }

    return function (object) {
      var objValue = get_1(object, path);
      return objValue === undefined && objValue === srcValue ? hasIn_1(object, path) : _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$5 | COMPARE_UNORDERED_FLAG$3);
    };
  }

  var _baseMatchesProperty = baseMatchesProperty;

  /**
   * The base implementation of `_.property` without support for deep paths.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function baseProperty(key) {
    return function (object) {
      return object == null ? undefined : object[key];
    };
  }

  var _baseProperty = baseProperty;

  /**
   * A specialized version of `baseProperty` which supports deep paths.
   *
   * @private
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new accessor function.
   */

  function basePropertyDeep(path) {
    return function (object) {
      return _baseGet(object, path);
    };
  }

  var _basePropertyDeep = basePropertyDeep;

  /**
   * Creates a function that returns the value at `path` of a given object.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new accessor function.
   * @example
   *
   * var objects = [
   *   { 'a': { 'b': 2 } },
   *   { 'a': { 'b': 1 } }
   * ];
   *
   * _.map(objects, _.property('a.b'));
   * // => [2, 1]
   *
   * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
   * // => [1, 2]
   */

  function property(path) {
    return _isKey(path) ? _baseProperty(_toKey(path)) : _basePropertyDeep(path);
  }

  var property_1 = property;

  /**
   * The base implementation of `_.iteratee`.
   *
   * @private
   * @param {*} [value=_.identity] The value to convert to an iteratee.
   * @returns {Function} Returns the iteratee.
   */

  function baseIteratee(value) {
    // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
    // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
    if (typeof value == 'function') {
      return value;
    }

    if (value == null) {
      return identity_1;
    }

    if (_typeof(value) == 'object') {
      return isArray_1(value) ? _baseMatchesProperty(value[0], value[1]) : _baseMatches(value);
    }

    return property_1(value);
  }

  var _baseIteratee = baseIteratee;

  /**
   * Creates a `_.find` or `_.findLast` function.
   *
   * @private
   * @param {Function} findIndexFunc The function to find the collection index.
   * @returns {Function} Returns the new find function.
   */

  function createFind(findIndexFunc) {
    return function (collection, predicate, fromIndex) {
      var iterable = Object(collection);

      if (!isArrayLike_1(collection)) {
        var iteratee = _baseIteratee(predicate);
        collection = keys_1(collection);

        predicate = function predicate(key) {
          return iteratee(iterable[key], key, iterable);
        };
      }

      var index = findIndexFunc(collection, predicate, fromIndex);
      return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
    };
  }

  var _createFind = createFind;

  /**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 1 : -1);

    while (fromRight ? index-- : ++index < length) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }

    return -1;
  }

  var _baseFindIndex = baseFindIndex;

  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeMax$1 = Math.max;
  /**
   * This method is like `_.find` except that it returns the index of the first
   * element `predicate` returns truthy for instead of the element itself.
   *
   * @static
   * @memberOf _
   * @since 1.1.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {Function} [predicate=_.identity] The function invoked per iteration.
   * @param {number} [fromIndex=0] The index to search from.
   * @returns {number} Returns the index of the found element, else `-1`.
   * @example
   *
   * var users = [
   *   { 'user': 'barney',  'active': false },
   *   { 'user': 'fred',    'active': false },
   *   { 'user': 'pebbles', 'active': true }
   * ];
   *
   * _.findIndex(users, function(o) { return o.user == 'barney'; });
   * // => 0
   *
   * // The `_.matches` iteratee shorthand.
   * _.findIndex(users, { 'user': 'fred', 'active': false });
   * // => 1
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.findIndex(users, ['active', false]);
   * // => 0
   *
   * // The `_.property` iteratee shorthand.
   * _.findIndex(users, 'active');
   * // => 2
   */

  function findIndex(array, predicate, fromIndex) {
    var length = array == null ? 0 : array.length;

    if (!length) {
      return -1;
    }

    var index = fromIndex == null ? 0 : toInteger_1(fromIndex);

    if (index < 0) {
      index = nativeMax$1(length + index, 0);
    }

    return _baseFindIndex(array, _baseIteratee(predicate), index);
  }

  var findIndex_1 = findIndex;

  /**
   * Iterates over elements of `collection`, returning the first element
   * `predicate` returns truthy for. The predicate is invoked with three
   * arguments: (value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to inspect.
   * @param {Function} [predicate=_.identity] The function invoked per iteration.
   * @param {number} [fromIndex=0] The index to search from.
   * @returns {*} Returns the matched element, else `undefined`.
   * @example
   *
   * var users = [
   *   { 'user': 'barney',  'age': 36, 'active': true },
   *   { 'user': 'fred',    'age': 40, 'active': false },
   *   { 'user': 'pebbles', 'age': 1,  'active': true }
   * ];
   *
   * _.find(users, function(o) { return o.age < 40; });
   * // => object for 'barney'
   *
   * // The `_.matches` iteratee shorthand.
   * _.find(users, { 'age': 1, 'active': true });
   * // => object for 'pebbles'
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.find(users, ['active', false]);
   * // => object for 'fred'
   *
   * // The `_.property` iteratee shorthand.
   * _.find(users, 'active');
   * // => object for 'barney'
   */

  var find = _createFind(findIndex_1);
  var find_1 = find;

  /**
   * The base implementation of `_.clamp` which doesn't coerce arguments.
   *
   * @private
   * @param {number} number The number to clamp.
   * @param {number} [lower] The lower bound.
   * @param {number} upper The upper bound.
   * @returns {number} Returns the clamped number.
   */
  function baseClamp(number, lower, upper) {
    if (number === number) {
      if (upper !== undefined) {
        number = number <= upper ? number : upper;
      }

      if (lower !== undefined) {
        number = number >= lower ? number : lower;
      }
    }

    return number;
  }

  var _baseClamp = baseClamp;

  /**
   * Checks if `string` ends with the given target string.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category String
   * @param {string} [string=''] The string to inspect.
   * @param {string} [target] The string to search for.
   * @param {number} [position=string.length] The position to search up to.
   * @returns {boolean} Returns `true` if `string` ends with `target`,
   *  else `false`.
   * @example
   *
   * _.endsWith('abc', 'c');
   * // => true
   *
   * _.endsWith('abc', 'b');
   * // => false
   *
   * _.endsWith('abc', 'b', 2);
   * // => true
   */

  function endsWith(string, target, position) {
    string = toString_1(string);
    target = _baseToString(target);
    var length = string.length;
    position = position === undefined ? length : _baseClamp(toInteger_1(position), 0, length);
    var end = position;
    position -= target.length;
    return position >= 0 && string.slice(position, end) == target;
  }

  var endsWith_1 = endsWith;

  var _this$1 = undefined;
  var partnersMapper = {
    'seek.co.nz': 'SEEK_NZ',
    'seek.com.au': 'SEEK_AU',
    'jobstreet.com.sg': 'JOBSTREET_SG',
    'hk.jobsdb.com': 'JOBS_DB_HK'
  };

  var getPartnerId = function getPartnerId(origin) {
    var _this2 = this;

    _newArrowCheck(this, _this$1);

    return find_1(partnersMapper, function (_, key) {
      _newArrowCheck(this, _this2);

      return endsWith_1(origin, key);
    }.bind(this));
  }.bind(undefined);

  var _this$2 = undefined;
  var initSol = function initSol() {
    var apiHost = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'https://web.sol-data.com';
    var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var partnerIdOverride = arguments.length > 2 ? arguments[2] : undefined;

    _newArrowCheck(this, _this$2);

    try {
      if (!get_1(window, 'sol')) {
        window.sol = noop_1;
      }

      if (!get_1(window, 'sol.loaded')) {
        new module_1();
      }
    } catch (e) {
      console.error('SOL', e);
    }

    var partnerId = partnerIdOverride || getPartnerId(window.location.origin);
    window.sol('INIT', partnerId, {
      loginId: getJobSeekerId(window.localStorage),
      debug: debug,
      apiHost: apiHost
    });
  }.bind(undefined);

  /**
   * The base implementation of `assignValue` and `assignMergeValue` without
   * value checks.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */

  function baseAssignValue(object, key, value) {
    if (key == '__proto__' && _defineProperty) {
      _defineProperty(object, key, {
        'configurable': true,
        'enumerable': true,
        'value': value,
        'writable': true
      });
    } else {
      object[key] = value;
    }
  }

  var _baseAssignValue = baseAssignValue;

  /** Used for built-in method references. */

  var objectProto$e = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$b = objectProto$e.hasOwnProperty;
  /**
   * Assigns `value` to `key` of `object` if the existing value is not equivalent
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */

  function assignValue(object, key, value) {
    var objValue = object[key];

    if (!(hasOwnProperty$b.call(object, key) && eq_1(objValue, value)) || value === undefined && !(key in object)) {
      _baseAssignValue(object, key, value);
    }
  }

  var _assignValue = assignValue;

  /**
   * The base implementation of `_.set`.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {Array|string} path The path of the property to set.
   * @param {*} value The value to set.
   * @param {Function} [customizer] The function to customize path creation.
   * @returns {Object} Returns `object`.
   */

  function baseSet(object, path, value, customizer) {
    if (!isObject_1(object)) {
      return object;
    }

    path = _castPath(path, object);
    var index = -1,
        length = path.length,
        lastIndex = length - 1,
        nested = object;

    while (nested != null && ++index < length) {
      var key = _toKey(path[index]),
          newValue = value;

      if (index != lastIndex) {
        var objValue = nested[key];
        newValue = customizer ? customizer(objValue, key, nested) : undefined;

        if (newValue === undefined) {
          newValue = isObject_1(objValue) ? objValue : _isIndex(path[index + 1]) ? [] : {};
        }
      }

      _assignValue(nested, key, newValue);
      nested = nested[key];
    }

    return object;
  }

  var _baseSet = baseSet;

  /**
   * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
   * it's created. Arrays are created for missing index properties while objects
   * are created for all other missing properties. Use `_.setWith` to customize
   * `path` creation.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 3.7.0
   * @category Object
   * @param {Object} object The object to modify.
   * @param {Array|string} path The path of the property to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 3 } }] };
   *
   * _.set(object, 'a[0].b.c', 4);
   * console.log(object.a[0].b.c);
   * // => 4
   *
   * _.set(object, ['x', '0', 'y', 'z'], 5);
   * console.log(object.x[0].y.z);
   * // => 5
   */

  function set(object, path, value) {
    return object == null ? object : _baseSet(object, path, value);
  }

  var set_1 = set;

  /** `Object#toString` result references. */

  var mapTag$3 = '[object Map]',
      setTag$3 = '[object Set]';
  /** Used for built-in method references. */

  var objectProto$f = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$c = objectProto$f.hasOwnProperty;
  /**
   * Checks if `value` is an empty object, collection, map, or set.
   *
   * Objects are considered empty if they have no own enumerable string keyed
   * properties.
   *
   * Array-like values such as `arguments` objects, arrays, buffers, strings, or
   * jQuery-like collections are considered empty if they have a `length` of `0`.
   * Similarly, maps and sets are considered empty if they have a `size` of `0`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is empty, else `false`.
   * @example
   *
   * _.isEmpty(null);
   * // => true
   *
   * _.isEmpty(true);
   * // => true
   *
   * _.isEmpty(1);
   * // => true
   *
   * _.isEmpty([1, 2, 3]);
   * // => false
   *
   * _.isEmpty({ 'a': 1 });
   * // => false
   */

  function isEmpty(value) {
    if (value == null) {
      return true;
    }

    if (isArrayLike_1(value) && (isArray_1(value) || typeof value == 'string' || typeof value.splice == 'function' || isBuffer_1(value) || isTypedArray_1(value) || isArguments_1(value))) {
      return !value.length;
    }

    var tag = _getTag(value);

    if (tag == mapTag$3 || tag == setTag$3) {
      return !value.size;
    }

    if (_isPrototype(value)) {
      return !_baseKeys(value).length;
    }

    for (var key in value) {
      if (hasOwnProperty$c.call(value, key)) {
        return false;
      }
    }

    return true;
  }

  var isEmpty_1 = isEmpty;

  /**
   * This function is like `assignValue` except that it doesn't assign
   * `undefined` values.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */

  function assignMergeValue(object, key, value) {
    if (value !== undefined && !eq_1(object[key], value) || value === undefined && !(key in object)) {
      _baseAssignValue(object, key, value);
    }
  }

  var _assignMergeValue = assignMergeValue;

  /**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseFor(fromRight) {
    return function (object, iteratee, keysFunc) {
      var index = -1,
          iterable = Object(object),
          props = keysFunc(object),
          length = props.length;

      while (length--) {
        var key = props[fromRight ? length : ++index];

        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }

      return object;
    };
  }

  var _createBaseFor = createBaseFor;

  /**
   * The base implementation of `baseForOwn` which iterates over `object`
   * properties returned by `keysFunc` and invokes `iteratee` for each property.
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */

  var baseFor = _createBaseFor();
  var _baseFor = baseFor;

  var _cloneBuffer = createCommonjsModule(function (module, exports) {
    /** Detect free variable `exports`. */
    var freeExports =  exports && !exports.nodeType && exports;
    /** Detect free variable `module`. */

    var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
    /** Detect the popular CommonJS extension `module.exports`. */

    var moduleExports = freeModule && freeModule.exports === freeExports;
    /** Built-in value references. */

    var Buffer = moduleExports ? _root.Buffer : undefined,
        allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;
    /**
     * Creates a clone of  `buffer`.
     *
     * @private
     * @param {Buffer} buffer The buffer to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Buffer} Returns the cloned buffer.
     */

    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }

      var length = buffer.length,
          result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
      buffer.copy(result);
      return result;
    }

    module.exports = cloneBuffer;
  });

  /**
   * Creates a clone of `arrayBuffer`.
   *
   * @private
   * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
   * @returns {ArrayBuffer} Returns the cloned array buffer.
   */

  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new _Uint8Array(result).set(new _Uint8Array(arrayBuffer));
    return result;
  }

  var _cloneArrayBuffer = cloneArrayBuffer;

  /**
   * Creates a clone of `typedArray`.
   *
   * @private
   * @param {Object} typedArray The typed array to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned typed array.
   */

  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? _cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }

  var _cloneTypedArray = cloneTypedArray;

  /** Built-in value references. */

  var getPrototype = _overArg(Object.getPrototypeOf, Object);
  var _getPrototype = getPrototype;

  /**
   * Initializes an object clone.
   *
   * @private
   * @param {Object} object The object to clone.
   * @returns {Object} Returns the initialized clone.
   */

  function initCloneObject(object) {
    return typeof object.constructor == 'function' && !_isPrototype(object) ? _baseCreate(_getPrototype(object)) : {};
  }

  var _initCloneObject = initCloneObject;

  /**
   * This method is like `_.isArrayLike` except that it also checks if `value`
   * is an object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array-like object,
   *  else `false`.
   * @example
   *
   * _.isArrayLikeObject([1, 2, 3]);
   * // => true
   *
   * _.isArrayLikeObject(document.body.children);
   * // => true
   *
   * _.isArrayLikeObject('abc');
   * // => false
   *
   * _.isArrayLikeObject(_.noop);
   * // => false
   */

  function isArrayLikeObject(value) {
    return isObjectLike_1(value) && isArrayLike_1(value);
  }

  var isArrayLikeObject_1 = isArrayLikeObject;

  /** `Object#toString` result references. */

  var objectTag$3 = '[object Object]';
  /** Used for built-in method references. */

  var funcProto$2 = Function.prototype,
      objectProto$g = Object.prototype;
  /** Used to resolve the decompiled source of functions. */

  var funcToString$2 = funcProto$2.toString;
  /** Used to check objects for own properties. */

  var hasOwnProperty$d = objectProto$g.hasOwnProperty;
  /** Used to infer the `Object` constructor. */

  var objectCtorString = funcToString$2.call(Object);
  /**
   * Checks if `value` is a plain object, that is, an object created by the
   * `Object` constructor or one with a `[[Prototype]]` of `null`.
   *
   * @static
   * @memberOf _
   * @since 0.8.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * _.isPlainObject(new Foo);
   * // => false
   *
   * _.isPlainObject([1, 2, 3]);
   * // => false
   *
   * _.isPlainObject({ 'x': 0, 'y': 0 });
   * // => true
   *
   * _.isPlainObject(Object.create(null));
   * // => true
   */

  function isPlainObject(value) {
    if (!isObjectLike_1(value) || _baseGetTag(value) != objectTag$3) {
      return false;
    }

    var proto = _getPrototype(value);

    if (proto === null) {
      return true;
    }

    var Ctor = hasOwnProperty$d.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString$2.call(Ctor) == objectCtorString;
  }

  var isPlainObject_1 = isPlainObject;

  /**
   * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function safeGet(object, key) {
    if (key === 'constructor' && typeof object[key] === 'function') {
      return;
    }

    if (key == '__proto__') {
      return;
    }

    return object[key];
  }

  var _safeGet = safeGet;

  /**
   * Copies properties of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy properties from.
   * @param {Array} props The property identifiers to copy.
   * @param {Object} [object={}] The object to copy properties to.
   * @param {Function} [customizer] The function to customize copied values.
   * @returns {Object} Returns `object`.
   */

  function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});
    var index = -1,
        length = props.length;

    while (++index < length) {
      var key = props[index];
      var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;

      if (newValue === undefined) {
        newValue = source[key];
      }

      if (isNew) {
        _baseAssignValue(object, key, newValue);
      } else {
        _assignValue(object, key, newValue);
      }
    }

    return object;
  }

  var _copyObject = copyObject;

  /**
   * This function is like
   * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * except that it includes inherited enumerable properties.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function nativeKeysIn(object) {
    var result = [];

    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }

    return result;
  }

  var _nativeKeysIn = nativeKeysIn;

  /** Used for built-in method references. */

  var objectProto$h = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$e = objectProto$h.hasOwnProperty;
  /**
   * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */

  function baseKeysIn(object) {
    if (!isObject_1(object)) {
      return _nativeKeysIn(object);
    }

    var isProto = _isPrototype(object),
        result = [];

    for (var key in object) {
      if (!(key == 'constructor' && (isProto || !hasOwnProperty$e.call(object, key)))) {
        result.push(key);
      }
    }

    return result;
  }

  var _baseKeysIn = baseKeysIn;

  /**
   * Creates an array of the own and inherited enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keysIn(new Foo);
   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
   */

  function keysIn(object) {
    return isArrayLike_1(object) ? _arrayLikeKeys(object, true) : _baseKeysIn(object);
  }

  var keysIn_1 = keysIn;

  /**
   * Converts `value` to a plain object flattening inherited enumerable string
   * keyed properties of `value` to own properties of the plain object.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {Object} Returns the converted plain object.
   * @example
   *
   * function Foo() {
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.assign({ 'a': 1 }, new Foo);
   * // => { 'a': 1, 'b': 2 }
   *
   * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
   * // => { 'a': 1, 'b': 2, 'c': 3 }
   */

  function toPlainObject(value) {
    return _copyObject(value, keysIn_1(value));
  }

  var toPlainObject_1 = toPlainObject;

  /**
   * A specialized version of `baseMerge` for arrays and objects which performs
   * deep merges and tracks traversed objects enabling objects with circular
   * references to be merged.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {string} key The key of the value to merge.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} mergeFunc The function to merge values.
   * @param {Function} [customizer] The function to customize assigned values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */

  function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    var objValue = _safeGet(object, key),
        srcValue = _safeGet(source, key),
        stacked = stack.get(srcValue);

    if (stacked) {
      _assignMergeValue(object, key, stacked);
      return;
    }

    var newValue = customizer ? customizer(objValue, srcValue, key + '', object, source, stack) : undefined;
    var isCommon = newValue === undefined;

    if (isCommon) {
      var isArr = isArray_1(srcValue),
          isBuff = !isArr && isBuffer_1(srcValue),
          isTyped = !isArr && !isBuff && isTypedArray_1(srcValue);
      newValue = srcValue;

      if (isArr || isBuff || isTyped) {
        if (isArray_1(objValue)) {
          newValue = objValue;
        } else if (isArrayLikeObject_1(objValue)) {
          newValue = _copyArray(objValue);
        } else if (isBuff) {
          isCommon = false;
          newValue = _cloneBuffer(srcValue, true);
        } else if (isTyped) {
          isCommon = false;
          newValue = _cloneTypedArray(srcValue, true);
        } else {
          newValue = [];
        }
      } else if (isPlainObject_1(srcValue) || isArguments_1(srcValue)) {
        newValue = objValue;

        if (isArguments_1(objValue)) {
          newValue = toPlainObject_1(objValue);
        } else if (!isObject_1(objValue) || isFunction_1(objValue)) {
          newValue = _initCloneObject(srcValue);
        }
      } else {
        isCommon = false;
      }
    }

    if (isCommon) {
      // Recursively merge objects and arrays (susceptible to call stack limits).
      stack.set(srcValue, newValue);
      mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
      stack['delete'](srcValue);
    }

    _assignMergeValue(object, key, newValue);
  }

  var _baseMergeDeep = baseMergeDeep;

  /**
   * The base implementation of `_.merge` without support for multiple sources.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} [customizer] The function to customize merged values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */

  function baseMerge(object, source, srcIndex, customizer, stack) {
    if (object === source) {
      return;
    }

    _baseFor(source, function (srcValue, key) {
      stack || (stack = new _Stack());

      if (isObject_1(srcValue)) {
        _baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
      } else {
        var newValue = customizer ? customizer(_safeGet(object, key), srcValue, key + '', object, source, stack) : undefined;

        if (newValue === undefined) {
          newValue = srcValue;
        }

        _assignMergeValue(object, key, newValue);
      }
    }, keysIn_1);
  }

  var _baseMerge = baseMerge;

  /**
   * The base implementation of `_.rest` which doesn't validate or coerce arguments.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @returns {Function} Returns the new function.
   */

  function baseRest(func, start) {
    return _setToString(_overRest(func, start, identity_1), func + '');
  }

  var _baseRest = baseRest;

  /**
   * Creates a function like `_.assign`.
   *
   * @private
   * @param {Function} assigner The function to assign values.
   * @returns {Function} Returns the new assigner function.
   */

  function createAssigner(assigner) {
    return _baseRest(function (object, sources) {
      var index = -1,
          length = sources.length,
          customizer = length > 1 ? sources[length - 1] : undefined,
          guard = length > 2 ? sources[2] : undefined;
      customizer = assigner.length > 3 && typeof customizer == 'function' ? (length--, customizer) : undefined;

      if (guard && _isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length < 3 ? undefined : customizer;
        length = 1;
      }

      object = Object(object);

      while (++index < length) {
        var source = sources[index];

        if (source) {
          assigner(object, source, index, customizer);
        }
      }

      return object;
    });
  }

  var _createAssigner = createAssigner;

  /**
   * This method is like `_.assign` except that it recursively merges own and
   * inherited enumerable string keyed properties of source objects into the
   * destination object. Source properties that resolve to `undefined` are
   * skipped if a destination value exists. Array and plain object properties
   * are merged recursively. Other objects and value types are overridden by
   * assignment. Source objects are applied from left to right. Subsequent
   * sources overwrite property assignments of previous sources.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 0.5.0
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var object = {
   *   'a': [{ 'b': 2 }, { 'd': 4 }]
   * };
   *
   * var other = {
   *   'a': [{ 'c': 3 }, { 'e': 5 }]
   * };
   *
   * _.merge(object, other);
   * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
   */

  var merge = _createAssigner(function (object, source, srcIndex) {
    _baseMerge(object, source, srcIndex);
  });
  var merge_1 = merge;

  var _this$3 = undefined;
  var addTags = function addTags(solMetaData, extraTags) {
    _newArrowCheck(this, _this$3);

    return !isEmpty_1(extraTags) ? set_1(solMetaData, 'tags', merge_1(get_1(solMetaData, 'tags'), extraTags)) : solMetaData;
  }.bind(undefined);

  /**
   * Checks if `string` starts with the given target string.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category String
   * @param {string} [string=''] The string to inspect.
   * @param {string} [target] The string to search for.
   * @param {number} [position=0] The position to search from.
   * @returns {boolean} Returns `true` if `string` starts with `target`,
   *  else `false`.
   * @example
   *
   * _.startsWith('abc', 'a');
   * // => true
   *
   * _.startsWith('abc', 'b');
   * // => false
   *
   * _.startsWith('abc', 'b', 1);
   * // => true
   */

  function startsWith(string, target, position) {
    string = toString_1(string);
    position = position == null ? 0 : _baseClamp(toInteger_1(position), 0, string.length);
    target = _baseToString(target);
    return string.slice(position, position + target.length) == target;
  }

  var startsWith_1 = startsWith;

  /**
   * The base implementation of methods like `_.max` and `_.min` which accepts a
   * `comparator` to determine the extremum value.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The iteratee invoked per iteration.
   * @param {Function} comparator The comparator used to compare values.
   * @returns {*} Returns the extremum value.
   */

  function baseExtremum(array, iteratee, comparator) {
    var index = -1,
        length = array.length;

    while (++index < length) {
      var value = array[index],
          current = iteratee(value);

      if (current != null && (computed === undefined ? current === current && !isSymbol_1(current) : comparator(current, computed))) {
        var computed = current,
            result = value;
      }
    }

    return result;
  }

  var _baseExtremum = baseExtremum;

  /**
   * The base implementation of `_.gt` which doesn't coerce arguments.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if `value` is greater than `other`,
   *  else `false`.
   */
  function baseGt(value, other) {
    return value > other;
  }

  var _baseGt = baseGt;

  /**
   * Computes the maximum value of `array`. If `array` is empty or falsey,
   * `undefined` is returned.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Math
   * @param {Array} array The array to iterate over.
   * @returns {*} Returns the maximum value.
   * @example
   *
   * _.max([4, 2, 8, 6]);
   * // => 8
   *
   * _.max([]);
   * // => undefined
   */

  function max(array) {
    return array && array.length ? _baseExtremum(array, identity_1, _baseGt) : undefined;
  }

  var max_1 = max;

  var _this$4 = undefined;
  var Event;

  (function (Event) {
    Event["ACTIVITY"] = "ACTIVITY";
    Event["DISPLAY"] = "DISPLAY";
    Event["IMPRESSION"] = "MONITOR:IMPRESSION";
    Event["IMPRESSION_OFF"] = "MONITOR:IMPRESSION:OFF";
    Event["SEARCH"] = "SEARCH";
  })(Event || (Event = {}));

  var RECOMMENDATIONS_TOKEN_PREFIX = '1~';

  var isRecommendationMetaData = function isRecommendationMetaData(solMetaData) {
    _newArrowCheck(this, _this$4);

    return startsWith_1(get_1(solMetaData, 'token'), RECOMMENDATIONS_TOKEN_PREFIX);
  }.bind(undefined);

  var updateLoginId = function updateLoginId() {
    _newArrowCheck(this, _this$4);

    window.sol('CONFIG', {
      loginId: getJobSeekerId(window.localStorage)
    });
  }.bind(undefined);

  var getViewportWidth = function getViewportWidth() {
    _newArrowCheck(this, _this$4);

    return max_1([get_1(document, 'documentElement.clientWidth'), get_1(window, 'innerWidth'), 0]);
  }.bind(undefined);

  var getViewportHeight = function getViewportHeight() {
    _newArrowCheck(this, _this$4);

    return max_1([get_1(document, 'documentElement.clientHeight'), get_1(window, 'innerHeight'), 0]);
  }.bind(undefined);

  var getVersion = function getVersion() {
    _newArrowCheck(this, _this$4);

    var g = window;
    return "".concat(g.solTaggingVersion || '');
  }.bind(undefined);

  var addSizeTags = function addSizeTags(solMetadata) {
    _newArrowCheck(this, _this$4);

    return addTags(solMetadata, {
      'seek:innerWidth': "".concat(getViewportWidth()),
      'seek:innerHeight': "".concat(getViewportHeight()),
      'seek:customVersion': "".concat(getVersion())
    });
  }.bind(undefined);

  var addPageTags = function addPageTags(solMetadata, page) {
    _newArrowCheck(this, _this$4);

    return addTags(solMetadata, {
      'seek:page': page
    });
  }.bind(undefined);

  var PageName;

  (function (PageName) {
    PageName["HOME"] = "HOME";
    PageName["SERP"] = "SERP";
    PageName["JDP"] = "JDP";
    PageName["APPLY"] = "APPLY";
    PageName["RECOMMENDATIONS"] = "RECOMMENDATIONS";
  })(PageName || (PageName = {}));
  var getSolWrapper = function getSolWrapper() {
    var _this2 = this;

    var isServer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _newArrowCheck(this, _this$4);

    if (isServer) {
      return {
        trackSearchEvent: noop_1,
        trackDisplayEvent: noop_1,
        trackHomePageRow: noop_1,
        monitorSearchImpression: noop_1,
        monitorSearchImpressionOff: noop_1,
        monitorImpression: noop_1,
        monitorImpressionOff: noop_1,
        trackActivity: noop_1,
        trackActivityWithTags: noop_1
      };
    }

    return {
      trackSearchEvent: function trackSearchEvent(solMetaData, page, onComplete) {
        _newArrowCheck(this, _this2);

        updateLoginId();
        window.sol(Event.SEARCH, addPageTags(addSizeTags(solMetaData), page), onComplete);
      }.bind(this),
      trackDisplayEvent: function trackDisplayEvent(solMetaData, page) {
        var isFilteredOnNew = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var onComplete = arguments.length > 3 ? arguments[3] : undefined;

        _newArrowCheck(this, _this2);

        var data = addTags(solMetaData, {
          isFilteredOnNew: isFilteredOnNew
        });
        updateLoginId();
        window.sol(Event.DISPLAY, addPageTags(addSizeTags(data), page), onComplete);
      }.bind(this),
      trackHomePageRow: function trackHomePageRow(solMetaData, page, onComplete) {
        _newArrowCheck(this, _this2);

        updateLoginId();
        var eventType = isRecommendationMetaData(solMetaData) ? Event.DISPLAY : Event.SEARCH;
        window.sol(eventType, addPageTags(addSizeTags(solMetaData), page), onComplete);
      }.bind(this),
      monitorSearchImpression: function monitorSearchImpression(node, solMetaData, page, onComplete) {
        _newArrowCheck(this, _this2);

        updateLoginId();
        window.sol(Event.IMPRESSION, node, addPageTags(addSizeTags(solMetaData), page), onComplete);
      }.bind(this),
      monitorSearchImpressionOff: function monitorSearchImpressionOff(node, solMetaData, page, onComplete) {
        _newArrowCheck(this, _this2);

        updateLoginId();
        window.sol(Event.IMPRESSION_OFF, node, addPageTags(addSizeTags(solMetaData), page), onComplete);
      }.bind(this),
      monitorImpression: function monitorImpression(node, solMetaData, page, onComplete) {
        _newArrowCheck(this, _this2);

        updateLoginId();
        window.sol(Event.IMPRESSION, node, addPageTags(addSizeTags(solMetaData), page), onComplete);
      }.bind(this),
      monitorImpressionOff: function monitorImpressionOff(node, solMetaData, page, onComplete) {
        _newArrowCheck(this, _this2);

        updateLoginId();
        window.sol(Event.IMPRESSION_OFF, node, addPageTags(addSizeTags(solMetaData), page), onComplete);
      }.bind(this),
      trackActivity: function trackActivity(trackType, solMetaData, page, onComplete) {
        _newArrowCheck(this, _this2);

        updateLoginId();
        window.sol(Event.ACTIVITY, trackType, addPageTags(addSizeTags(solMetaData), page), onComplete);
      }.bind(this),
      trackActivityWithTags: function trackActivityWithTags(trackType, solMetaData, page, tags, onComplete) {
        _newArrowCheck(this, _this2);

        updateLoginId();
        window.sol(Event.ACTIVITY, trackType, addPageTags(addSizeTags(addTags(solMetaData, tags)), page), onComplete);
      }.bind(this)
    };
  }.bind(undefined);

  var _this$5 = undefined;

  var getMetadataFor = function getMetadataFor(meta) {
    var doc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

    _newArrowCheck(this, _this$5);

    var elem = doc.querySelector("[".concat(meta, "]"));
    var solMetadata = elem ? elem.getAttribute(meta) : null;
    return solMetadata ? JSON.parse(solMetadata) : null;
  }.bind(undefined);

  var _this$6 = undefined;

  var getElementMetadataPairs = function getElementMetadataPairs(meta) {
    var _this2 = this;

    var doc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

    _newArrowCheck(this, _this$6);

    var elements = doc.querySelectorAll("[".concat(meta, "]"));
    var elementsArray = [].slice.call(elements);
    return elementsArray.map(function (element) {
      _newArrowCheck(this, _this2);

      var solMetadata = JSON.parse(element.getAttribute(meta) || '{}');
      return {
        element: element,
        solMetadata: solMetadata
      };
    }.bind(this)).filter(function (elem) {
      _newArrowCheck(this, _this2);

      return elem;
    }.bind(this));
  }.bind(undefined);

  /**
   * Creates a slice of `array` with `n` elements taken from the beginning.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to query.
   * @param {number} [n=1] The number of elements to take.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {Array} Returns the slice of `array`.
   * @example
   *
   * _.take([1, 2, 3]);
   * // => [1]
   *
   * _.take([1, 2, 3], 2);
   * // => [1, 2]
   *
   * _.take([1, 2, 3], 5);
   * // => [1, 2, 3]
   *
   * _.take([1, 2, 3], 0);
   * // => []
   */

  function take(array, n, guard) {
    if (!(array && array.length)) {
      return [];
    }

    n = guard || n === undefined ? 1 : toInteger_1(n);
    return _baseSlice(array, 0, n < 0 ? 0 : n);
  }

  var take_1 = take;

  /**
   * The base implementation of `_.values` and `_.valuesIn` which creates an
   * array of `object` property values corresponding to the property names
   * of `props`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the array of property values.
   */

  function baseValues(object, props) {
    return _arrayMap(props, function (key) {
      return object[key];
    });
  }

  var _baseValues = baseValues;

  /**
   * Creates an array of the own enumerable string keyed property values of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property values.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.values(new Foo);
   * // => [1, 2] (iteration order is not guaranteed)
   *
   * _.values('hi');
   * // => ['h', 'i']
   */

  function values(object) {
    return object == null ? [] : _baseValues(object, keys_1(object));
  }

  var values_1 = values;

  /**
   * Creates a new array concatenating `array` with any additional arrays
   * and/or values.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {Array} array The array to concatenate.
   * @param {...*} [values] The values to concatenate.
   * @returns {Array} Returns the new concatenated array.
   * @example
   *
   * var array = [1];
   * var other = _.concat(array, 2, [3], [[4]]);
   *
   * console.log(other);
   * // => [1, 2, 3, [4]]
   *
   * console.log(array);
   * // => [1]
   */

  function concat() {
    var length = arguments.length;

    if (!length) {
      return [];
    }

    var args = Array(length - 1),
        array = arguments[0],
        index = length;

    while (index--) {
      args[index - 1] = arguments[index];
    }

    return _arrayPush(isArray_1(array) ? _copyArray(array) : [array], _baseFlatten(args, 1));
  }

  var concat_1 = concat;

  var _this$7 = undefined;
  var defaultSizeLimit = 100;
  var localStorageKey = 'sol';

  var getKey = function getKey(jobMetadata) {
    _newArrowCheck(this, _this$7);

    return "".concat(get_1(jobMetadata, 'jobId'), "_").concat(get_1(jobMetadata, 'token') || get_1(jobMetadata, 'searchRequestToken'));
  }.bind(undefined);

  var mapSolMetadata = function mapSolMetadata(jobMetadataArray) {
    var _this2 = this;

    _newArrowCheck(this, _this$7);

    return jobMetadataArray.map(function (_ref) {
      var solMetadata = _ref.solMetadata;

      _newArrowCheck(this, _this2);

      return solMetadata;
    }.bind(this));
  }.bind(undefined);

  var compareEventTime = function compareEventTime(jobMetadataA, jobMetadataB) {
    _newArrowCheck(this, _this$7);

    return new Date(get_1(jobMetadataB, 'eventTime')).getTime() - new Date(get_1(jobMetadataA, 'eventTime')).getTime();
  }.bind(undefined);

  var concatSortTake = function concatSortTake(newArray, existingArray, sizeLimit) {
    _newArrowCheck(this, _this$7);

    return take_1(concat_1(newArray, existingArray).sort(compareEventTime), sizeLimit);
  }.bind(undefined);

  var mergeKeysToMetadata = function mergeKeysToMetadata(newArray, existingArray, sizeLimit) {
    var _this3 = this;

    _newArrowCheck(this, _this$7);

    return concatSortTake(newArray, existingArray, sizeLimit).reduce(function (accumulator, jobMetadata) {
      _newArrowCheck(this, _this3);

      accumulator[getKey(jobMetadata)] = jobMetadata;
      return accumulator;
    }.bind(this), {});
  }.bind(undefined);

  var getAllKeysToMetadata = function getAllKeysToMetadata() {
    var storage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.localStorage;

    _newArrowCheck(this, _this$7);

    return JSON.parse(storage.getItem(localStorageKey) || '{}');
  }.bind(undefined);

  var addJobDetailsMetadata = function addJobDetailsMetadata(arr) {
    var _this4 = this;

    var storage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.localStorage;
    var sizeLimit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultSizeLimit;

    _newArrowCheck(this, _this$7);

    var newKeysWithDate = mapSolMetadata(arr).map(function (el) {
      _newArrowCheck(this, _this4);

      return merge_1(el, {
        eventTime: new Date().getTime()
      });
    }.bind(this));
    var preExistingKeys = values_1(getAllKeysToMetadata(storage));
    var mergedKeysToMetadata = mergeKeysToMetadata(newKeysWithDate, preExistingKeys, sizeLimit);
    storage.setItem(localStorageKey, JSON.stringify(mergedKeysToMetadata));
  }.bind(undefined);

  var getDefaultTokenMetadata = function getDefaultTokenMetadata(jobId, token) {
    _newArrowCheck(this, _this$7);

    return {
      token: token || '1~00000000-0000-4000-8000-000000000000',
      jobId: jobId,
      jobAdType: 'ORGANIC'
    };
  }.bind(undefined);

  var getSearchTokenMetadata = function getSearchTokenMetadata(jobId, searchRequestToken) {
    _newArrowCheck(this, _this$7);

    return {
      searchRequestToken: searchRequestToken || '00000000-0000-4000-8000-000000000000',
      jobId: jobId,
      jobAdType: 'ORGANIC',
      section: 'MAIN',
      sectionRank: 1
    };
  }.bind(undefined);

  var getDefaultMetadata = function getDefaultMetadata(jobId, token, searchRequestToken) {
    _newArrowCheck(this, _this$7);

    return token ? getDefaultTokenMetadata("".concat(jobId), token) : getSearchTokenMetadata("".concat(jobId), searchRequestToken);
  }.bind(undefined);
  var getJobDetailsMetadata = function getJobDetailsMetadata(_ref2) {
    var searchRequestToken = _ref2.searchRequestToken,
        jobId = _ref2.jobId,
        token = _ref2.token;
    var storage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.localStorage;

    _newArrowCheck(this, _this$7);

    var tokenOrSearchRequestToken = token || searchRequestToken;
    var key = "".concat(jobId, "_").concat(tokenOrSearchRequestToken);
    return getAllKeysToMetadata(storage)[key] || getDefaultMetadata("".concat(jobId), token, searchRequestToken);
  }.bind(undefined);

  var solSearchDataAttribute = 'data-sol-meta';
  var solSearchResultDataAttribute = 'data-search-sol-meta';

  var _this$8 = undefined;

  var attachSearchResultsMonitors = function attachSearchResultsMonitors(sol, searchResultsMetadataPairs) {
    var _this2 = this;

    _newArrowCheck(this, _this$8);

    searchResultsMetadataPairs.forEach(function (_ref) {
      var element = _ref.element,
          solMetadata = _ref.solMetadata;

      _newArrowCheck(this, _this2);

      var tag = {
        'seek:functionsource': 'attachSearchResultsMonitors'
      };
      sol.monitorSearchImpression(element, addTags(solMetadata, tag), PageName.SERP);
    }.bind(this));
  }.bind(undefined);

  var SERP_PATH_REG_EX = /^\/([^\/]+-)?jobs(-in-[^\/]+)?([\/\?].*)?$/i;

  function isSearchResultsPath(path) {
    return SERP_PATH_REG_EX.test(path);
  }

  var trackSerpLoaded = function trackSerpLoaded(_ref2) {
    var _this3 = this;

    var pathname = _ref2.pathname;

    _newArrowCheck(this, _this$8);

    if (isSearchResultsPath(pathname)) {
      var sol = getSolWrapper();
      var searchMetadata = getMetadataFor(solSearchDataAttribute);
      var tag = {
        'seek:functionsource': 'trackSerpLoaded'
      };
      sol.trackSearchEvent(addTags(searchMetadata, tag), PageName.SERP);
      var searchResultsMetadataPairs = getElementMetadataPairs(solSearchResultDataAttribute);
      addJobDetailsMetadata(searchResultsMetadataPairs.map(function (_ref3) {
        var solMetadata = _ref3.solMetadata;

        _newArrowCheck(this, _this3);

        return {
          solMetadata: solMetadata
        };
      }.bind(this)));
      attachSearchResultsMonitors(sol, searchResultsMetadataPairs);
    }
  }.bind(undefined);

  var g = window;
  var solApiHost = g.solApiHost;
  var debug = g.solDebug;
  initSol(solApiHost, debug);
  trackSerpLoaded({
    pathname: window.location.pathname
  });

}));
//# sourceMappingURL=bundle-e6160f4a.js.map
