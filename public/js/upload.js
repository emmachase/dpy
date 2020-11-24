var __page = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
  var __commonJS = (callback, module) => () => {
    if (!module) {
      module = {exports: {}};
      callback(module.exports, module);
    }
    return module.exports;
  };
  var __export = (target, all) => {
    __markAsModule(target);
    for (var name in all)
      __defProp(target, name, {get: all[name], enumerable: true});
  };
  var __exportStar = (target, module) => {
    __markAsModule(target);
    if (typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, {get: () => module[key], enumerable: __getOwnPropDesc(module, key).enumerable});
    }
    return target;
  };
  var __toModule = (module) => {
    if (module && module.__esModule)
      return module;
    return __exportStar(__defProp(__create(__getProtoOf(module)), "default", {value: module, enumerable: true}), module);
  };

  // node_modules/.pnpm/react-is@16.13.1/node_modules/react-is/cjs/react-is.development.js
  var require_react_is_development = __commonJS((exports) => {
    /** @license React v16.13.1
     * react-is.development.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    "use strict";
    if (true) {
      (function() {
        "use strict";
        var hasSymbol = typeof Symbol === "function" && Symbol.for;
        var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
        var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
        var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
        var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
        var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
        var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
        var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
        var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111;
        var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
        var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
        var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
        var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
        var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
        var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
        var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
        var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117;
        var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118;
        var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
        function isValidElementType(type) {
          return typeof type === "string" || typeof type === "function" || type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
        }
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;
                switch (type) {
                  case REACT_ASYNC_MODE_TYPE:
                  case REACT_CONCURRENT_MODE_TYPE:
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                    return type;
                  default:
                    var $$typeofType = type && type.$$typeof;
                    switch ($$typeofType) {
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        var AsyncMode = REACT_ASYNC_MODE_TYPE;
        var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.");
            }
          }
          return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
        }
        function isConcurrentMode(object) {
          return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
        }
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        exports.AsyncMode = AsyncMode;
        exports.ConcurrentMode = ConcurrentMode;
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element;
        exports.ForwardRef = ForwardRef;
        exports.Fragment = Fragment;
        exports.Lazy = Lazy;
        exports.Memo = Memo;
        exports.Portal = Portal;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode;
        exports.Suspense = Suspense;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement;
        exports.isForwardRef = isForwardRef;
        exports.isFragment = isFragment;
        exports.isLazy = isLazy;
        exports.isMemo = isMemo;
        exports.isPortal = isPortal;
        exports.isProfiler = isProfiler;
        exports.isStrictMode = isStrictMode;
        exports.isSuspense = isSuspense;
        exports.isValidElementType = isValidElementType;
        exports.typeOf = typeOf;
      })();
    }
  });

  // node_modules/.pnpm/react-is@16.13.1/node_modules/react-is/index.js
  var require_react_is = __commonJS((exports, module) => {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_is_development();
    }
  });

  // node_modules/.pnpm/object-assign@4.1.1/node_modules/object-assign/index.js
  var require_object_assign = __commonJS((exports, module) => {
    /*
    object-assign
    (c) Sindre Sorhus
    @license MIT
    */
    "use strict";
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val === null || val === void 0) {
        throw new TypeError("Object.assign cannot be called with null or undefined");
      }
      return Object(val);
    }
    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        }
        var test1 = new String("abc");
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") {
          return false;
        }
        var test2 = {};
        for (var i = 0; i < 10; i++) {
          test2["_" + String.fromCharCode(i)] = i;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
          return test2[n];
        });
        if (order2.join("") !== "0123456789") {
          return false;
        }
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(letter) {
          test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    module.exports = shouldUseNative() ? Object.assign : function(target, source) {
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
  });

  // node_modules/.pnpm/prop-types@15.7.2/node_modules/prop-types/lib/ReactPropTypesSecret.js
  var require_ReactPropTypesSecret = __commonJS((exports, module) => {
    "use strict";
    var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    module.exports = ReactPropTypesSecret;
  });

  // node_modules/.pnpm/prop-types@15.7.2/node_modules/prop-types/checkPropTypes.js
  var require_checkPropTypes = __commonJS((exports, module) => {
    "use strict";
    var printWarning = function() {
    };
    if (true) {
      var ReactPropTypesSecret = require_ReactPropTypesSecret();
      var loggedTypeFailures = {};
      var has = Function.call.bind(Object.prototype.hasOwnProperty);
      printWarning = function(text) {
        var message = "Warning: " + text;
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      };
    }
    function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
      if (true) {
        for (var typeSpecName in typeSpecs) {
          if (has(typeSpecs, typeSpecName)) {
            var error;
            try {
              if (typeof typeSpecs[typeSpecName] !== "function") {
                var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.");
                err.name = "Invariant Violation";
                throw err;
              }
              error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
            } catch (ex) {
              error = ex;
            }
            if (error && !(error instanceof Error)) {
              printWarning((componentName || "React class") + ": type specification of " + location + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).");
            }
            if (error instanceof Error && !(error.message in loggedTypeFailures)) {
              loggedTypeFailures[error.message] = true;
              var stack = getStack ? getStack() : "";
              printWarning("Failed " + location + " type: " + error.message + (stack != null ? stack : ""));
            }
          }
        }
      }
    }
    checkPropTypes.resetWarningCache = function() {
      if (true) {
        loggedTypeFailures = {};
      }
    };
    module.exports = checkPropTypes;
  });

  // node_modules/.pnpm/prop-types@15.7.2/node_modules/prop-types/factoryWithTypeCheckers.js
  var require_factoryWithTypeCheckers = __commonJS((exports, module) => {
    "use strict";
    var ReactIs = require_react_is();
    var assign = require_object_assign();
    var ReactPropTypesSecret = require_ReactPropTypesSecret();
    var checkPropTypes = require_checkPropTypes();
    var has = Function.call.bind(Object.prototype.hasOwnProperty);
    var printWarning = function() {
    };
    if (true) {
      printWarning = function(text) {
        var message = "Warning: " + text;
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      };
    }
    function emptyFunctionThatReturnsNull() {
      return null;
    }
    module.exports = function(isValidElement, throwOnDirectAccess) {
      var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
        if (typeof iteratorFn === "function") {
          return iteratorFn;
        }
      }
      var ANONYMOUS = "<<anonymous>>";
      var ReactPropTypes = {
        array: createPrimitiveTypeChecker("array"),
        bool: createPrimitiveTypeChecker("boolean"),
        func: createPrimitiveTypeChecker("function"),
        number: createPrimitiveTypeChecker("number"),
        object: createPrimitiveTypeChecker("object"),
        string: createPrimitiveTypeChecker("string"),
        symbol: createPrimitiveTypeChecker("symbol"),
        any: createAnyTypeChecker(),
        arrayOf: createArrayOfTypeChecker,
        element: createElementTypeChecker(),
        elementType: createElementTypeTypeChecker(),
        instanceOf: createInstanceTypeChecker,
        node: createNodeChecker(),
        objectOf: createObjectOfTypeChecker,
        oneOf: createEnumTypeChecker,
        oneOfType: createUnionTypeChecker,
        shape: createShapeTypeChecker,
        exact: createStrictShapeTypeChecker
      };
      function is(x, y) {
        if (x === y) {
          return x !== 0 || 1 / x === 1 / y;
        } else {
          return x !== x && y !== y;
        }
      }
      function PropTypeError(message) {
        this.message = message;
        this.stack = "";
      }
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
              var err = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");
              err.name = "Invariant Violation";
              throw err;
            } else if (typeof console !== "undefined") {
              var cacheKey = componentName + ":" + propName;
              if (!manualPropTypeCallCache[cacheKey] && manualPropTypeWarningCount < 3) {
                printWarning("You are manually calling a React.PropTypes validation function for the `" + propFullName + "` prop on `" + componentName + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.");
                manualPropTypeCallCache[cacheKey] = true;
                manualPropTypeWarningCount++;
              }
            }
          }
          if (props[propName] == null) {
            if (isRequired) {
              if (props[propName] === null) {
                return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required " + ("in `" + componentName + "`, but its value is `null`."));
              }
              return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required in " + ("`" + componentName + "`, but its value is `undefined`."));
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
            var preciseType = getPreciseType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") + ("`" + expectedType + "`."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createAnyTypeChecker() {
        return createChainableTypeChecker(emptyFunctionThatReturnsNull);
      }
      function createArrayOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
          }
          var propValue = props[propName];
          if (!Array.isArray(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
          }
          for (var i = 0; i < propValue.length; i++) {
            var error = typeChecker(propValue, i, componentName, location, propFullName + "[" + i + "]", ReactPropTypesSecret);
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
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!ReactIs.isValidElementType(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement type."));
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
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") + ("instance of `" + expectedClassName + "`."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createEnumTypeChecker(expectedValues) {
        if (!Array.isArray(expectedValues)) {
          if (true) {
            if (arguments.length > 1) {
              printWarning("Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).");
            } else {
              printWarning("Invalid argument supplied to oneOf, expected an array.");
            }
          }
          return emptyFunctionThatReturnsNull;
        }
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          for (var i = 0; i < expectedValues.length; i++) {
            if (is(propValue, expectedValues[i])) {
              return null;
            }
          }
          var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
            var type = getPreciseType(value);
            if (type === "symbol") {
              return String(value);
            }
            return value;
          });
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of value `" + String(propValue) + "` " + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
        }
        return createChainableTypeChecker(validate);
      }
      function createObjectOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
          }
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
          }
          for (var key in propValue) {
            if (has(propValue, key)) {
              var error = typeChecker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
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
          printWarning("Invalid argument supplied to oneOfType, expected an instance of array.");
          return emptyFunctionThatReturnsNull;
        }
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          if (typeof checker !== "function") {
            printWarning("Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + getPostfixForTypeWarning(checker) + " at index " + i + ".");
            return emptyFunctionThatReturnsNull;
          }
        }
        function validate(props, propName, componentName, location, propFullName) {
          for (var i2 = 0; i2 < arrayOfTypeCheckers.length; i2++) {
            var checker2 = arrayOfTypeCheckers[i2];
            if (checker2(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
              return null;
            }
          }
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`."));
        }
        return createChainableTypeChecker(validate);
      }
      function createNodeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          if (!isNode(props[propName])) {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`, expected a ReactNode."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          for (var key in shapeTypes) {
            var checker = shapeTypes[key];
            if (!checker) {
              continue;
            }
            var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
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
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          var allKeys = assign({}, props[propName], shapeTypes);
          for (var key in allKeys) {
            var checker = shapeTypes[key];
            if (!checker) {
              return new PropTypeError("Invalid " + location + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(shapeTypes), null, "  "));
            }
            var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
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
          case "number":
          case "string":
          case "undefined":
            return true;
          case "boolean":
            return !propValue;
          case "object":
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
        if (propType === "symbol") {
          return true;
        }
        if (!propValue) {
          return false;
        }
        if (propValue["@@toStringTag"] === "Symbol") {
          return true;
        }
        if (typeof Symbol === "function" && propValue instanceof Symbol) {
          return true;
        }
        return false;
      }
      function getPropType(propValue) {
        var propType = typeof propValue;
        if (Array.isArray(propValue)) {
          return "array";
        }
        if (propValue instanceof RegExp) {
          return "object";
        }
        if (isSymbol(propType, propValue)) {
          return "symbol";
        }
        return propType;
      }
      function getPreciseType(propValue) {
        if (typeof propValue === "undefined" || propValue === null) {
          return "" + propValue;
        }
        var propType = getPropType(propValue);
        if (propType === "object") {
          if (propValue instanceof Date) {
            return "date";
          } else if (propValue instanceof RegExp) {
            return "regexp";
          }
        }
        return propType;
      }
      function getPostfixForTypeWarning(value) {
        var type = getPreciseType(value);
        switch (type) {
          case "array":
          case "object":
            return "an " + type;
          case "boolean":
          case "date":
          case "regexp":
            return "a " + type;
          default:
            return type;
        }
      }
      function getClassName(propValue) {
        if (!propValue.constructor || !propValue.constructor.name) {
          return ANONYMOUS;
        }
        return propValue.constructor.name;
      }
      ReactPropTypes.checkPropTypes = checkPropTypes;
      ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
      ReactPropTypes.PropTypes = ReactPropTypes;
      return ReactPropTypes;
    };
  });

  // node_modules/.pnpm/prop-types@15.7.2/node_modules/prop-types/index.js
  var require_prop_types = __commonJS((exports, module) => {
    if (true) {
      var ReactIs = require_react_is();
      var throwOnDirectAccess = true;
      module.exports = require_factoryWithTypeCheckers()(ReactIs.isElement, throwOnDirectAccess);
    } else {
      module.exports = null();
    }
  });

  // node_modules/.pnpm/react-hamburger-menu@1.2.1_react@17.0.1/node_modules/react-hamburger-menu/dist/HamburgerMenu.js
  var require_HamburgerMenu = __commonJS((exports) => {
    "use strict";
    exports.__esModule = true;
    exports["default"] = HamburgerMenu2;
    var _react = _interopRequireDefault(require("react"));
    var _propTypes = _interopRequireDefault(require_prop_types());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    function HamburgerMenu2(props) {
      var width = (props.width || 36) + "px", height = (props.height || 30) + "px", halfHeight = parseInt(height.replace("px", "")) / 2 + "px", isOpen = props.isOpen || false, strokeWidth = props.strokeWidth || 2, halfStrokeWidth = "-" + strokeWidth / 2 + "px", animationDuration = props.animationDuration || "0.4";
      var getTransformValue = function getTransformValue2(isOpen2, defaultPos, rotateVal) {
        return "translate3d(0," + (isOpen2 ? halfHeight : defaultPos) + ",0) rotate(" + (isOpen2 ? rotateVal + "deg" : "0") + ")";
      };
      var styles = {
        container: {
          width,
          height,
          position: "relative",
          transform: "rotate(" + (props.rotate || 0) + "deg)"
        },
        lineBase: {
          display: "block",
          height: strokeWidth + "px",
          width: "100%",
          background: props.color || "#000",
          transitionTimingFunction: "ease",
          transitionDuration: animationDuration + "s",
          borderRadius: (props.borderRadius || 0) + "px",
          transformOrigin: "center",
          position: "absolute"
        },
        firstLine: {
          transform: getTransformValue(isOpen, 0, 45),
          marginTop: halfStrokeWidth
        },
        secondLine: {
          transitionTimingFunction: "ease-out",
          transitionDuration: animationDuration / 4 + "s",
          opacity: isOpen ? "0" : "1",
          top: halfHeight,
          marginTop: halfStrokeWidth
        },
        thirdLine: {
          transform: getTransformValue(isOpen, height, -45),
          marginTop: halfStrokeWidth
        }
      };
      return /* @__PURE__ */ _react["default"].createElement("div", {
        style: styles.container,
        className: props.className,
        onClick: props.menuClicked
      }, /* @__PURE__ */ _react["default"].createElement("span", {
        style: Object.assign({}, styles.lineBase, styles.firstLine)
      }), /* @__PURE__ */ _react["default"].createElement("span", {
        style: Object.assign({}, styles.lineBase, styles.secondLine)
      }), /* @__PURE__ */ _react["default"].createElement("span", {
        style: Object.assign({}, styles.lineBase, styles.thirdLine)
      }));
    }
    HamburgerMenu2.propTypes = {
      isOpen: _propTypes["default"].bool.isRequired,
      menuClicked: _propTypes["default"].func.isRequired,
      width: _propTypes["default"].number,
      height: _propTypes["default"].number,
      strokeWidth: _propTypes["default"].number,
      rotate: _propTypes["default"].number,
      color: _propTypes["default"].string,
      borderRadius: _propTypes["default"].number,
      animationDuration: _propTypes["default"].number,
      className: _propTypes["default"].string
    };
  });

  // src/web/pages/upload.tsx
  var require_upload = __commonJS((exports) => {
    __export(exports, {
      default: () => upload_default
    });
    const react8 = __toModule(require("react"));
    const FormEntry = (props) => {
      return /* @__PURE__ */ react8.default.createElement("div", {
        className: "form-entry"
      }, /* @__PURE__ */ react8.default.createElement(Flex, {
        className: "heading"
      }, /* @__PURE__ */ react8.default.createElement("span", {
        className: "label"
      }, props.label), /* @__PURE__ */ react8.default.createElement(Flex.Child, null), props.optional && /* @__PURE__ */ react8.default.createElement("span", {
        className: "optional"
      }, "optional")), /* @__PURE__ */ react8.default.createElement(TextField, {
        placeholder: props.placeholder,
        multiline: props.area
      }));
    };
    const pageRoot = ({appParams}) => {
      return /* @__PURE__ */ react8.default.createElement(react8.default.Fragment, null, /* @__PURE__ */ react8.default.createElement(NavBar, {
        activePage: "UPLOAD"
      }), /* @__PURE__ */ react8.default.createElement("div", {
        className: "content-wrapper"
      }, /* @__PURE__ */ react8.default.createElement(Flex, {
        justifyContent: "center",
        className: "twobreak"
      }, /* @__PURE__ */ react8.default.createElement(Flex.Child, {
        nest: true,
        direction: "column",
        style: {alignItems: "center"}
      }, /* @__PURE__ */ react8.default.createElement(UploadBox, null)), /* @__PURE__ */ react8.default.createElement(Flex.Child, {
        className: "form-bar",
        nest: true,
        style: {justifyContent: "center"}
      }, /* @__PURE__ */ react8.default.createElement(Flex, {
        direction: "column"
      }, /* @__PURE__ */ react8.default.createElement(FormEntry, {
        name: "name",
        label: "Filename",
        placeholder: "shapes.png"
      }), /* @__PURE__ */ react8.default.createElement(FormEntry, {
        name: "description",
        label: "Description",
        placeholder: "This image is epic and has cool elements.",
        optional: true,
        area: true
      }), /* @__PURE__ */ react8.default.createElement(FormEntry, {
        name: "tags",
        label: "Tags",
        placeholder: "tetris, pretty, epic",
        optional: true
      }), /* @__PURE__ */ react8.default.createElement("aside", null, "The description and tags are purely used for searching / indexing purposes at the moment."), /* @__PURE__ */ react8.default.createElement(Flex, {
        className: "submit"
      }, /* @__PURE__ */ react8.default.createElement(Flex.Child, null), /* @__PURE__ */ react8.default.createElement(TaskButton, {
        task: async () => {
        }
      }, "Upload")))))), /* @__PURE__ */ react8.default.createElement(PageAccent, null));
    };
    var upload_default = as({
      needsAuth: true,
      fileName: "upload",
      pageTitle: (ctx) => ctx.title + " - Upload",
      root: pageRoot
    });
  });

  // src/util/poly.ts
  const as = (value) => value;

  // src/web/components/app/navbar.tsx
  const react2 = __toModule(require("react"));
  const react_hamburger_menu = __toModule(require_HamburgerMenu());

  // src/web/services/api.ts
  const API_ROOT = "/api";
  function apiPath(endpoint) {
    return API_ROOT + "/" + endpoint;
  }

  // src/web/services/auth.ts
  const LOGIN_URL = apiPath("login");
  const LOGOUT_URL = apiPath("logout");
  async function doLogout() {
    localStorage.removeItem("accessToken");
    try {
      await fetch(LOGOUT_URL, {
        method: "POST"
      });
      return true;
    } catch (e) {
      console.log(e);
    }
    return false;
  }

  // src/web/components/layout/utils.ts
  const react = __toModule(require("react"));
  function clazz(...classes) {
    return Array.from(new Set(classes.flat().filter((x) => x))).join(" ");
  }
  function useMediaQuery(queryInput, options = {}) {
    let query = typeof queryInput === "function" ? queryInput() : queryInput;
    query = query.replace(/^@media( ?)/m, "");
    const supportMatchMedia = typeof window !== "undefined" && typeof window.matchMedia !== "undefined";
    const {
      defaultMatches = false,
      matchMedia = supportMatchMedia ? window.matchMedia : null,
      ssrMatchMedia = null
    } = options;
    const [match, setMatch] = react.default.useState(() => {
      if (ssrMatchMedia) {
        return ssrMatchMedia(query).matches;
      }
      return defaultMatches;
    });
    react.default.useEffect(() => {
      let active = true;
      if (!supportMatchMedia)
        return;
      const queryList = matchMedia(query);
      const updateMatch = () => {
        if (active) {
          setMatch(queryList.matches);
        }
      };
      updateMatch();
      queryList.addEventListener("change", updateMatch);
      return () => {
        active = false;
        queryList.removeEventListener("change", updateMatch);
      };
    }, [query, matchMedia]);
    return match;
  }

  // src/web/components/app/navbar.tsx
  const navPages = [
    ["GALLERY", "/gallery"],
    ["LIST", "/list"],
    ["LINKS", "/links"],
    ["UPLOAD", "/upload"]
  ];
  async function handleLogout() {
    await doLogout();
    window.location.href = "/login";
  }
  const NavBar = (props) => {
    const shouldMenu = useMediaQuery("(max-width: 550px)");
    const [menuOpen, setMenuOpen] = react2.useState(false);
    react2.useEffect(() => {
      if (menuOpen)
        setMenuOpen(false);
    }, [shouldMenu]);
    const pageOrder = [...navPages];
    if (shouldMenu) {
      const idx = pageOrder.findIndex(([menu]) => menu === props.activePage);
      const activeItem = pageOrder.splice(idx, 1)[0];
      pageOrder.unshift(activeItem);
    }
    return /* @__PURE__ */ react2.default.createElement("header", {
      className: clazz(menuOpen && "open")
    }, /* @__PURE__ */ react2.default.createElement("nav", null, pageOrder.map(([pageTitle, pageLink]) => /* @__PURE__ */ react2.default.createElement("a", {
      key: pageTitle,
      className: clazz(pageTitle === props.activePage && "active"),
      href: pageLink
    }, pageTitle))), /* @__PURE__ */ react2.default.createElement("div", {
      className: "nav-right"
    }, /* @__PURE__ */ react2.default.createElement("a", {
      href: "#",
      onClick: handleLogout
    }, "Logout"), /* @__PURE__ */ react2.default.createElement(react_hamburger_menu.default, {
      className: "hamburger",
      isOpen: menuOpen,
      menuClicked: () => setMenuOpen(!menuOpen),
      color: "#000",
      width: 24,
      height: 20
    })));
  };

  // src/web/components/img/uploadbox.tsx
  const react3 = __toModule(require("react"));
  const UploadBox = (props) => {
    const dragCounter = react3.useRef(0), dragTarget = react3.useRef(null);
    const [dragging, setDragging] = react3.useState(false);
    const [dropping, setDropping] = react3.useState(false);
    const handleDragIn = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current++;
      if (e.dataTransfer?.items?.length ?? 0 > 0) {
        setDragging(true);
      }
    };
    const handleDragOut = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current--;
      if (dragCounter.current > 0)
        return;
      setDragging(false);
    };
    const handleDragOver = (e) => {
      if (!dragTarget.current)
        return;
      if (e.composedPath().includes(dragTarget.current)) {
        setDropping(true);
      } else {
        setDropping(false);
      }
    };
    react3.useEffect(() => {
      document.addEventListener("dragenter", handleDragIn);
      document.addEventListener("dragleave", handleDragOut);
      document.addEventListener("dragover", handleDragOver);
      return () => {
        document.removeEventListener("dragenter", handleDragIn);
        document.removeEventListener("dragleave", handleDragOut);
        document.removeEventListener("dragover", handleDragOver);
      };
    }, []);
    return /* @__PURE__ */ react3.default.createElement("svg", {
      className: "uploadbox",
      ref: dragTarget,
      viewBox: "0 0 480 480",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, /* @__PURE__ */ react3.default.createElement("path", {
      strokeDasharray: dragging ? 16 : void 0,
      d: "M32 50H429V447C429 463.569 415.569 477 399 477H32C15.4315 477 2 463.569 2 447V80C2 63.4315 15.4315 50 32 50Z",
      fill: "#AAAAAA",
      fillOpacity: (dropping ? 0.2 : 0) + (dragging ? 0.1 : 0),
      stroke: "#AAAAAA",
      strokeWidth: "4"
    }), /* @__PURE__ */ react3.default.createElement("rect", {
      x: "427",
      width: "53",
      height: "97",
      fill: "white"
    }), /* @__PURE__ */ react3.default.createElement("rect", {
      x: "383",
      width: "97",
      height: "52",
      fill: "white"
    }), /* @__PURE__ */ react3.default.createElement("line", {
      x1: "429",
      y1: "13",
      x2: "429",
      y2: "84",
      stroke: "#AAAAAA",
      strokeWidth: "4"
    }), /* @__PURE__ */ react3.default.createElement("line", {
      x1: "392",
      y1: "50",
      x2: "464",
      y2: "50",
      stroke: "#AAAAAA",
      strokeWidth: "4"
    }), /* @__PURE__ */ react3.default.createElement("path", {
      visibility: dragging ? "hidden" : void 0,
      d: "M169.101 232.5L215 153L260.899 232.5H169.101Z",
      stroke: "#AAAAAA",
      strokeWidth: "4"
    }), /* @__PURE__ */ react3.default.createElement("circle", {
      visibility: dragging ? "hidden" : void 0,
      cx: "286",
      cy: "313",
      r: "48",
      stroke: "#AAAAAA",
      strokeWidth: "4"
    }), /* @__PURE__ */ react3.default.createElement("rect", {
      visibility: dragging ? "hidden" : void 0,
      x: "96",
      y: "265",
      width: "96",
      height: "96",
      stroke: "#AAAAAA",
      strokeWidth: "4"
    }), dragging && /* @__PURE__ */ react3.default.createElement("text", {
      x: "214",
      y: "275",
      fill: "#000000",
      style: {
        fontSize: "32px",
        fontWeight: 400,
        opacity: 0.35,
        textAnchor: "middle"
      }
    }, "Drop here to upload"));
  };

  // src/web/components/img/pageaccent.tsx
  const react4 = __toModule(require("react"));
  const PageAccent = (props) => {
    return /* @__PURE__ */ react4.default.createElement("div", {
      className: "page-accent"
    }, /* @__PURE__ */ react4.default.createElement("svg", {
      width: "1920",
      height: "531",
      viewBox: "0 0 1920 531",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, /* @__PURE__ */ react4.default.createElement("path", {
      d: "M343.205 294.97L-3.13958 394.185C-55.1528 409.085 -91 456.643 -91 510.748C-91 577.714 -36.7138 632 30.2516 632H1760C1870.46 632 1960 542.457 1960 432V139.987C1960 69.0005 1906.87 9.25151 1836.36 0.96072C1808.86 -2.27362 1781.02 2.72233 1756.35 15.3165L1128.27 336.043C1093.2 353.949 1053.63 361.106 1014.52 356.619L421.076 288.54C394.949 285.543 368.487 287.728 343.205 294.97Z",
      fill: "#C4C4C4",
      fillOpacity: "0.2"
    })));
  };

  // src/web/components/layout/flex.tsx
  const react5 = __toModule(require("react"));
  const Flex = (props) => /* @__PURE__ */ react5.default.createElement("div", {
    className: props.className,
    style: {
      display: "flex",
      flexDirection: props.direction,
      justifyContent: props.justifyContent,
      alignItems: props.alignItems
    }
  }, props.children);
  Flex.Child = function Child(props) {
    return /* @__PURE__ */ react5.default.createElement("div", {
      style: Object.assign({
        flex: props.flex ?? 1,
        flexDirection: props.direction,
        display: props.nest ? "flex" : void 0
      }, props.style),
      className: props.className
    }, props.children);
  };

  // src/web/components/input/text.tsx
  const react6 = __toModule(require("react"));
  const TextField = (props) => {
    const controlProps = {
      autoFocus: props.autofocus,
      type: props.type ?? "text",
      placeholder: props.placeholder,
      onChange: (t) => props.onChange?.(t.target.value),
      value: props.value
    };
    return /* @__PURE__ */ react6.default.createElement("div", {
      className: clazz("textfield", props.error && "error")
    }, props.multiline ? /* @__PURE__ */ react6.default.createElement("textarea", {
      ...controlProps
    }) : /* @__PURE__ */ react6.default.createElement("input", {
      ...controlProps
    }));
  };

  // src/web/components/input/taskbutton.tsx
  const react7 = __toModule(require("react"));
  const TaskButton = (props) => {
    const [loading, setLoading] = react7.useState(false);
    const [hideLoading, setHideLoading] = react7.useState(true);
    const handleClick = async () => {
      const longTimer = setTimeout(() => setHideLoading(false), 300);
      setLoading(true);
      await props.task();
      setLoading(false);
      clearTimeout(longTimer);
      setHideLoading(true);
    };
    return /* @__PURE__ */ react7.default.createElement("button", {
      className: clazz("button", loading && "loading", hideLoading && "hide-load", props.className),
      disabled: props.disabled || loading,
      onClick: handleClick
    }, props.children);
  };
  return require_upload();
})();
