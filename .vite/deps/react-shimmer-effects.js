import {
  __commonJS,
  __toESM,
  require_react
} from "./chunk-UPDK7Z2H.js";

// node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "node_modules/react-is/cjs/react-is.development.js"(exports) {
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
          return typeof type === "string" || typeof type === "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
          type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
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
  }
});

// node_modules/react-is/index.js
var require_react_is = __commonJS({
  "node_modules/react-is/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_is_development();
    }
  }
});

// node_modules/object-assign/index.js
var require_object_assign = __commonJS({
  "node_modules/object-assign/index.js"(exports, module) {
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
  }
});

// node_modules/prop-types/lib/ReactPropTypesSecret.js
var require_ReactPropTypesSecret = __commonJS({
  "node_modules/prop-types/lib/ReactPropTypesSecret.js"(exports, module) {
    "use strict";
    var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    module.exports = ReactPropTypesSecret;
  }
});

// node_modules/prop-types/lib/has.js
var require_has = __commonJS({
  "node_modules/prop-types/lib/has.js"(exports, module) {
    module.exports = Function.call.bind(Object.prototype.hasOwnProperty);
  }
});

// node_modules/prop-types/checkPropTypes.js
var require_checkPropTypes = __commonJS({
  "node_modules/prop-types/checkPropTypes.js"(exports, module) {
    "use strict";
    var printWarning = function() {
    };
    if (true) {
      ReactPropTypesSecret = require_ReactPropTypesSecret();
      loggedTypeFailures = {};
      has = require_has();
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
    var ReactPropTypesSecret;
    var loggedTypeFailures;
    var has;
    function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
      if (true) {
        for (var typeSpecName in typeSpecs) {
          if (has(typeSpecs, typeSpecName)) {
            var error;
            try {
              if (typeof typeSpecs[typeSpecName] !== "function") {
                var err = Error(
                  (componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
                );
                err.name = "Invariant Violation";
                throw err;
              }
              error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
            } catch (ex) {
              error = ex;
            }
            if (error && !(error instanceof Error)) {
              printWarning(
                (componentName || "React class") + ": type specification of " + location + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
              );
            }
            if (error instanceof Error && !(error.message in loggedTypeFailures)) {
              loggedTypeFailures[error.message] = true;
              var stack = getStack ? getStack() : "";
              printWarning(
                "Failed " + location + " type: " + error.message + (stack != null ? stack : "")
              );
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
  }
});

// node_modules/prop-types/factoryWithTypeCheckers.js
var require_factoryWithTypeCheckers = __commonJS({
  "node_modules/prop-types/factoryWithTypeCheckers.js"(exports, module) {
    "use strict";
    var ReactIs = require_react_is();
    var assign = require_object_assign();
    var ReactPropTypesSecret = require_ReactPropTypesSecret();
    var has = require_has();
    var checkPropTypes = require_checkPropTypes();
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
        bigint: createPrimitiveTypeChecker("bigint"),
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
      function PropTypeError(message, data) {
        this.message = message;
        this.data = data && typeof data === "object" ? data : {};
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
              var err = new Error(
                "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
              );
              err.name = "Invariant Violation";
              throw err;
            } else if (typeof console !== "undefined") {
              var cacheKey = componentName + ":" + propName;
              if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
              manualPropTypeWarningCount < 3) {
                printWarning(
                  "You are manually calling a React.PropTypes validation function for the `" + propFullName + "` prop on `" + componentName + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
                );
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
            return new PropTypeError(
              "Invalid " + location + " `" + propFullName + "` of type " + ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") + ("`" + expectedType + "`."),
              { expectedType }
            );
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
              printWarning(
                "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
              );
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
          true ? printWarning("Invalid argument supplied to oneOfType, expected an instance of array.") : void 0;
          return emptyFunctionThatReturnsNull;
        }
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          if (typeof checker !== "function") {
            printWarning(
              "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + getPostfixForTypeWarning(checker) + " at index " + i + "."
            );
            return emptyFunctionThatReturnsNull;
          }
        }
        function validate(props, propName, componentName, location, propFullName) {
          var expectedTypes = [];
          for (var i2 = 0; i2 < arrayOfTypeCheckers.length; i2++) {
            var checker2 = arrayOfTypeCheckers[i2];
            var checkerResult = checker2(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
            if (checkerResult == null) {
              return null;
            }
            if (checkerResult.data && has(checkerResult.data, "expectedType")) {
              expectedTypes.push(checkerResult.data.expectedType);
            }
          }
          var expectedTypesMessage = expectedTypes.length > 0 ? ", expected one of type [" + expectedTypes.join(", ") + "]" : "";
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`" + expectedTypesMessage + "."));
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
      function invalidValidatorError(componentName, location, propFullName, key, type) {
        return new PropTypeError(
          (componentName || "React class") + ": " + location + " type `" + propFullName + "." + key + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + type + "`."
        );
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
            if (typeof checker !== "function") {
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
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
            if (has(shapeTypes, key) && typeof checker !== "function") {
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
            }
            if (!checker) {
              return new PropTypeError(
                "Invalid " + location + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(shapeTypes), null, "  ")
              );
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
  }
});

// node_modules/prop-types/index.js
var require_prop_types = __commonJS({
  "node_modules/prop-types/index.js"(exports, module) {
    if (true) {
      ReactIs = require_react_is();
      throwOnDirectAccess = true;
      module.exports = require_factoryWithTypeCheckers()(ReactIs.isElement, throwOnDirectAccess);
    } else {
      module.exports = null();
    }
    var ReactIs;
    var throwOnDirectAccess;
  }
});

// node_modules/react-shimmer-effects/dist/index.es.js
var import_react = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
function createCommonjsModule(fn, module) {
  return module = { exports: {} }, fn(module, module.exports), module.exports;
}
var classnames = createCommonjsModule(function(module) {
  (function() {
    var hasOwn = {}.hasOwnProperty;
    function classNames() {
      var classes = [];
      for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (!arg)
          continue;
        var argType = typeof arg;
        if (argType === "string" || argType === "number") {
          classes.push(arg);
        } else if (Array.isArray(arg)) {
          if (arg.length) {
            var inner = classNames.apply(null, arg);
            if (inner) {
              classes.push(inner);
            }
          }
        } else if (argType === "object") {
          if (arg.toString === Object.prototype.toString) {
            for (var key in arg) {
              if (hasOwn.call(arg, key) && arg[key]) {
                classes.push(key);
              }
            }
          } else {
            classes.push(arg.toString());
          }
        }
      }
      return classes.join(" ");
    }
    if (module.exports) {
      classNames.default = classNames;
      module.exports = classNames;
    } else {
      window.classNames = classNames;
    }
  })();
});
function styleInject(css2, ref) {
  if (ref === void 0)
    ref = {};
  var insertAt = ref.insertAt;
  if (!css2 || typeof document === "undefined") {
    return;
  }
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css2;
  } else {
    style.appendChild(document.createTextNode(css2));
  }
}
var css = ".shimmer-button {\n  border-radius: 4px;\n  height: 38px;\n  width: 120px;\n  margin-bottom: 20px; }\n  .shimmer-button--sm {\n    border-radius: 3px;\n    height: 31px;\n    width: 100px; }\n  .shimmer-button--lg {\n    height: 48px;\n    width: 140px;\n    border-radius: 5px; }\n";
styleInject(css);
var defineProperty = function(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
};
var ShimmerButton = function ShimmerButton2(_ref) {
  var size = _ref.size;
  return import_react.default.createElement("div", {
    className: classnames(defineProperty({
      "shimmer shimmer-button": true
    }, "shimmer-button--" + size, true))
  });
};
ShimmerButton.propTypes = {
  size: import_prop_types.default.oneOf(["lg", "md", "sm"])
};
ShimmerButton.defaultProps = {
  size: "md"
};
var ShimmerCircularImage = function ShimmerCircularImage2(_ref) {
  var size = _ref.size, center = _ref.center, className = _ref.className;
  var style = {};
  if (size) {
    style.width = size + "px";
    style.height = size + "px";
  }
  return import_react.default.createElement(
    "div",
    {
      className: classnames({
        "text-center": center
      })
    },
    import_react.default.createElement("div", {
      style,
      className: classnames(defineProperty({
        "shimmer shimmer-avatar": true
      }, className, className))
    })
  );
};
ShimmerCircularImage.propTypes = {
  size: import_prop_types.default.number,
  center: import_prop_types.default.bool,
  className: import_prop_types.default.string
};
ShimmerCircularImage.defaultProps = {
  center: false,
  size: 80
};
var ShimmerThumbnail = function ShimmerThumbnail2(_ref) {
  var height = _ref.height, width = _ref.width, center = _ref.center, className = _ref.className, fitOnFrame = _ref.fitOnFrame, rounded = _ref.rounded;
  var style = {};
  if (height)
    style.height = height + "px";
  if (width)
    style.width = width + "px";
  return import_react.default.createElement(
    "div",
    {
      className: classnames({
        "h-100": fitOnFrame,
        "text-center ": center
      })
    },
    import_react.default.createElement("div", {
      className: classnames(defineProperty({
        "h-100": fitOnFrame,
        "shimmer shimmer-thumbnail": true,
        "border-rounded": rounded
      }, className, className)),
      style
    })
  );
};
ShimmerThumbnail.propTypes = {
  height: import_prop_types.default.number,
  width: import_prop_types.default.number,
  center: import_prop_types.default.bool,
  className: import_prop_types.default.string,
  fitOnFrame: import_prop_types.default.bool,
  rounded: import_prop_types.default.bool
};
ShimmerThumbnail.defaultProps = {
  canter: false,
  fitOnFrame: false,
  rounded: false,
  height: 250
};
var css$1 = ".shimmer-avatar {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  margin-bottom: 20px;\n  display: inline-block; }\n\n.shimmer-thumbnail {\n  min-width: 80px;\n  width: 100%;\n  height: 200px;\n  margin-bottom: 20px;\n  display: inline-block; }\n";
styleInject(css$1);
var css$2 = ".shimmer-title {\n  margin-bottom: 20px; }\n  .shimmer-title--secondary {\n    margin-bottom: 20px; }\n    .shimmer-title--secondary .shimmer-title-line {\n      height: 16px; }\n  .shimmer-title-line {\n    width: 100%;\n    height: 24px;\n    border-radius: 20px; }\n    .shimmer-title-line:first-child {\n      width: 100% !important; }\n    .shimmer-title-line:last-child {\n      width: 40%; }\n";
styleInject(css$2);
var ShimmerTitle = function ShimmerTitle2(_ref) {
  var _classNames;
  var line = _ref.line, gap = _ref.gap, variant = _ref.variant, className = _ref.className;
  var renderLines = function renderLines2() {
    var title_lines = [];
    for (var index = 0; index < line; index++) {
      title_lines.push(import_react.default.createElement("div", { className: "shimmer shimmer-title-line", key: index }));
    }
    return title_lines;
  };
  return import_react.default.createElement(
    "div",
    {
      className: classnames((_classNames = {
        grid: true,
        "shimmer-title": variant === "primary",
        "shimmer-title--secondary": variant === "secondary"
      }, defineProperty(_classNames, "grid-gap-" + gap, gap), defineProperty(_classNames, className, className), _classNames))
    },
    renderLines()
  );
};
ShimmerTitle.propTypes = {
  line: import_prop_types.default.number,
  gap: import_prop_types.default.oneOf([10, 15, 20, 30]),
  variant: import_prop_types.default.oneOf(["primary", "secondary"]),
  className: import_prop_types.default.string
};
ShimmerTitle.defaultProps = {
  line: 2,
  gap: 10,
  variant: "primary"
};
var css$3 = ".shimmer-card {\n  border-radius: 8px;\n  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.1);\n  background-color: #ffffff;\n  width: 100%; }\n  .shimmer-card:not(:first-child) {\n    margin-top: 30px; }\n  .shimmer-card--content-center {\n    text-align: center;\n    display: flex;\n    flex-direction: column;\n    align-items: center; }\n    .shimmer-card--content-center * {\n      width: 100%;\n      margin: auto; }\n";
styleInject(css$3);
var ShimmerCard = function ShimmerCard2(_ref) {
  var _classNames;
  var children = _ref.children, className = _ref.className, paddingSize = _ref.paddingSize;
  if (!children)
    return null;
  return import_react.default.createElement(
    "div",
    {
      className: classnames((_classNames = {
        "shimmer-card": true
      }, defineProperty(_classNames, "p-" + paddingSize, paddingSize), defineProperty(_classNames, className, className), _classNames))
    },
    children
  );
};
ShimmerCard.propTypes = {
  className: import_prop_types.default.string,
  children: import_prop_types.default.oneOfType([import_prop_types.default.element, import_prop_types.default.array]).isRequired,
  paddingSize: import_prop_types.default.oneOf([false, 20, 30])
};
ShimmerCard.defaultProps = { paddingSize: false };
var ShimmerSimpleGallery = function ShimmerSimpleGallery2(_ref) {
  var _classNames, _classNames2;
  var row = _ref.row, col = _ref.col, gap = _ref.gap, className = _ref.className, fitOnFrame = _ref.fitOnFrame, imageType = _ref.imageType, imageHeight = _ref.imageHeight, caption = _ref.caption, card = _ref.card;
  var renderPhotos = function renderPhotos2() {
    var photos = [];
    var items = row * col;
    for (var index = 0; index < items; index++) {
      photos.push(import_react.default.createElement(
        "div",
        { key: index },
        imageType === "thumbnail" && import_react.default.createElement(ShimmerThumbnail, {
          key: index,
          fitOnFrame,
          height: imageHeight,
          className: classnames({
            "m-0": true
          })
        }),
        imageType === "circular" && import_react.default.createElement(ShimmerCircularImage, { size: imageHeight, center: true }),
        caption && import_react.default.createElement(ShimmerTitle, {
          variant: "secondary",
          className: classnames({
            "mt-15": imageType === "thumbnail",
            "w-50 ml-auto mr-auto circular-image-caption": imageType === "circular"
          })
        })
      ));
    }
    return photos;
  };
  if (!card)
    return import_react.default.createElement(
      "div",
      {
        className: classnames((_classNames = {
          grid: true
        }, defineProperty(_classNames, "grid-gap-" + gap, true), defineProperty(_classNames, "grid-column-" + col, true), defineProperty(_classNames, className, className), _classNames))
      },
      renderPhotos()
    );
  return import_react.default.createElement(
    ShimmerCard,
    { paddingSize: 20 },
    import_react.default.createElement(
      "div",
      {
        className: classnames((_classNames2 = {
          grid: true
        }, defineProperty(_classNames2, "grid-gap-" + gap, true), defineProperty(_classNames2, "grid-column-" + col, true), defineProperty(_classNames2, className, className), _classNames2))
      },
      renderPhotos()
    )
  );
};
ShimmerSimpleGallery.propTypes = {
  row: import_prop_types.default.number,
  col: import_prop_types.default.oneOf([2, 3, 4]),
  gap: import_prop_types.default.oneOf([20, 30]),
  fitOnFrame: import_prop_types.default.bool,
  imageType: import_prop_types.default.oneOf(["thumbnail", "circular"]),
  imageHeight: import_prop_types.default.number,
  caption: import_prop_types.default.bool,
  card: import_prop_types.default.bool
};
ShimmerSimpleGallery.defaultProps = {
  row: 3,
  col: 3,
  gap: 20,
  fitOnFrame: false,
  imageType: "thumbnail",
  caption: false,
  card: false
};
var css$4 = ".shimmer-gallery-puzzle {\n  height: 540px; }\n\n.circular-image-caption .shimmer-title-line {\n  margin: auto; }\n";
styleInject(css$4);
var ShimmerFeaturedGallery = function ShimmerFeaturedGallery2(_ref) {
  var row = _ref.row, col = _ref.col, gap = _ref.gap, card = _ref.card, frameHeight = _ref.frameHeight;
  var style = {};
  if (frameHeight)
    style.height = frameHeight + "px";
  var renderContent = function renderContent2() {
    return import_react.default.createElement(
      "div",
      { className: "shimmer-row shimmer-gallery-puzzle", style },
      import_react.default.createElement(
        "div",
        { className: "shimmer-col flex-1" },
        import_react.default.createElement(ShimmerThumbnail, { className: "h-100", fitOnFrame: true })
      ),
      import_react.default.createElement(
        "div",
        { className: "shimmer-col flex-1" },
        import_react.default.createElement(ShimmerSimpleGallery, {
          row,
          col,
          gap,
          className: "h-100",
          fitOnFrame: true
        })
      )
    );
  };
  if (!card)
    return renderContent();
  return import_react.default.createElement(
    ShimmerCard,
    { paddingSize: 20 },
    renderContent()
  );
};
ShimmerFeaturedGallery.propTypes = {
  row: import_prop_types.default.number,
  col: import_prop_types.default.oneOf([2, 3, 4]),
  gap: import_prop_types.default.oneOf([20, 30]),
  card: import_prop_types.default.bool,
  frameHeight: import_prop_types.default.number
};
ShimmerFeaturedGallery.defaultProps = {
  card: false,
  row: 2,
  col: 2,
  gap: 20,
  frameHeight: 600
};
var ShimmerTableCol = function ShimmerTableCol2() {
  return import_react.default.createElement("div", { className: "shimmer shimmer-table-col" });
};
var ShimmerTableRow = function ShimmerTableRow2(_ref) {
  var col = _ref.col, header = _ref.header;
  var renderColumns = function renderColumns2() {
    var columns = [];
    for (var index = 0; index < col; index++) {
      columns.push(import_react.default.createElement(ShimmerTableCol, { key: index }));
    }
    return columns;
  };
  return import_react.default.createElement(
    "div",
    {
      className: classnames({
        "shimmer-table-row": true,
        "shimmer-table-row--header": header
      })
    },
    renderColumns()
  );
};
ShimmerTableRow.propTypes = {
  col: import_prop_types.default.number.isRequired,
  header: import_prop_types.default.bool
};
ShimmerTableRow.defaultProps = {
  col: 5,
  header: false
};
var css$5 = ".shimmer-table-row {\n  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.1);\n  display: flex;\n  padding: 25px 0;\n  background-color: #ffffff;\n  border-radius: 5px;\n  margin-bottom: 20px; }\n  .shimmer-table-row--header {\n    background-color: transparent;\n    box-shadow: none;\n    margin: 0; }\n  .shimmer-table-row > .shimmer {\n    margin: 0 30px; }\n\n.shimmer-table-col {\n  width: 100%;\n  height: 10px;\n  border-radius: 10px; }\n";
styleInject(css$5);
var ShimmerTable = function ShimmerTable2(_ref) {
  var row = _ref.row, col = _ref.col;
  var renderRows = function renderRows2() {
    var rows = [];
    for (var index = 0; index < row; index++) {
      rows.push(import_react.default.createElement(ShimmerTableRow, { col, key: index }));
    }
    return rows;
  };
  return import_react.default.createElement(
    "div",
    null,
    import_react.default.createElement(ShimmerTableRow, { col, header: true }),
    renderRows()
  );
};
ShimmerTable.propTypes = {
  row: import_prop_types.default.number,
  col: import_prop_types.default.number
};
ShimmerTable.defaultProps = {
  row: 5,
  col: 5
};
var css$6 = ".shimmer-badge {\n  width: 80px;\n  height: 24px;\n  border-radius: 20px;\n  margin-bottom: 20px; }\n";
styleInject(css$6);
var ShimmerBadge = function ShimmerBadge2(_ref) {
  var width = _ref.width;
  var style = {};
  if (width)
    style.width = width + "px";
  return import_react.default.createElement("div", { className: "shimmer shimmer-badge", style });
};
ShimmerBadge.propTypes = {
  width: import_prop_types.default.number
};
var css$7 = ".shimmer-text {\n  margin-bottom: 30px; }\n  .shimmer-text-line {\n    width: 100%;\n    height: 8px;\n    border-radius: 10px; }\n    .shimmer-text-line:first-child {\n      width: 100% !important; }\n    .shimmer-text-line:last-child {\n      width: 40%; }\n";
styleInject(css$7);
var ShimmerText = function ShimmerText2(_ref) {
  var _classNames;
  var line = _ref.line, gap = _ref.gap, className = _ref.className;
  var renderLines = function renderLines2() {
    var text_lines = [];
    for (var index = 0; index < line; index++) {
      text_lines.push(import_react.default.createElement("div", { className: "shimmer shimmer-text-line", key: index }));
    }
    return text_lines;
  };
  return import_react.default.createElement(
    "div",
    {
      className: classnames((_classNames = {
        "grid shimmer-text": true
      }, defineProperty(_classNames, "grid-gap-" + gap, gap), defineProperty(_classNames, className, className), _classNames))
    },
    renderLines()
  );
};
ShimmerText.propTypes = {
  line: import_prop_types.default.number,
  gap: import_prop_types.default.oneOf([10, 15, 20, 30]),
  className: import_prop_types.default.string
};
ShimmerText.defaultProps = {
  line: 5,
  gap: 15
};
var css$8 = ".shimmer-separator {\n  height: 1px;\n  background-color: #dddddd;\n  margin: 40px 0; }\n";
styleInject(css$8);
var ShimmerSeparator = function ShimmerSeparator2() {
  return import_react.default.createElement("div", { className: "shimmer-separator" });
};
var ShimmerSocialPost = function ShimmerSocialPost2(_ref) {
  var type = _ref.type, title = _ref.title;
  var renderContents = function renderContents2() {
    if (type === "image") {
      return import_react.default.createElement(ShimmerThumbnail, { height: 300, className: "m-02" });
    } else if (type === "text") {
      return import_react.default.createElement(ShimmerText, { line: 13, className: "p-15" });
    } else {
      return import_react.default.createElement(
        "div",
        null,
        import_react.default.createElement(ShimmerText, { line: 3, className: "p-15" }),
        import_react.default.createElement(ShimmerThumbnail, { height: 300, className: "m-02" })
      );
    }
  };
  return import_react.default.createElement(
    ShimmerCard,
    null,
    import_react.default.createElement(
      "div",
      { className: "p-15" },
      import_react.default.createElement(
        "div",
        { className: "flex" },
        import_react.default.createElement(ShimmerCircularImage, null),
        import_react.default.createElement(
          "div",
          { className: "flex-1 p-15" },
          import_react.default.createElement(ShimmerTitle, { variant: "secondary", className: "w-40" })
        )
      ),
      title && import_react.default.createElement(ShimmerTitle, { line: 1, className: "w-40 m-0" })
    ),
    renderContents(),
    import_react.default.createElement(
      "div",
      { className: "p-15 flex flex-content-between" },
      import_react.default.createElement(ShimmerTitle, { line: 1, className: "w-10", variant: "secondary" }),
      import_react.default.createElement(ShimmerTitle, { line: 1, className: "w-10", variant: "secondary" })
    )
  );
};
ShimmerSocialPost.propTypes = {
  type: import_prop_types.default.oneOf(["text", "image", "both"]),
  title: import_prop_types.default.bool
};
ShimmerSocialPost.defaultProps = {
  type: "image",
  title: false
};
var ShimmerCategoryItem = function ShimmerCategoryItem2(_ref) {
  var hasImage = _ref.hasImage, imageType = _ref.imageType, imageWidth = _ref.imageWidth, imageHeight = _ref.imageHeight, title = _ref.title, text = _ref.text, cta = _ref.cta, contentCenter = _ref.contentCenter;
  return import_react.default.createElement(
    "div",
    null,
    !hasImage ? import_react.default.createElement(
      "div",
      null,
      import_react.default.createElement(ShimmerTitle, { variant: "secondary", line: 1, className: "mb-15 w-80" }),
      import_react.default.createElement(
        "div",
        { className: "w-40" },
        import_react.default.createElement(ShimmerText, { line: 3, gap: 10 })
      )
    ) : import_react.default.createElement(
      "div",
      {
        className: classnames({
          flex: true,
          "flex-vertical-center": contentCenter
        })
      },
      imageType === "thumbnail" && import_react.default.createElement(ShimmerThumbnail, { width: imageWidth, height: imageHeight }),
      imageType === "circular" && import_react.default.createElement(ShimmerCircularImage, { size: imageWidth }),
      import_react.default.createElement(
        "div",
        { className: "flex-1 p-15" },
        title && import_react.default.createElement(ShimmerTitle, { variant: "secondary" }),
        text && import_react.default.createElement(ShimmerText, { line: 3, gap: 10, className: "mb-20" }),
        cta && import_react.default.createElement(ShimmerButton, { size: "sm" })
      )
    )
  );
};
ShimmerCategoryItem.propTypes = {
  hasImage: import_prop_types.default.bool.isRequired,
  imageType: import_prop_types.default.oneOf(["circular", "thumbnail"]),
  imageWidth: import_prop_types.default.number,
  imageHeight: import_prop_types.default.number,
  title: import_prop_types.default.bool,
  text: import_prop_types.default.bool,
  cta: import_prop_types.default.bool,
  contentCenter: import_prop_types.default.bool
};
ShimmerCategoryItem.defaultProps = {
  hasImage: false,
  imageType: "thumbnail",
  title: false,
  text: false,
  contentCenter: false
};
var ShimmerCategoryList = function ShimmerCategoryList2(_ref) {
  var items = _ref.items, categoryStyle = _ref.categoryStyle, title = _ref.title;
  var categories = {
    STYLE_ONE: import_react.default.createElement(ShimmerCategoryItem, null),
    STYLE_TWO: import_react.default.createElement(ShimmerCategoryItem, {
      hasImage: true,
      imageType: "thumbnail",
      imageWidth: 100,
      imageHeight: 100,
      title: true
    }),
    STYLE_THREE: import_react.default.createElement(ShimmerCategoryItem, {
      hasImage: true,
      imageType: "circular",
      imageWidth: 100,
      imageHeight: 100,
      title: true
    }),
    STYLE_FOUR: import_react.default.createElement(ShimmerCategoryItem, {
      hasImage: true,
      imageType: "thumbnail",
      imageWidth: 100,
      imageHeight: 100,
      text: true
    }),
    STYLE_FIVE: import_react.default.createElement(ShimmerCategoryItem, {
      hasImage: true,
      imageType: "circular",
      imageWidth: 100,
      imageHeight: 100,
      text: true
    }),
    STYLE_SIX: import_react.default.createElement(ShimmerCategoryItem, {
      hasImage: true,
      imageType: "thumbnail",
      imageWidth: 100,
      imageHeight: 100,
      text: true,
      cta: true
    }),
    STYLE_SEVEN: import_react.default.createElement(ShimmerCategoryItem, {
      hasImage: true,
      imageType: "circular",
      imageWidth: 100,
      imageHeight: 100,
      text: true,
      cta: true
    })
  };
  var renderItems = function renderItems2() {
    var list = [];
    for (var index = 0; index < items; index++) {
      list.push(import_react.default.createElement(
        "div",
        { key: index },
        categories[categoryStyle]
      ));
    }
    return list;
  };
  return import_react.default.createElement(
    ShimmerCard,
    { paddingSize: 20 },
    title && import_react.default.createElement(ShimmerTitle, { line: 1, className: "w-60" }),
    renderItems()
  );
};
ShimmerCategoryList.propTypes = {
  title: import_prop_types.default.bool,
  items: import_prop_types.default.number,
  categoryStyle: import_prop_types.default.oneOf(["STYLE_ONE", "STYLE_TWO", "STYLE_THREE", "STYLE_FOUR", "STYLE_FIVE", "STYLE_SIX", "STYLE_SEVEN"])
};
ShimmerCategoryList.defaultProps = {
  title: false,
  items: 5,
  categoryStyle: "STYLE_ONE"
};
var ShimmerPostDetails = function ShimmerPostDetails2(_ref) {
  var variant = _ref.variant, cta = _ref.cta, card = _ref.card;
  var variants = {
    SIMPLE: import_react.default.createElement(
      "div",
      null,
      import_react.default.createElement(ShimmerTitle, { line: 1, className: "w-40" }),
      import_react.default.createElement(ShimmerTitle, { line: 1, variant: "secondary", className: "w-20 mb-40" }),
      import_react.default.createElement(
        "div",
        { className: "w-40 mb-40" },
        import_react.default.createElement(ShimmerText, { line: 1, className: "mb-15 w-20" }),
        import_react.default.createElement(ShimmerText, { line: 1, className: "mb-15 w-40" }),
        import_react.default.createElement(ShimmerText, { line: 1, className: "mb-30 w-60" })
      ),
      import_react.default.createElement(ShimmerTitle, { line: 1, variant: "secondary", className: "w-30" }),
      import_react.default.createElement(ShimmerText, { className: "mb-40" }),
      import_react.default.createElement(ShimmerTitle, { line: 1, variant: "secondary", className: "w-30" }),
      import_react.default.createElement(ShimmerText, { className: "mb-40" }),
      import_react.default.createElement(ShimmerTitle, { line: 1, variant: "secondary", className: "w-30" }),
      import_react.default.createElement(ShimmerText, { className: "mb-40" }),
      import_react.default.createElement(ShimmerTitle, { line: 1, variant: "secondary", className: "w-30" }),
      import_react.default.createElement(ShimmerText, { className: "mb-40" }),
      cta && import_react.default.createElement(ShimmerButton, null)
    ),
    EDITOR: import_react.default.createElement(
      "div",
      null,
      import_react.default.createElement(ShimmerTitle, { line: 1, className: "w-40" }),
      import_react.default.createElement(ShimmerThumbnail, { height: 400 }),
      import_react.default.createElement(ShimmerText, null),
      import_react.default.createElement(ShimmerText, null),
      import_react.default.createElement(
        "div",
        { className: "shimmer-row" },
        import_react.default.createElement(
          "div",
          { className: "shimmer-col" },
          import_react.default.createElement(ShimmerText, { line: 13 })
        ),
        import_react.default.createElement(
          "div",
          { className: "shimmer-col" },
          import_react.default.createElement(ShimmerThumbnail, { height: 300 })
        )
      ),
      import_react.default.createElement(ShimmerText, null),
      import_react.default.createElement(ShimmerText, null),
      import_react.default.createElement(ShimmerText, null)
    )
  };
  if (!card)
    return variants[variant];
  return import_react.default.createElement(
    ShimmerCard,
    { paddingSize: 30 },
    variants[variant]
  );
};
ShimmerPostDetails.propTypes = {
  variant: import_prop_types.default.oneOf(["SIMPLE", "EDITOR"]),
  cta: import_prop_types.default.bool,
  card: import_prop_types.default.bool
};
ShimmerPostDetails.defaultProps = {
  variant: "SIMPLE",
  cta: false,
  card: false
};
var ShimmerPostItem = function ShimmerPostItem2(_ref) {
  var cta = _ref.cta, title = _ref.title, text = _ref.text, imageType = _ref.imageType, imageWidth = _ref.imageWidth, imageHeight = _ref.imageHeight;
  return import_react.default.createElement(
    ShimmerCard,
    null,
    imageType === "thumbnail" && import_react.default.createElement(ShimmerThumbnail, {
      height: imageHeight,
      width: imageWidth,
      className: imageWidth && imageWidth !== "w-100" ? "m-30 mb-0" : "mb-0"
    }),
    imageType === "circular" && import_react.default.createElement(ShimmerCircularImage, { size: imageWidth, className: "m-30 mb-0" }),
    import_react.default.createElement(
      "div",
      { className: "p-30" },
      title && import_react.default.createElement(ShimmerTitle, { variant: "secondary" }),
      text && import_react.default.createElement(ShimmerText, { line: 3, gap: 10 }),
      cta && import_react.default.createElement(ShimmerButton, { size: "sm" })
    )
  );
};
ShimmerPostItem.propTypes = {
  title: import_prop_types.default.bool,
  text: import_prop_types.default.bool,
  cta: import_prop_types.default.bool,
  imageType: import_prop_types.default.oneOf(["circular", "thumbnail"]),
  imageHeight: import_prop_types.default.number,
  imageWidth: import_prop_types.default.number
};
ShimmerPostItem.defaultProps = {
  title: false,
  text: false,
  cta: false,
  imageType: "thumbnail"
};
var ShimmerPostList = function ShimmerPostList2(_ref) {
  var _classNames;
  var row = _ref.row, col = _ref.col, gap = _ref.gap, className = _ref.className, postStyle = _ref.postStyle;
  var posts = {
    STYLE_ONE: import_react.default.createElement(ShimmerPostItem, { title: true, text: true, cta: true }),
    STYLE_TWO: import_react.default.createElement(ShimmerPostItem, { title: true, cta: true }),
    STYLE_THREE: import_react.default.createElement(ShimmerPostItem, { title: true }),
    STYLE_FOUR: import_react.default.createElement(ShimmerPostItem, { text: true, cta: true }),
    STYLE_FIVE: import_react.default.createElement(ShimmerPostItem, { text: true }),
    STYLE_SIX: import_react.default.createElement(ShimmerPostItem, {
      title: true,
      text: true,
      cta: true,
      imageType: "thumbnail",
      imageWidth: 80,
      imageHeight: 80,
      contentCenter: true
    }),
    STYLE_SEVEN: import_react.default.createElement(ShimmerPostItem, {
      text: true,
      cta: true,
      imageType: "thumbnail",
      imageWidth: 80,
      imageHeight: 80,
      contentCenter: true
    }),
    STYLE_EIGHT: import_react.default.createElement(ShimmerPostItem, {
      title: true,
      cta: true,
      imageType: "thumbnail",
      imageWidth: 80,
      imageHeight: 80,
      contentCenter: true
    })
  };
  var renderPosts = function renderPosts2() {
    var list = [];
    var items = row * col;
    for (var index = 0; index < items; index++) {
      list.push(import_react.default.createElement(
        "div",
        { key: index },
        posts[postStyle]
      ));
    }
    return list;
  };
  return import_react.default.createElement(
    "div",
    {
      className: classnames((_classNames = {
        grid: true
      }, defineProperty(_classNames, "grid-gap-" + gap, true), defineProperty(_classNames, "grid-column-" + col, true), defineProperty(_classNames, className, className), _classNames))
    },
    renderPosts()
  );
};
ShimmerPostList.propTypes = {
  row: import_prop_types.default.number,
  col: import_prop_types.default.oneOf([2, 3, 4]),
  gap: import_prop_types.default.oneOf([20, 30]),
  postStyle: import_prop_types.default.oneOf(["STYLE_ONE", "STYLE_TWO", "STYLE_THREE", "STYLE_FOUR", "STYLE_FIVE", "STYLE_SIX", "STYLE_SEVEN", "STYLE_EIGHT"])
};
ShimmerPostList.defaultProps = {
  row: 3,
  col: 3,
  gap: 20,
  postStyle: "STYLE_ONE"
};
var ShimmerContentBlock = function ShimmerContentBlock2(_ref) {
  var card = _ref.card, title = _ref.title, text = _ref.text, cta = _ref.cta, thumbnailWidth = _ref.thumbnailWidth, thumbnailHeight = _ref.thumbnailHeight, reverse = _ref.reverse;
  var renderContent = function renderContent2() {
    return import_react.default.createElement(
      "div",
      {
        className: classnames({
          flex: true,
          "flex-reverse": reverse
        })
      },
      import_react.default.createElement(
        "div",
        {
          className: classnames({
            flex: true,
            "w-50": !thumbnailWidth
          })
        },
        import_react.default.createElement(ShimmerThumbnail, {
          width: thumbnailWidth,
          height: thumbnailHeight,
          className: "h-100 m-0"
        })
      ),
      import_react.default.createElement(
        "div",
        { className: " flex-1 p-30" },
        title && import_react.default.createElement(ShimmerTitle, { className: "w-40", line: 1 }),
        text && import_react.default.createElement(ShimmerText, null),
        cta && import_react.default.createElement(ShimmerButton, null)
      )
    );
  };
  if (!card)
    return renderContent();
  return import_react.default.createElement(
    ShimmerCard,
    null,
    renderContent()
  );
};
ShimmerContentBlock.propTypes = {
  card: import_prop_types.default.bool,
  title: import_prop_types.default.bool,
  text: import_prop_types.default.bool,
  cta: import_prop_types.default.bool,
  thumbnailWidth: import_prop_types.default.number,
  thumbnailHeight: import_prop_types.default.number,
  reverse: import_prop_types.default.bool
};
ShimmerContentBlock.defaultProps = {
  card: true,
  title: false,
  text: false,
  cta: false,
  reverse: false
};
var ShimmerSectionHeader = function ShimmerSectionHeader2(_ref) {
  var title = _ref.title, subTitle = _ref.subTitle, center = _ref.center;
  if (!title && !subTitle)
    return null;
  return import_react.default.createElement(
    "div",
    {
      className: classnames({
        "w-60 mb-40": true,
        "ml-auto mr-auto": center
      })
    },
    title && import_react.default.createElement(ShimmerTitle, {
      className: classnames({
        "w-40": true,
        "ml-auto mr-auto": center
      }),
      line: 1
    }),
    subTitle && import_react.default.createElement(
      "div",
      {
        className: classnames({
          "flex-horizontal-center": center
        })
      },
      import_react.default.createElement(ShimmerText, { line: 1, className: "mb-15 w-80" }),
      import_react.default.createElement(ShimmerText, { line: 1, className: "mb-15 w-70" }),
      import_react.default.createElement(ShimmerText, { line: 1, className: "mb-15 w-60" })
    )
  );
};
ShimmerSectionHeader.propTypes = {
  title: import_prop_types.default.bool,
  subTitle: import_prop_types.default.bool,
  center: import_prop_types.default.bool
};
ShimmerSectionHeader.defaultProps = {
  title: true,
  subTitle: true,
  center: false
};
var css$9 = '.shimmer {\n  background: linear-gradient(to right, #f6f6f6 8%, #f0f0f0 18%, #f6f6f6 33%);\n  background-size: 1000px 100%;\n  animation: shimmer 2.2s linear infinite forwards; }\n\n@-webkit-keyframes shimmer {\n  0% {\n    background-position: -100% 0; }\n  100% {\n    background-position: 100% 0; } }\n\n@keyframes shimmer {\n  0% {\n    background-position: -1000px 0; }\n  100% {\n    background-position: 1000px 0; } }\n\n/*\n=====\nPadding Styles\n=====\n*/\n.p-30 {\n  padding: 30px; }\n\n.p-20 {\n  padding: 20px; }\n\n.p-15 {\n  padding: 15px; }\n\n/*\n=====\nMargin Styles\n=====\n*/\n.m-0 {\n  margin: 0; }\n\n.m-auto {\n  margin: auto; }\n\n.ml-auto {\n  margin-left: auto; }\n\n.mr-auto {\n  margin-right: auto; }\n\n.m-15 {\n  margin: 15px; }\n\n.m-30 {\n  margin: 30px; }\n\n.mb-0 {\n  margin-bottom: 0px; }\n\n.mb-10 {\n  margin-bottom: 10px; }\n\n.mb-15 {\n  margin-bottom: 15px; }\n\n.mb-20 {\n  margin-bottom: 20px; }\n\n.mt-15 {\n  margin-top: 15px; }\n\n.mb-30 {\n  margin-bottom: 30px; }\n\n.mb-40 {\n  margin-bottom: 40px; }\n\n/*\n=======\nContent Size Styles\n=======\n*/\n.w-10 {\n  width: 10%; }\n\n.w-20 {\n  width: 20%; }\n\n.w-30 {\n  width: 30%; }\n\n.w-40 {\n  width: 40%; }\n\n.w-50 {\n  width: 50%; }\n\n.w-60 {\n  width: 60%; }\n\n.w-70 {\n  width: 70%; }\n\n.w-80 {\n  width: 80%; }\n\n/*\n========\nFlex Styles\n========\n*/\n.flex {\n  display: flex; }\n\n.flex-direction-column {\n  flex-direction: column; }\n\n.flex-horizontal-center {\n  display: flex;\n  flex-direction: column;\n  align-items: center; }\n\n.flex-vertical-center {\n  align-items: center; }\n\n.flex-content-between {\n  justify-content: space-between; }\n\n.flex-reverse {\n  flex-direction: row-reverse; }\n\n.flex-1 {\n  flex-grow: 1; }\n\n/*\n=======\nGrid Styles\n=======\n*/\n.grid {\n  display: grid; }\n\n.grid-gap-10 {\n  gap: 10px; }\n\n.grid-gap-15 {\n  gap: 15px; }\n\n.grid-gap-20 {\n  gap: 20px; }\n\n.grid-gap-30 {\n  gap: 30px; }\n\n.grid-column-2 {\n  grid-template-columns: auto auto; }\n\n.grid-column-3 {\n  grid-template-columns: auto auto auto; }\n\n.grid-column-4 {\n  grid-template-columns: auto auto auto auto; }\n\n.text-center {\n  text-align: center; }\n\n.border-rounded {\n  border-radius: 4px; }\n\n.h-100 {\n  height: 100% !important; }\n\n.shimmer-hr {\n  border-color: #f6f6f6; }\n\n.shimmer-row {\n  display: flex;\n  margin: 0 -15px; }\n  .shimmer-row .shimmer-col,\n  .shimmer-row [class*="shimmer-col-"] {\n    padding-left: 15px;\n    padding-right: 15px;\n    flex-basis: 0;\n    flex-grow: 1;\n    max-width: 100%; }\n';
styleInject(css$9);
export {
  ShimmerBadge,
  ShimmerButton,
  ShimmerCard,
  ShimmerCategoryItem,
  ShimmerCategoryList,
  ShimmerCircularImage,
  ShimmerContentBlock,
  ShimmerFeaturedGallery,
  ShimmerPostDetails,
  ShimmerPostItem,
  ShimmerPostList,
  ShimmerSectionHeader,
  ShimmerSeparator,
  ShimmerSimpleGallery,
  ShimmerSocialPost,
  ShimmerTable,
  ShimmerTableCol,
  ShimmerTableRow,
  ShimmerText,
  ShimmerThumbnail,
  ShimmerTitle
};
/*! Bundled license information:

react-is/cjs/react-is.development.js:
  (** @license React v16.13.1
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

object-assign/index.js:
  (*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  *)

react-shimmer-effects/dist/index.es.js:
  (*!
    Copyright (c) 2018 Jed Watson.
    Licensed under the MIT License (MIT), see
    http://jedwatson.github.io/classnames
  *)
*/
//# sourceMappingURL=react-shimmer-effects.js.map
