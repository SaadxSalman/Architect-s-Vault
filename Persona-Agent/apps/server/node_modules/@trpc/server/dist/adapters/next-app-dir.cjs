const require_getErrorShape = require('../getErrorShape-MR4DZeb7.cjs');
require('../codes-BfZsPdy-.cjs');
const require_tracked = require('../tracked-D4WGA_Z-.cjs');
require('../parseTRPCMessage-7Ltmq-Fb.cjs');
require('../resolveResponse-ByfQ6olt.cjs');
require('../contentTypeParsers-iAFF_pJG.cjs');
const require_unstable_core_do_not_import = require('../unstable-core-do-not-import-fsjhEhgh.cjs');
require('../observable-B1Nk6r1H.cjs');
require('../initTRPC--HrEu8sH.cjs');

//#region src/adapters/next-app-dir/redirect.ts
var import_defineProperty = require_getErrorShape.__toESM(require_getErrorShape.require_defineProperty(), 1);
/**
* @internal
*/
var TRPCRedirectError = class extends require_tracked.TRPCError {
	constructor(url, redirectType) {
		super({
			code: "UNPROCESSABLE_CONTENT",
			message: `Redirect error to "${url}" that will be handled by Next.js`
		});
		(0, import_defineProperty.default)(this, "args", void 0);
		this.args = [url.toString(), redirectType];
	}
};
/**
* Like `next/navigation`'s `redirect()` but throws a `TRPCError` that later will be handled by Next.js
* This provides better typesafety than the `next/navigation`'s `redirect()` since the action continues
* to execute on the frontend even if Next's `redirect()` has a return type of `never`.
* @public
* @remark You should only use this if you're also using `nextAppDirCaller`.
*/
const redirect = (url, redirectType) => {
	return new TRPCRedirectError(url, redirectType);
};

//#endregion
//#region ../../node_modules/.pnpm/react@19.1.0/node_modules/react/cjs/react.production.js
var require_react_production = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/react@19.1.0/node_modules/react/cjs/react.production.js"(exports) {
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	function getIteratorFn(maybeIterable) {
		if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
		maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
		return "function" === typeof maybeIterable ? maybeIterable : null;
	}
	var ReactNoopUpdateQueue = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, assign = Object.assign, emptyObject = {};
	function Component(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	Component.prototype.isReactComponent = {};
	Component.prototype.setState = function(partialState, callback) {
		if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, partialState, callback, "setState");
	};
	Component.prototype.forceUpdate = function(callback) {
		this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
	};
	function ComponentDummy() {}
	ComponentDummy.prototype = Component.prototype;
	function PureComponent(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
	pureComponentPrototype.constructor = PureComponent;
	assign(pureComponentPrototype, Component.prototype);
	pureComponentPrototype.isPureReactComponent = !0;
	var isArrayImpl = Array.isArray, ReactSharedInternals = {
		H: null,
		A: null,
		T: null,
		S: null,
		V: null
	}, hasOwnProperty = Object.prototype.hasOwnProperty;
	function ReactElement(type, key, self, source, owner, props) {
		self = props.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== self ? self : null,
			props
		};
	}
	function cloneAndReplaceKey(oldElement, newKey) {
		return ReactElement(oldElement.type, newKey, void 0, void 0, void 0, oldElement.props);
	}
	function isValidElement(object) {
		return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function escape(key) {
		var escaperLookup = {
			"=": "=0",
			":": "=2"
		};
		return "$" + key.replace(/[=:]/g, function(match) {
			return escaperLookup[match];
		});
	}
	var userProvidedKeyEscapeRegex = /\/+/g;
	function getElementKey(element, index) {
		return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
	}
	function noop$1() {}
	function resolveThenable(thenable) {
		switch (thenable.status) {
			case "fulfilled": return thenable.value;
			case "rejected": throw thenable.reason;
			default: switch ("string" === typeof thenable.status ? thenable.then(noop$1, noop$1) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
				"pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
			}, function(error) {
				"pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
			})), thenable.status) {
				case "fulfilled": return thenable.value;
				case "rejected": throw thenable.reason;
			}
		}
		throw thenable;
	}
	function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
		var type = typeof children;
		if ("undefined" === type || "boolean" === type) children = null;
		var invokeCallback = !1;
		if (null === children) invokeCallback = !0;
		else switch (type) {
			case "bigint":
			case "string":
			case "number":
				invokeCallback = !0;
				break;
			case "object": switch (children.$$typeof) {
				case REACT_ELEMENT_TYPE:
				case REACT_PORTAL_TYPE:
					invokeCallback = !0;
					break;
				case REACT_LAZY_TYPE: return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
			}
		}
		if (invokeCallback) return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
			return c;
		})) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + invokeCallback)), array.push(callback)), 1;
		invokeCallback = 0;
		var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
		if (isArrayImpl(children)) for (var i = 0; i < children.length; i++) nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if (i = getIteratorFn(children), "function" === typeof i) for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done;) nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if ("object" === type) {
			if ("function" === typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
			array = String(children);
			throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
		}
		return invokeCallback;
	}
	function mapChildren(children, func, context) {
		if (null == children) return children;
		var result = [], count = 0;
		mapIntoArray(children, result, "", "", function(child) {
			return func.call(context, child, count++);
		});
		return result;
	}
	function lazyInitializer(payload) {
		if (-1 === payload._status) {
			var ctor = payload._result;
			ctor = ctor();
			ctor.then(function(moduleObject) {
				if (0 === payload._status || -1 === payload._status) payload._status = 1, payload._result = moduleObject;
			}, function(error) {
				if (0 === payload._status || -1 === payload._status) payload._status = 2, payload._result = error;
			});
			-1 === payload._status && (payload._status = 0, payload._result = ctor);
		}
		if (1 === payload._status) return payload._result.default;
		throw payload._result;
	}
	var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
		if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
			var event = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
				error
			});
			if (!window.dispatchEvent(event)) return;
		} else if ("object" === typeof process && "function" === typeof process.emit) {
			process.emit("uncaughtException", error);
			return;
		}
		console.error(error);
	};
	function noop() {}
	exports.Children = {
		map: mapChildren,
		forEach: function(children, forEachFunc, forEachContext) {
			mapChildren(children, function() {
				forEachFunc.apply(this, arguments);
			}, forEachContext);
		},
		count: function(children) {
			var n = 0;
			mapChildren(children, function() {
				n++;
			});
			return n;
		},
		toArray: function(children) {
			return mapChildren(children, function(child) {
				return child;
			}) || [];
		},
		only: function(children) {
			if (!isValidElement(children)) throw Error("React.Children.only expected to receive a single React element child.");
			return children;
		}
	};
	exports.Component = Component;
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.Profiler = REACT_PROFILER_TYPE;
	exports.PureComponent = PureComponent;
	exports.StrictMode = REACT_STRICT_MODE_TYPE;
	exports.Suspense = REACT_SUSPENSE_TYPE;
	exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
	exports.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(size) {
			return ReactSharedInternals.H.useMemoCache(size);
		}
	};
	exports.cache = function(fn) {
		return function() {
			return fn.apply(null, arguments);
		};
	};
	exports.cloneElement = function(element, config, children) {
		if (null === element || void 0 === element) throw Error("The argument must be a React element, but you passed " + element + ".");
		var props = assign({}, element.props), key = element.key, owner = void 0;
		if (null != config) for (propName in void 0 !== config.ref && (owner = void 0), void 0 !== config.key && (key = "" + config.key), config) !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
		var propName = arguments.length - 2;
		if (1 === propName) props.children = children;
		else if (1 < propName) {
			for (var childArray = Array(propName), i = 0; i < propName; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		return ReactElement(element.type, key, void 0, void 0, owner, props);
	};
	exports.createContext = function(defaultValue) {
		defaultValue = {
			$$typeof: REACT_CONTEXT_TYPE,
			_currentValue: defaultValue,
			_currentValue2: defaultValue,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		};
		defaultValue.Provider = defaultValue;
		defaultValue.Consumer = {
			$$typeof: REACT_CONSUMER_TYPE,
			_context: defaultValue
		};
		return defaultValue;
	};
	exports.createElement = function(type, config, children) {
		var propName, props = {}, key = null;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
		var childrenLength = arguments.length - 2;
		if (1 === childrenLength) props.children = children;
		else if (1 < childrenLength) {
			for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		if (type && type.defaultProps) for (propName in childrenLength = type.defaultProps, childrenLength) void 0 === props[propName] && (props[propName] = childrenLength[propName]);
		return ReactElement(type, key, void 0, void 0, null, props);
	};
	exports.createRef = function() {
		return { current: null };
	};
	exports.forwardRef = function(render) {
		return {
			$$typeof: REACT_FORWARD_REF_TYPE,
			render
		};
	};
	exports.isValidElement = isValidElement;
	exports.lazy = function(ctor) {
		return {
			$$typeof: REACT_LAZY_TYPE,
			_payload: {
				_status: -1,
				_result: ctor
			},
			_init: lazyInitializer
		};
	};
	exports.memo = function(type, compare) {
		return {
			$$typeof: REACT_MEMO_TYPE,
			type,
			compare: void 0 === compare ? null : compare
		};
	};
	exports.startTransition = function(scope) {
		var prevTransition = ReactSharedInternals.T, currentTransition = {};
		ReactSharedInternals.T = currentTransition;
		try {
			var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
			null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
			"object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
		} catch (error) {
			reportGlobalError(error);
		} finally {
			ReactSharedInternals.T = prevTransition;
		}
	};
	exports.unstable_useCacheRefresh = function() {
		return ReactSharedInternals.H.useCacheRefresh();
	};
	exports.use = function(usable) {
		return ReactSharedInternals.H.use(usable);
	};
	exports.useActionState = function(action, initialState, permalink) {
		return ReactSharedInternals.H.useActionState(action, initialState, permalink);
	};
	exports.useCallback = function(callback, deps) {
		return ReactSharedInternals.H.useCallback(callback, deps);
	};
	exports.useContext = function(Context) {
		return ReactSharedInternals.H.useContext(Context);
	};
	exports.useDebugValue = function() {};
	exports.useDeferredValue = function(value, initialValue) {
		return ReactSharedInternals.H.useDeferredValue(value, initialValue);
	};
	exports.useEffect = function(create, createDeps, update) {
		var dispatcher = ReactSharedInternals.H;
		if ("function" === typeof update) throw Error("useEffect CRUD overload is not enabled in this build of React.");
		return dispatcher.useEffect(create, createDeps);
	};
	exports.useId = function() {
		return ReactSharedInternals.H.useId();
	};
	exports.useImperativeHandle = function(ref, create, deps) {
		return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
	};
	exports.useInsertionEffect = function(create, deps) {
		return ReactSharedInternals.H.useInsertionEffect(create, deps);
	};
	exports.useLayoutEffect = function(create, deps) {
		return ReactSharedInternals.H.useLayoutEffect(create, deps);
	};
	exports.useMemo = function(create, deps) {
		return ReactSharedInternals.H.useMemo(create, deps);
	};
	exports.useOptimistic = function(passthrough, reducer) {
		return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
	};
	exports.useReducer = function(reducer, initialArg, init) {
		return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
	};
	exports.useRef = function(initialValue) {
		return ReactSharedInternals.H.useRef(initialValue);
	};
	exports.useState = function(initialState) {
		return ReactSharedInternals.H.useState(initialState);
	};
	exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
		return ReactSharedInternals.H.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
	};
	exports.useTransition = function() {
		return ReactSharedInternals.H.useTransition();
	};
	exports.version = "19.1.0";
} });

//#endregion
//#region ../../node_modules/.pnpm/react@19.1.0/node_modules/react/cjs/react.development.js
var require_react_development = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/react@19.1.0/node_modules/react/cjs/react.development.js"(exports, module) {
	"production" !== process.env.NODE_ENV && function() {
		function defineDeprecationWarning(methodName, info) {
			Object.defineProperty(Component$1.prototype, methodName, { get: function() {
				console.warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
			} });
		}
		function getIteratorFn$1(maybeIterable) {
			if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
			maybeIterable = MAYBE_ITERATOR_SYMBOL$1 && maybeIterable[MAYBE_ITERATOR_SYMBOL$1] || maybeIterable["@@iterator"];
			return "function" === typeof maybeIterable ? maybeIterable : null;
		}
		function warnNoop(publicInstance, callerName) {
			publicInstance = (publicInstance = publicInstance.constructor) && (publicInstance.displayName || publicInstance.name) || "ReactClass";
			var warningKey = publicInstance + "." + callerName;
			didWarnStateUpdateForUnmountedComponent[warningKey] || (console.error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, publicInstance), didWarnStateUpdateForUnmountedComponent[warningKey] = !0);
		}
		function Component$1(props, context, updater) {
			this.props = props;
			this.context = context;
			this.refs = emptyObject$1;
			this.updater = updater || ReactNoopUpdateQueue$1;
		}
		function ComponentDummy$1() {}
		function PureComponent$1(props, context, updater) {
			this.props = props;
			this.context = context;
			this.refs = emptyObject$1;
			this.updater = updater || ReactNoopUpdateQueue$1;
		}
		function testStringCoercion(value) {
			return "" + value;
		}
		function checkKeyStringCoercion(value) {
			try {
				testStringCoercion(value);
				var JSCompiler_inline_result = !1;
			} catch (e) {
				JSCompiler_inline_result = !0;
			}
			if (JSCompiler_inline_result) {
				JSCompiler_inline_result = console;
				var JSCompiler_temp_const = JSCompiler_inline_result.error;
				var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
				JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
				return testStringCoercion(value);
			}
		}
		function getComponentNameFromType(type) {
			if (null == type) return null;
			if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
			if ("string" === typeof type) return type;
			switch (type) {
				case REACT_FRAGMENT_TYPE$1: return "Fragment";
				case REACT_PROFILER_TYPE$1: return "Profiler";
				case REACT_STRICT_MODE_TYPE$1: return "StrictMode";
				case REACT_SUSPENSE_TYPE$1: return "Suspense";
				case REACT_SUSPENSE_LIST_TYPE: return "SuspenseList";
				case REACT_ACTIVITY_TYPE: return "Activity";
			}
			if ("object" === typeof type) switch ("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof) {
				case REACT_PORTAL_TYPE$1: return "Portal";
				case REACT_CONTEXT_TYPE$1: return (type.displayName || "Context") + ".Provider";
				case REACT_CONSUMER_TYPE$1: return (type._context.displayName || "Context") + ".Consumer";
				case REACT_FORWARD_REF_TYPE$1:
					var innerType = type.render;
					type = type.displayName;
					type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
					return type;
				case REACT_MEMO_TYPE$1: return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
				case REACT_LAZY_TYPE$1:
					innerType = type._payload;
					type = type._init;
					try {
						return getComponentNameFromType(type(innerType));
					} catch (x) {}
			}
			return null;
		}
		function getTaskName(type) {
			if (type === REACT_FRAGMENT_TYPE$1) return "<>";
			if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE$1) return "<...>";
			try {
				var name = getComponentNameFromType(type);
				return name ? "<" + name + ">" : "<...>";
			} catch (x) {
				return "<...>";
			}
		}
		function getOwner() {
			var dispatcher = ReactSharedInternals$1.A;
			return null === dispatcher ? null : dispatcher.getOwner();
		}
		function UnknownOwner() {
			return Error("react-stack-top-frame");
		}
		function hasValidKey(config) {
			if (hasOwnProperty$1.call(config, "key")) {
				var getter = Object.getOwnPropertyDescriptor(config, "key").get;
				if (getter && getter.isReactWarning) return !1;
			}
			return void 0 !== config.key;
		}
		function defineKeyPropWarningGetter(props, displayName) {
			function warnAboutAccessingKey() {
				specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
			}
			warnAboutAccessingKey.isReactWarning = !0;
			Object.defineProperty(props, "key", {
				get: warnAboutAccessingKey,
				configurable: !0
			});
		}
		function elementRefGetterWithDeprecationWarning() {
			var componentName = getComponentNameFromType(this.type);
			didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
			componentName = this.props.ref;
			return void 0 !== componentName ? componentName : null;
		}
		function ReactElement$1(type, key, self, source, owner, props, debugStack, debugTask) {
			self = props.ref;
			type = {
				$$typeof: REACT_ELEMENT_TYPE$1,
				type,
				key,
				props,
				_owner: owner
			};
			null !== (void 0 !== self ? self : null) ? Object.defineProperty(type, "ref", {
				enumerable: !1,
				get: elementRefGetterWithDeprecationWarning
			}) : Object.defineProperty(type, "ref", {
				enumerable: !1,
				value: null
			});
			type._store = {};
			Object.defineProperty(type._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			});
			Object.defineProperty(type, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			});
			Object.defineProperty(type, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: debugStack
			});
			Object.defineProperty(type, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: debugTask
			});
			Object.freeze && (Object.freeze(type.props), Object.freeze(type));
			return type;
		}
		function cloneAndReplaceKey$1(oldElement, newKey) {
			newKey = ReactElement$1(oldElement.type, newKey, void 0, void 0, oldElement._owner, oldElement.props, oldElement._debugStack, oldElement._debugTask);
			oldElement._store && (newKey._store.validated = oldElement._store.validated);
			return newKey;
		}
		function isValidElement$1(object) {
			return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE$1;
		}
		function escape$1(key) {
			var escaperLookup = {
				"=": "=0",
				":": "=2"
			};
			return "$" + key.replace(/[=:]/g, function(match) {
				return escaperLookup[match];
			});
		}
		function getElementKey$1(element, index) {
			return "object" === typeof element && null !== element && null != element.key ? (checkKeyStringCoercion(element.key), escape$1("" + element.key)) : index.toString(36);
		}
		function noop$1$1() {}
		function resolveThenable$1(thenable) {
			switch (thenable.status) {
				case "fulfilled": return thenable.value;
				case "rejected": throw thenable.reason;
				default: switch ("string" === typeof thenable.status ? thenable.then(noop$1$1, noop$1$1) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
					"pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
				}, function(error) {
					"pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
				})), thenable.status) {
					case "fulfilled": return thenable.value;
					case "rejected": throw thenable.reason;
				}
			}
			throw thenable;
		}
		function mapIntoArray$1(children, array, escapedPrefix, nameSoFar, callback) {
			var type = typeof children;
			if ("undefined" === type || "boolean" === type) children = null;
			var invokeCallback = !1;
			if (null === children) invokeCallback = !0;
			else switch (type) {
				case "bigint":
				case "string":
				case "number":
					invokeCallback = !0;
					break;
				case "object": switch (children.$$typeof) {
					case REACT_ELEMENT_TYPE$1:
					case REACT_PORTAL_TYPE$1:
						invokeCallback = !0;
						break;
					case REACT_LAZY_TYPE$1: return invokeCallback = children._init, mapIntoArray$1(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
				}
			}
			if (invokeCallback) {
				invokeCallback = children;
				callback = callback(invokeCallback);
				var childKey = "" === nameSoFar ? "." + getElementKey$1(invokeCallback, 0) : nameSoFar;
				isArrayImpl$1(callback) ? (escapedPrefix = "", null != childKey && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex$1, "$&/") + "/"), mapIntoArray$1(callback, array, escapedPrefix, "", function(c) {
					return c;
				})) : null != callback && (isValidElement$1(callback) && (null != callback.key && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey$1(callback, escapedPrefix + (null == callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex$1, "$&/") + "/") + childKey), "" !== nameSoFar && null != invokeCallback && isValidElement$1(invokeCallback) && null == invokeCallback.key && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
				return 1;
			}
			invokeCallback = 0;
			childKey = "" === nameSoFar ? "." : nameSoFar + ":";
			if (isArrayImpl$1(children)) for (var i = 0; i < children.length; i++) nameSoFar = children[i], type = childKey + getElementKey$1(nameSoFar, i), invokeCallback += mapIntoArray$1(nameSoFar, array, escapedPrefix, type, callback);
			else if (i = getIteratorFn$1(children), "function" === typeof i) for (i === children.entries && (didWarnAboutMaps || console.warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), didWarnAboutMaps = !0), children = i.call(children), i = 0; !(nameSoFar = children.next()).done;) nameSoFar = nameSoFar.value, type = childKey + getElementKey$1(nameSoFar, i++), invokeCallback += mapIntoArray$1(nameSoFar, array, escapedPrefix, type, callback);
			else if ("object" === type) {
				if ("function" === typeof children.then) return mapIntoArray$1(resolveThenable$1(children), array, escapedPrefix, nameSoFar, callback);
				array = String(children);
				throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
			}
			return invokeCallback;
		}
		function mapChildren$1(children, func, context) {
			if (null == children) return children;
			var result = [], count = 0;
			mapIntoArray$1(children, result, "", "", function(child) {
				return func.call(context, child, count++);
			});
			return result;
		}
		function lazyInitializer$1(payload) {
			if (-1 === payload._status) {
				var ctor = payload._result;
				ctor = ctor();
				ctor.then(function(moduleObject) {
					if (0 === payload._status || -1 === payload._status) payload._status = 1, payload._result = moduleObject;
				}, function(error) {
					if (0 === payload._status || -1 === payload._status) payload._status = 2, payload._result = error;
				});
				-1 === payload._status && (payload._status = 0, payload._result = ctor);
			}
			if (1 === payload._status) return ctor = payload._result, void 0 === ctor && console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", ctor), "default" in ctor || console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", ctor), ctor.default;
			throw payload._result;
		}
		function resolveDispatcher() {
			var dispatcher = ReactSharedInternals$1.H;
			null === dispatcher && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
			return dispatcher;
		}
		function noop$2() {}
		function enqueueTask(task) {
			if (null === enqueueTaskImpl) try {
				var requireString = ("require" + Math.random()).slice(0, 7);
				enqueueTaskImpl = (module && module[requireString]).call(module, "timers").setImmediate;
			} catch (_err) {
				enqueueTaskImpl = function(callback) {
					!1 === didWarnAboutMessageChannel && (didWarnAboutMessageChannel = !0, "undefined" === typeof MessageChannel && console.error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
					var channel = new MessageChannel();
					channel.port1.onmessage = callback;
					channel.port2.postMessage(void 0);
				};
			}
			return enqueueTaskImpl(task);
		}
		function aggregateErrors(errors) {
			return 1 < errors.length && "function" === typeof AggregateError ? new AggregateError(errors) : errors[0];
		}
		function popActScope(prevActQueue, prevActScopeDepth) {
			prevActScopeDepth !== actScopeDepth - 1 && console.error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
			actScopeDepth = prevActScopeDepth;
		}
		function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
			var queue = ReactSharedInternals$1.actQueue;
			if (null !== queue) if (0 !== queue.length) try {
				flushActQueue(queue);
				enqueueTask(function() {
					return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
				});
				return;
			} catch (error) {
				ReactSharedInternals$1.thrownErrors.push(error);
			}
			else ReactSharedInternals$1.actQueue = null;
			0 < ReactSharedInternals$1.thrownErrors.length ? (queue = aggregateErrors(ReactSharedInternals$1.thrownErrors), ReactSharedInternals$1.thrownErrors.length = 0, reject(queue)) : resolve(returnValue);
		}
		function flushActQueue(queue) {
			if (!isFlushing) {
				isFlushing = !0;
				var i = 0;
				try {
					for (; i < queue.length; i++) {
						var callback = queue[i];
						do {
							ReactSharedInternals$1.didUsePromise = !1;
							var continuation = callback(!1);
							if (null !== continuation) {
								if (ReactSharedInternals$1.didUsePromise) {
									queue[i] = callback;
									queue.splice(0, i);
									return;
								}
								callback = continuation;
							} else break;
						} while (1);
					}
					queue.length = 0;
				} catch (error) {
					queue.splice(0, i + 1), ReactSharedInternals$1.thrownErrors.push(error);
				} finally {
					isFlushing = !1;
				}
			}
		}
		"undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var REACT_ELEMENT_TYPE$1 = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE$1 = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE$1 = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE$1 = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE$1 = Symbol.for("react.profiler");
		Symbol.for("react.provider");
		var REACT_CONSUMER_TYPE$1 = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE$1 = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE$1 = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE$1 = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE$1 = Symbol.for("react.memo"), REACT_LAZY_TYPE$1 = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL$1 = Symbol.iterator, didWarnStateUpdateForUnmountedComponent = {}, ReactNoopUpdateQueue$1 = {
			isMounted: function() {
				return !1;
			},
			enqueueForceUpdate: function(publicInstance) {
				warnNoop(publicInstance, "forceUpdate");
			},
			enqueueReplaceState: function(publicInstance) {
				warnNoop(publicInstance, "replaceState");
			},
			enqueueSetState: function(publicInstance) {
				warnNoop(publicInstance, "setState");
			}
		}, assign$1 = Object.assign, emptyObject$1 = {};
		Object.freeze(emptyObject$1);
		Component$1.prototype.isReactComponent = {};
		Component$1.prototype.setState = function(partialState, callback) {
			if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
			this.updater.enqueueSetState(this, partialState, callback, "setState");
		};
		Component$1.prototype.forceUpdate = function(callback) {
			this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
		};
		var deprecatedAPIs = {
			isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
			replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
		}, fnName;
		for (fnName in deprecatedAPIs) deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
		ComponentDummy$1.prototype = Component$1.prototype;
		deprecatedAPIs = PureComponent$1.prototype = new ComponentDummy$1();
		deprecatedAPIs.constructor = PureComponent$1;
		assign$1(deprecatedAPIs, Component$1.prototype);
		deprecatedAPIs.isPureReactComponent = !0;
		var isArrayImpl$1 = Array.isArray, REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals$1 = {
			H: null,
			A: null,
			T: null,
			S: null,
			V: null,
			actQueue: null,
			isBatchingLegacy: !1,
			didScheduleLegacyUpdate: !1,
			didUsePromise: !1,
			thrownErrors: [],
			getCurrentStack: null,
			recentlyCreatedOwnerStacks: 0
		}, hasOwnProperty$1 = Object.prototype.hasOwnProperty, createTask = console.createTask ? console.createTask : function() {
			return null;
		};
		deprecatedAPIs = { "react-stack-bottom-frame": function(callStackForError) {
			return callStackForError();
		} };
		var specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
		var didWarnAboutElementRef = {};
		var unknownOwnerDebugStack = deprecatedAPIs["react-stack-bottom-frame"].bind(deprecatedAPIs, UnknownOwner)();
		var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
		var didWarnAboutMaps = !1, userProvidedKeyEscapeRegex$1 = /\/+/g, reportGlobalError$1 = "function" === typeof reportError ? reportError : function(error) {
			if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
				var event = new window.ErrorEvent("error", {
					bubbles: !0,
					cancelable: !0,
					message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
					error
				});
				if (!window.dispatchEvent(event)) return;
			} else if ("object" === typeof process && "function" === typeof process.emit) {
				process.emit("uncaughtException", error);
				return;
			}
			console.error(error);
		}, didWarnAboutMessageChannel = !1, enqueueTaskImpl = null, actScopeDepth = 0, didWarnNoAwaitAct = !1, isFlushing = !1, queueSeveralMicrotasks = "function" === typeof queueMicrotask ? function(callback) {
			queueMicrotask(function() {
				return queueMicrotask(callback);
			});
		} : enqueueTask;
		deprecatedAPIs = Object.freeze({
			__proto__: null,
			c: function(size) {
				return resolveDispatcher().useMemoCache(size);
			}
		});
		exports.Children = {
			map: mapChildren$1,
			forEach: function(children, forEachFunc, forEachContext) {
				mapChildren$1(children, function() {
					forEachFunc.apply(this, arguments);
				}, forEachContext);
			},
			count: function(children) {
				var n = 0;
				mapChildren$1(children, function() {
					n++;
				});
				return n;
			},
			toArray: function(children) {
				return mapChildren$1(children, function(child) {
					return child;
				}) || [];
			},
			only: function(children) {
				if (!isValidElement$1(children)) throw Error("React.Children.only expected to receive a single React element child.");
				return children;
			}
		};
		exports.Component = Component$1;
		exports.Fragment = REACT_FRAGMENT_TYPE$1;
		exports.Profiler = REACT_PROFILER_TYPE$1;
		exports.PureComponent = PureComponent$1;
		exports.StrictMode = REACT_STRICT_MODE_TYPE$1;
		exports.Suspense = REACT_SUSPENSE_TYPE$1;
		exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals$1;
		exports.__COMPILER_RUNTIME = deprecatedAPIs;
		exports.act = function(callback) {
			var prevActQueue = ReactSharedInternals$1.actQueue, prevActScopeDepth = actScopeDepth;
			actScopeDepth++;
			var queue = ReactSharedInternals$1.actQueue = null !== prevActQueue ? prevActQueue : [], didAwaitActCall = !1;
			try {
				var result = callback();
			} catch (error) {
				ReactSharedInternals$1.thrownErrors.push(error);
			}
			if (0 < ReactSharedInternals$1.thrownErrors.length) throw popActScope(prevActQueue, prevActScopeDepth), callback = aggregateErrors(ReactSharedInternals$1.thrownErrors), ReactSharedInternals$1.thrownErrors.length = 0, callback;
			if (null !== result && "object" === typeof result && "function" === typeof result.then) {
				var thenable = result;
				queueSeveralMicrotasks(function() {
					didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = !0, console.error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
				});
				return { then: function(resolve, reject) {
					didAwaitActCall = !0;
					thenable.then(function(returnValue) {
						popActScope(prevActQueue, prevActScopeDepth);
						if (0 === prevActScopeDepth) {
							try {
								flushActQueue(queue), enqueueTask(function() {
									return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
								});
							} catch (error$0) {
								ReactSharedInternals$1.thrownErrors.push(error$0);
							}
							if (0 < ReactSharedInternals$1.thrownErrors.length) {
								var _thrownError = aggregateErrors(ReactSharedInternals$1.thrownErrors);
								ReactSharedInternals$1.thrownErrors.length = 0;
								reject(_thrownError);
							}
						} else resolve(returnValue);
					}, function(error) {
						popActScope(prevActQueue, prevActScopeDepth);
						0 < ReactSharedInternals$1.thrownErrors.length ? (error = aggregateErrors(ReactSharedInternals$1.thrownErrors), ReactSharedInternals$1.thrownErrors.length = 0, reject(error)) : reject(error);
					});
				} };
			}
			var returnValue$jscomp$0 = result;
			popActScope(prevActQueue, prevActScopeDepth);
			0 === prevActScopeDepth && (flushActQueue(queue), 0 !== queue.length && queueSeveralMicrotasks(function() {
				didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = !0, console.error("A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"));
			}), ReactSharedInternals$1.actQueue = null);
			if (0 < ReactSharedInternals$1.thrownErrors.length) throw callback = aggregateErrors(ReactSharedInternals$1.thrownErrors), ReactSharedInternals$1.thrownErrors.length = 0, callback;
			return { then: function(resolve, reject) {
				didAwaitActCall = !0;
				0 === prevActScopeDepth ? (ReactSharedInternals$1.actQueue = queue, enqueueTask(function() {
					return recursivelyFlushAsyncActWork(returnValue$jscomp$0, resolve, reject);
				})) : resolve(returnValue$jscomp$0);
			} };
		};
		exports.cache = function(fn) {
			return function() {
				return fn.apply(null, arguments);
			};
		};
		exports.captureOwnerStack = function() {
			var getCurrentStack = ReactSharedInternals$1.getCurrentStack;
			return null === getCurrentStack ? null : getCurrentStack();
		};
		exports.cloneElement = function(element, config, children) {
			if (null === element || void 0 === element) throw Error("The argument must be a React element, but you passed " + element + ".");
			var props = assign$1({}, element.props), key = element.key, owner = element._owner;
			if (null != config) {
				var JSCompiler_inline_result;
				a: {
					if (hasOwnProperty$1.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(config, "ref").get) && JSCompiler_inline_result.isReactWarning) {
						JSCompiler_inline_result = !1;
						break a;
					}
					JSCompiler_inline_result = void 0 !== config.ref;
				}
				JSCompiler_inline_result && (owner = getOwner());
				hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
				for (propName in config) !hasOwnProperty$1.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
			}
			var propName = arguments.length - 2;
			if (1 === propName) props.children = children;
			else if (1 < propName) {
				JSCompiler_inline_result = Array(propName);
				for (var i = 0; i < propName; i++) JSCompiler_inline_result[i] = arguments[i + 2];
				props.children = JSCompiler_inline_result;
			}
			props = ReactElement$1(element.type, key, void 0, void 0, owner, props, element._debugStack, element._debugTask);
			for (key = 2; key < arguments.length; key++) owner = arguments[key], isValidElement$1(owner) && owner._store && (owner._store.validated = 1);
			return props;
		};
		exports.createContext = function(defaultValue) {
			defaultValue = {
				$$typeof: REACT_CONTEXT_TYPE$1,
				_currentValue: defaultValue,
				_currentValue2: defaultValue,
				_threadCount: 0,
				Provider: null,
				Consumer: null
			};
			defaultValue.Provider = defaultValue;
			defaultValue.Consumer = {
				$$typeof: REACT_CONSUMER_TYPE$1,
				_context: defaultValue
			};
			defaultValue._currentRenderer = null;
			defaultValue._currentRenderer2 = null;
			return defaultValue;
		};
		exports.createElement = function(type, config, children) {
			for (var i = 2; i < arguments.length; i++) {
				var node = arguments[i];
				isValidElement$1(node) && node._store && (node._store.validated = 1);
			}
			i = {};
			node = null;
			if (null != config) for (propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = !0, console.warn("Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform")), hasValidKey(config) && (checkKeyStringCoercion(config.key), node = "" + config.key), config) hasOwnProperty$1.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (i[propName] = config[propName]);
			var childrenLength = arguments.length - 2;
			if (1 === childrenLength) i.children = children;
			else if (1 < childrenLength) {
				for (var childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++) childArray[_i] = arguments[_i + 2];
				Object.freeze && Object.freeze(childArray);
				i.children = childArray;
			}
			if (type && type.defaultProps) for (propName in childrenLength = type.defaultProps, childrenLength) void 0 === i[propName] && (i[propName] = childrenLength[propName]);
			node && defineKeyPropWarningGetter(i, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
			var propName = 1e4 > ReactSharedInternals$1.recentlyCreatedOwnerStacks++;
			return ReactElement$1(type, node, void 0, void 0, getOwner(), i, propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack, propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
		};
		exports.createRef = function() {
			var refObject = { current: null };
			Object.seal(refObject);
			return refObject;
		};
		exports.forwardRef = function(render) {
			null != render && render.$$typeof === REACT_MEMO_TYPE$1 ? console.error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : "function" !== typeof render ? console.error("forwardRef requires a render function but was given %s.", null === render ? "null" : typeof render) : 0 !== render.length && 2 !== render.length && console.error("forwardRef render functions accept exactly two parameters: props and ref. %s", 1 === render.length ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
			null != render && null != render.defaultProps && console.error("forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?");
			var elementType = {
				$$typeof: REACT_FORWARD_REF_TYPE$1,
				render
			}, ownName;
			Object.defineProperty(elementType, "displayName", {
				enumerable: !1,
				configurable: !0,
				get: function() {
					return ownName;
				},
				set: function(name) {
					ownName = name;
					render.name || render.displayName || (Object.defineProperty(render, "name", { value: name }), render.displayName = name);
				}
			});
			return elementType;
		};
		exports.isValidElement = isValidElement$1;
		exports.lazy = function(ctor) {
			return {
				$$typeof: REACT_LAZY_TYPE$1,
				_payload: {
					_status: -1,
					_result: ctor
				},
				_init: lazyInitializer$1
			};
		};
		exports.memo = function(type, compare) {
			type ?? console.error("memo: The first argument must be a component. Instead received: %s", null === type ? "null" : typeof type);
			compare = {
				$$typeof: REACT_MEMO_TYPE$1,
				type,
				compare: void 0 === compare ? null : compare
			};
			var ownName;
			Object.defineProperty(compare, "displayName", {
				enumerable: !1,
				configurable: !0,
				get: function() {
					return ownName;
				},
				set: function(name) {
					ownName = name;
					type.name || type.displayName || (Object.defineProperty(type, "name", { value: name }), type.displayName = name);
				}
			});
			return compare;
		};
		exports.startTransition = function(scope) {
			var prevTransition = ReactSharedInternals$1.T, currentTransition = {};
			ReactSharedInternals$1.T = currentTransition;
			currentTransition._updatedFibers = /* @__PURE__ */ new Set();
			try {
				var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals$1.S;
				null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
				"object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop$2, reportGlobalError$1);
			} catch (error) {
				reportGlobalError$1(error);
			} finally {
				null === prevTransition && currentTransition._updatedFibers && (scope = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < scope && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.")), ReactSharedInternals$1.T = prevTransition;
			}
		};
		exports.unstable_useCacheRefresh = function() {
			return resolveDispatcher().useCacheRefresh();
		};
		exports.use = function(usable) {
			return resolveDispatcher().use(usable);
		};
		exports.useActionState = function(action, initialState, permalink) {
			return resolveDispatcher().useActionState(action, initialState, permalink);
		};
		exports.useCallback = function(callback, deps) {
			return resolveDispatcher().useCallback(callback, deps);
		};
		exports.useContext = function(Context) {
			var dispatcher = resolveDispatcher();
			Context.$$typeof === REACT_CONSUMER_TYPE$1 && console.error("Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?");
			return dispatcher.useContext(Context);
		};
		exports.useDebugValue = function(value, formatterFn) {
			return resolveDispatcher().useDebugValue(value, formatterFn);
		};
		exports.useDeferredValue = function(value, initialValue) {
			return resolveDispatcher().useDeferredValue(value, initialValue);
		};
		exports.useEffect = function(create, createDeps, update) {
			create ?? console.warn("React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?");
			var dispatcher = resolveDispatcher();
			if ("function" === typeof update) throw Error("useEffect CRUD overload is not enabled in this build of React.");
			return dispatcher.useEffect(create, createDeps);
		};
		exports.useId = function() {
			return resolveDispatcher().useId();
		};
		exports.useImperativeHandle = function(ref, create, deps) {
			return resolveDispatcher().useImperativeHandle(ref, create, deps);
		};
		exports.useInsertionEffect = function(create, deps) {
			create ?? console.warn("React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?");
			return resolveDispatcher().useInsertionEffect(create, deps);
		};
		exports.useLayoutEffect = function(create, deps) {
			create ?? console.warn("React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?");
			return resolveDispatcher().useLayoutEffect(create, deps);
		};
		exports.useMemo = function(create, deps) {
			return resolveDispatcher().useMemo(create, deps);
		};
		exports.useOptimistic = function(passthrough, reducer) {
			return resolveDispatcher().useOptimistic(passthrough, reducer);
		};
		exports.useReducer = function(reducer, initialArg, init) {
			return resolveDispatcher().useReducer(reducer, initialArg, init);
		};
		exports.useRef = function(initialValue) {
			return resolveDispatcher().useRef(initialValue);
		};
		exports.useState = function(initialState) {
			return resolveDispatcher().useState(initialState);
		};
		exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
			return resolveDispatcher().useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
		};
		exports.useTransition = function() {
			return resolveDispatcher().useTransition();
		};
		exports.version = "19.1.0";
		"undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	}();
} });

//#endregion
//#region ../../node_modules/.pnpm/react@19.1.0/node_modules/react/index.js
var require_react = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/react@19.1.0/node_modules/react/index.js"(exports, module) {
	if (process.env.NODE_ENV === "production") module.exports = require_react_production();
	else module.exports = require_react_development();
} });

//#endregion
//#region ../../node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/cjs/_interop_require_default.cjs
var require__interop_require_default = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/cjs/_interop_require_default.cjs"(exports) {
	function _interop_require_default$2(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	exports._ = _interop_require_default$2;
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js
var require_app_router_context_shared_runtime = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$18(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$18(exports, {
		AppRouterContext: function() {
			return AppRouterContext;
		},
		GlobalLayoutRouterContext: function() {
			return GlobalLayoutRouterContext;
		},
		LayoutRouterContext: function() {
			return LayoutRouterContext;
		},
		MissingSlotContext: function() {
			return MissingSlotContext;
		},
		TemplateContext: function() {
			return TemplateContext;
		}
	});
	const _interop_require_default$1 = require__interop_require_default();
	const _react$4 = /* @__PURE__ */ _interop_require_default$1._(require_react());
	const AppRouterContext = _react$4.default.createContext(null);
	const LayoutRouterContext = _react$4.default.createContext(null);
	const GlobalLayoutRouterContext = _react$4.default.createContext(null);
	const TemplateContext = _react$4.default.createContext(null);
	if (process.env.NODE_ENV !== "production") {
		AppRouterContext.displayName = "AppRouterContext";
		LayoutRouterContext.displayName = "LayoutRouterContext";
		GlobalLayoutRouterContext.displayName = "GlobalLayoutRouterContext";
		TemplateContext.displayName = "TemplateContext";
	}
	const MissingSlotContext = _react$4.default.createContext(/* @__PURE__ */ new Set());
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/shared/lib/hooks-client-context.shared-runtime.js
var require_hooks_client_context_shared_runtime = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/shared/lib/hooks-client-context.shared-runtime.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$17(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$17(exports, {
		PathParamsContext: function() {
			return PathParamsContext;
		},
		PathnameContext: function() {
			return PathnameContext;
		},
		SearchParamsContext: function() {
			return SearchParamsContext;
		}
	});
	const _react$3 = require_react();
	const SearchParamsContext = (0, _react$3.createContext)(null);
	const PathnameContext = (0, _react$3.createContext)(null);
	const PathParamsContext = (0, _react$3.createContext)(null);
	if (process.env.NODE_ENV !== "production") {
		SearchParamsContext.displayName = "SearchParamsContext";
		PathnameContext.displayName = "PathnameContext";
		PathParamsContext.displayName = "PathParamsContext";
	}
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/router-reducer/reducers/get-segment-value.js
var require_get_segment_value = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/router-reducer/reducers/get-segment-value.js"(exports, module) {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "getSegmentValue", {
		enumerable: true,
		get: function() {
			return getSegmentValue;
		}
	});
	function getSegmentValue(segment) {
		return Array.isArray(segment) ? segment[1] : segment;
	}
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/shared/lib/segment.js
var require_segment = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/shared/lib/segment.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$16(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$16(exports, {
		DEFAULT_SEGMENT_KEY: function() {
			return DEFAULT_SEGMENT_KEY;
		},
		PAGE_SEGMENT_KEY: function() {
			return PAGE_SEGMENT_KEY;
		},
		addSearchParamsIfPageSegment: function() {
			return addSearchParamsIfPageSegment;
		},
		isGroupSegment: function() {
			return isGroupSegment;
		},
		isParallelRouteSegment: function() {
			return isParallelRouteSegment;
		}
	});
	function isGroupSegment(segment) {
		return segment[0] === "(" && segment.endsWith(")");
	}
	function isParallelRouteSegment(segment) {
		return segment.startsWith("@") && segment !== "@children";
	}
	function addSearchParamsIfPageSegment(segment, searchParams) {
		const isPageSegment = segment.includes(PAGE_SEGMENT_KEY);
		if (isPageSegment) {
			const stringifiedQuery = JSON.stringify(searchParams);
			return stringifiedQuery !== "{}" ? PAGE_SEGMENT_KEY + "?" + stringifiedQuery : PAGE_SEGMENT_KEY;
		}
		return segment;
	}
	const PAGE_SEGMENT_KEY = "__PAGE__";
	const DEFAULT_SEGMENT_KEY = "__DEFAULT__";
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/redirect-status-code.js
var require_redirect_status_code = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/redirect-status-code.js"(exports, module) {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "RedirectStatusCode", {
		enumerable: true,
		get: function() {
			return RedirectStatusCode;
		}
	});
	var RedirectStatusCode = /* @__PURE__ */ function(RedirectStatusCode$1) {
		RedirectStatusCode$1[RedirectStatusCode$1["SeeOther"] = 303] = "SeeOther";
		RedirectStatusCode$1[RedirectStatusCode$1["TemporaryRedirect"] = 307] = "TemporaryRedirect";
		RedirectStatusCode$1[RedirectStatusCode$1["PermanentRedirect"] = 308] = "PermanentRedirect";
		return RedirectStatusCode$1;
	}({});
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/redirect-error.js
var require_redirect_error = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/redirect-error.js"(exports, module) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$15(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$15(exports, {
		REDIRECT_ERROR_CODE: function() {
			return REDIRECT_ERROR_CODE$1;
		},
		RedirectType: function() {
			return RedirectType;
		},
		isRedirectError: function() {
			return isRedirectError$1;
		}
	});
	const _redirectstatuscode$1 = require_redirect_status_code();
	const REDIRECT_ERROR_CODE$1 = "NEXT_REDIRECT";
	var RedirectType = /* @__PURE__ */ function(RedirectType$1) {
		RedirectType$1["push"] = "push";
		RedirectType$1["replace"] = "replace";
		return RedirectType$1;
	}({});
	function isRedirectError$1(error) {
		if (typeof error !== "object" || error === null || !("digest" in error) || typeof error.digest !== "string") return false;
		const digest = error.digest.split(";");
		const [errorCode, type] = digest;
		const destination = digest.slice(2, -2).join(";");
		const status = digest.at(-2);
		const statusCode = Number(status);
		return errorCode === REDIRECT_ERROR_CODE$1 && (type === "replace" || type === "push") && typeof destination === "string" && !isNaN(statusCode) && statusCode in _redirectstatuscode$1.RedirectStatusCode;
	}
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/app-render/async-local-storage.js
var require_async_local_storage = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/app-render/async-local-storage.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$14(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$14(exports, {
		bindSnapshot: function() {
			return bindSnapshot;
		},
		createAsyncLocalStorage: function() {
			return createAsyncLocalStorage;
		},
		createSnapshot: function() {
			return createSnapshot;
		}
	});
	const sharedAsyncLocalStorageNotAvailableError = Object.defineProperty(new Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", {
		value: "E504",
		enumerable: false,
		configurable: true
	});
	var FakeAsyncLocalStorage = class {
		disable() {
			throw sharedAsyncLocalStorageNotAvailableError;
		}
		getStore() {
			return void 0;
		}
		run() {
			throw sharedAsyncLocalStorageNotAvailableError;
		}
		exit() {
			throw sharedAsyncLocalStorageNotAvailableError;
		}
		enterWith() {
			throw sharedAsyncLocalStorageNotAvailableError;
		}
		static bind(fn) {
			return fn;
		}
	};
	const maybeGlobalAsyncLocalStorage = typeof globalThis !== "undefined" && globalThis.AsyncLocalStorage;
	function createAsyncLocalStorage() {
		if (maybeGlobalAsyncLocalStorage) return new maybeGlobalAsyncLocalStorage();
		return new FakeAsyncLocalStorage();
	}
	function bindSnapshot(fn) {
		if (maybeGlobalAsyncLocalStorage) return maybeGlobalAsyncLocalStorage.bind(fn);
		return FakeAsyncLocalStorage.bind(fn);
	}
	function createSnapshot() {
		if (maybeGlobalAsyncLocalStorage) return maybeGlobalAsyncLocalStorage.snapshot();
		return function(fn, ...args) {
			return fn(...args);
		};
	}
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/app-render/action-async-storage-instance.js
var require_action_async_storage_instance = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/app-render/action-async-storage-instance.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "actionAsyncStorageInstance", {
		enumerable: true,
		get: function() {
			return actionAsyncStorageInstance;
		}
	});
	const _asynclocalstorage$2 = require_async_local_storage();
	const actionAsyncStorageInstance = (0, _asynclocalstorage$2.createAsyncLocalStorage)();
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/app-render/action-async-storage.external.js
var require_action_async_storage_external = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/app-render/action-async-storage.external.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "actionAsyncStorage", {
		enumerable: true,
		get: function() {
			return _actionasyncstorageinstance.actionAsyncStorageInstance;
		}
	});
	const _actionasyncstorageinstance = require_action_async_storage_instance();
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/redirect.js
var require_redirect = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/redirect.js"(exports, module) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$13(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$13(exports, {
		getRedirectError: function() {
			return getRedirectError;
		},
		getRedirectStatusCodeFromError: function() {
			return getRedirectStatusCodeFromError;
		},
		getRedirectTypeFromError: function() {
			return getRedirectTypeFromError;
		},
		getURLFromRedirectError: function() {
			return getURLFromRedirectError;
		},
		permanentRedirect: function() {
			return permanentRedirect;
		},
		redirect: function() {
			return redirect$1;
		}
	});
	const _redirectstatuscode = require_redirect_status_code();
	const _redirecterror$2 = require_redirect_error();
	const actionAsyncStorage = typeof window === "undefined" ? require_action_async_storage_external().actionAsyncStorage : void 0;
	function getRedirectError(url, type, statusCode) {
		if (statusCode === void 0) statusCode = _redirectstatuscode.RedirectStatusCode.TemporaryRedirect;
		const error = Object.defineProperty(new Error(_redirecterror$2.REDIRECT_ERROR_CODE), "__NEXT_ERROR_CODE", {
			value: "E394",
			enumerable: false,
			configurable: true
		});
		error.digest = _redirecterror$2.REDIRECT_ERROR_CODE + ";" + type + ";" + url + ";" + statusCode + ";";
		return error;
	}
	function redirect$1(url, type) {
		var _actionAsyncStorage_getStore;
		type != null || (type = (actionAsyncStorage == null ? void 0 : (_actionAsyncStorage_getStore = actionAsyncStorage.getStore()) == null ? void 0 : _actionAsyncStorage_getStore.isAction) ? _redirecterror$2.RedirectType.push : _redirecterror$2.RedirectType.replace);
		throw getRedirectError(url, type, _redirectstatuscode.RedirectStatusCode.TemporaryRedirect);
	}
	function permanentRedirect(url, type) {
		if (type === void 0) type = _redirecterror$2.RedirectType.replace;
		throw getRedirectError(url, type, _redirectstatuscode.RedirectStatusCode.PermanentRedirect);
	}
	function getURLFromRedirectError(error) {
		if (!(0, _redirecterror$2.isRedirectError)(error)) return null;
		return error.digest.split(";").slice(2, -2).join(";");
	}
	function getRedirectTypeFromError(error) {
		if (!(0, _redirecterror$2.isRedirectError)(error)) throw Object.defineProperty(new Error("Not a redirect error"), "__NEXT_ERROR_CODE", {
			value: "E260",
			enumerable: false,
			configurable: true
		});
		return error.digest.split(";", 2)[1];
	}
	function getRedirectStatusCodeFromError(error) {
		if (!(0, _redirecterror$2.isRedirectError)(error)) throw Object.defineProperty(new Error("Not a redirect error"), "__NEXT_ERROR_CODE", {
			value: "E260",
			enumerable: false,
			configurable: true
		});
		return Number(error.digest.split(";").at(-2));
	}
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js
var require_http_access_fallback = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js"(exports, module) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$12(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$12(exports, {
		HTTPAccessErrorStatus: function() {
			return HTTPAccessErrorStatus;
		},
		HTTP_ERROR_FALLBACK_ERROR_CODE: function() {
			return HTTP_ERROR_FALLBACK_ERROR_CODE;
		},
		getAccessFallbackErrorTypeByStatus: function() {
			return getAccessFallbackErrorTypeByStatus;
		},
		getAccessFallbackHTTPStatus: function() {
			return getAccessFallbackHTTPStatus;
		},
		isHTTPAccessFallbackError: function() {
			return isHTTPAccessFallbackError;
		}
	});
	const HTTPAccessErrorStatus = {
		NOT_FOUND: 404,
		FORBIDDEN: 403,
		UNAUTHORIZED: 401
	};
	const ALLOWED_CODES = new Set(Object.values(HTTPAccessErrorStatus));
	const HTTP_ERROR_FALLBACK_ERROR_CODE = "NEXT_HTTP_ERROR_FALLBACK";
	function isHTTPAccessFallbackError(error) {
		if (typeof error !== "object" || error === null || !("digest" in error) || typeof error.digest !== "string") return false;
		const [prefix, httpStatus] = error.digest.split(";");
		return prefix === HTTP_ERROR_FALLBACK_ERROR_CODE && ALLOWED_CODES.has(Number(httpStatus));
	}
	function getAccessFallbackHTTPStatus(error) {
		const httpStatus = error.digest.split(";")[1];
		return Number(httpStatus);
	}
	function getAccessFallbackErrorTypeByStatus(status) {
		switch (status) {
			case 401: return "unauthorized";
			case 403: return "forbidden";
			case 404: return "not-found";
			default: return;
		}
	}
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/not-found.js
var require_not_found = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/not-found.js"(exports, module) {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "notFound", {
		enumerable: true,
		get: function() {
			return notFound$1;
		}
	});
	const _httpaccessfallback$3 = require_http_access_fallback();
	/**
	* This function allows you to render the [not-found.js file](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)
	* within a route segment as well as inject a tag.
	*
	* `notFound()` can be used in
	* [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
	* [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
	* [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
	*
	* - In a Server Component, this will insert a `<meta name="robots" content="noindex" />` meta tag and set the status code to 404.
	* - In a Route Handler or Server Action, it will serve a 404 to the caller.
	*
	* Read more: [Next.js Docs: `notFound`](https://nextjs.org/docs/app/api-reference/functions/not-found)
	*/ const DIGEST$2 = "" + _httpaccessfallback$3.HTTP_ERROR_FALLBACK_ERROR_CODE + ";404";
	function notFound$1() {
		const error = Object.defineProperty(new Error(DIGEST$2), "__NEXT_ERROR_CODE", {
			value: "E394",
			enumerable: false,
			configurable: true
		});
		error.digest = DIGEST$2;
		throw error;
	}
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/forbidden.js
var require_forbidden = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/forbidden.js"(exports, module) {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "forbidden", {
		enumerable: true,
		get: function() {
			return forbidden;
		}
	});
	const _httpaccessfallback$2 = require_http_access_fallback();
	/**
	* @experimental
	* This function allows you to render the [forbidden.js file](https://nextjs.org/docs/app/api-reference/file-conventions/forbidden)
	* within a route segment as well as inject a tag.
	*
	* `forbidden()` can be used in
	* [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
	* [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
	* [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
	*
	* Read more: [Next.js Docs: `forbidden`](https://nextjs.org/docs/app/api-reference/functions/forbidden)
	*/ const DIGEST$1 = "" + _httpaccessfallback$2.HTTP_ERROR_FALLBACK_ERROR_CODE + ";403";
	function forbidden() {
		if (!process.env.__NEXT_EXPERIMENTAL_AUTH_INTERRUPTS) throw Object.defineProperty(new Error("`forbidden()` is experimental and only allowed to be enabled when `experimental.authInterrupts` is enabled."), "__NEXT_ERROR_CODE", {
			value: "E488",
			enumerable: false,
			configurable: true
		});
		const error = Object.defineProperty(new Error(DIGEST$1), "__NEXT_ERROR_CODE", {
			value: "E394",
			enumerable: false,
			configurable: true
		});
		error.digest = DIGEST$1;
		throw error;
	}
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/unauthorized.js
var require_unauthorized = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/unauthorized.js"(exports, module) {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "unauthorized", {
		enumerable: true,
		get: function() {
			return unauthorized;
		}
	});
	const _httpaccessfallback$1 = require_http_access_fallback();
	/**
	* @experimental
	* This function allows you to render the [unauthorized.js file](https://nextjs.org/docs/app/api-reference/file-conventions/unauthorized)
	* within a route segment as well as inject a tag.
	*
	* `unauthorized()` can be used in
	* [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
	* [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
	* [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
	*
	*
	* Read more: [Next.js Docs: `unauthorized`](https://nextjs.org/docs/app/api-reference/functions/unauthorized)
	*/ const DIGEST = "" + _httpaccessfallback$1.HTTP_ERROR_FALLBACK_ERROR_CODE + ";401";
	function unauthorized() {
		if (!process.env.__NEXT_EXPERIMENTAL_AUTH_INTERRUPTS) throw Object.defineProperty(new Error("`unauthorized()` is experimental and only allowed to be used when `experimental.authInterrupts` is enabled."), "__NEXT_ERROR_CODE", {
			value: "E411",
			enumerable: false,
			configurable: true
		});
		const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
			value: "E394",
			enumerable: false,
			configurable: true
		});
		error.digest = DIGEST;
		throw error;
	}
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/dynamic-rendering-utils.js
var require_dynamic_rendering_utils = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/dynamic-rendering-utils.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$11(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$11(exports, {
		isHangingPromiseRejectionError: function() {
			return isHangingPromiseRejectionError;
		},
		makeHangingPromise: function() {
			return makeHangingPromise;
		}
	});
	function isHangingPromiseRejectionError(err) {
		if (typeof err !== "object" || err === null || !("digest" in err)) return false;
		return err.digest === HANGING_PROMISE_REJECTION;
	}
	const HANGING_PROMISE_REJECTION = "HANGING_PROMISE_REJECTION";
	var HangingPromiseRejectionError = class extends Error {
		constructor(expression) {
			super(`During prerendering, ${expression} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${expression} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context.`), this.expression = expression, this.digest = HANGING_PROMISE_REJECTION;
		}
	};
	const abortListenersBySignal = /* @__PURE__ */ new WeakMap();
	function makeHangingPromise(signal, expression) {
		if (signal.aborted) return Promise.reject(new HangingPromiseRejectionError(expression));
		else {
			const hangingPromise = new Promise((_, reject) => {
				const boundRejection = reject.bind(null, new HangingPromiseRejectionError(expression));
				let currentListeners = abortListenersBySignal.get(signal);
				if (currentListeners) currentListeners.push(boundRejection);
				else {
					const listeners = [boundRejection];
					abortListenersBySignal.set(signal, listeners);
					signal.addEventListener("abort", () => {
						for (let i = 0; i < listeners.length; i++) listeners[i]();
					}, { once: true });
				}
			});
			hangingPromise.catch(ignoreReject);
			return hangingPromise;
		}
	}
	function ignoreReject() {}
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/lib/router-utils/is-postpone.js
var require_is_postpone = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/lib/router-utils/is-postpone.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "isPostpone", {
		enumerable: true,
		get: function() {
			return isPostpone;
		}
	});
	const REACT_POSTPONE_TYPE = Symbol.for("react.postpone");
	function isPostpone(error) {
		return typeof error === "object" && error !== null && error.$$typeof === REACT_POSTPONE_TYPE;
	}
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js
var require_bailout_to_csr = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$10(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$10(exports, {
		BailoutToCSRError: function() {
			return BailoutToCSRError;
		},
		isBailoutToCSRError: function() {
			return isBailoutToCSRError;
		}
	});
	const BAILOUT_TO_CSR = "BAILOUT_TO_CLIENT_SIDE_RENDERING";
	var BailoutToCSRError = class extends Error {
		constructor(reason) {
			super("Bail out to client-side rendering: " + reason), this.reason = reason, this.digest = BAILOUT_TO_CSR;
		}
	};
	function isBailoutToCSRError(err) {
		if (typeof err !== "object" || err === null || !("digest" in err)) return false;
		return err.digest === BAILOUT_TO_CSR;
	}
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/is-next-router-error.js
var require_is_next_router_error = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/is-next-router-error.js"(exports, module) {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "isNextRouterError", {
		enumerable: true,
		get: function() {
			return isNextRouterError;
		}
	});
	const _httpaccessfallback = require_http_access_fallback();
	const _redirecterror$1 = require_redirect_error();
	function isNextRouterError(error) {
		return (0, _redirecterror$1.isRedirectError)(error) || (0, _httpaccessfallback.isHTTPAccessFallbackError)(error);
	}
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/hooks-server-context.js
var require_hooks_server_context = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/hooks-server-context.js"(exports, module) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$9(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$9(exports, {
		DynamicServerError: function() {
			return DynamicServerError;
		},
		isDynamicServerError: function() {
			return isDynamicServerError;
		}
	});
	const DYNAMIC_ERROR_CODE = "DYNAMIC_SERVER_USAGE";
	var DynamicServerError = class extends Error {
		constructor(description) {
			super("Dynamic server usage: " + description), this.description = description, this.digest = DYNAMIC_ERROR_CODE;
		}
	};
	function isDynamicServerError(err) {
		if (typeof err !== "object" || err === null || !("digest" in err) || typeof err.digest !== "string") return false;
		return err.digest === DYNAMIC_ERROR_CODE;
	}
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/static-generation-bailout.js
var require_static_generation_bailout = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/static-generation-bailout.js"(exports, module) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$8(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$8(exports, {
		StaticGenBailoutError: function() {
			return StaticGenBailoutError;
		},
		isStaticGenBailoutError: function() {
			return isStaticGenBailoutError;
		}
	});
	const NEXT_STATIC_GEN_BAILOUT = "NEXT_STATIC_GEN_BAILOUT";
	var StaticGenBailoutError = class extends Error {
		constructor(...args) {
			super(...args), this.code = NEXT_STATIC_GEN_BAILOUT;
		}
	};
	function isStaticGenBailoutError(error) {
		if (typeof error !== "object" || error === null || !("code" in error)) return false;
		return error.code === NEXT_STATIC_GEN_BAILOUT;
	}
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/app-render/work-unit-async-storage-instance.js
var require_work_unit_async_storage_instance = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/app-render/work-unit-async-storage-instance.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "workUnitAsyncStorageInstance", {
		enumerable: true,
		get: function() {
			return workUnitAsyncStorageInstance;
		}
	});
	const _asynclocalstorage$1 = require_async_local_storage();
	const workUnitAsyncStorageInstance = (0, _asynclocalstorage$1.createAsyncLocalStorage)();
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/app-router-headers.js
var require_app_router_headers = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/app-router-headers.js"(exports, module) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$7(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$7(exports, {
		ACTION_HEADER: function() {
			return ACTION_HEADER;
		},
		FLIGHT_HEADERS: function() {
			return FLIGHT_HEADERS;
		},
		NEXT_ACTION_NOT_FOUND_HEADER: function() {
			return NEXT_ACTION_NOT_FOUND_HEADER;
		},
		NEXT_DID_POSTPONE_HEADER: function() {
			return NEXT_DID_POSTPONE_HEADER;
		},
		NEXT_HMR_REFRESH_HASH_COOKIE: function() {
			return NEXT_HMR_REFRESH_HASH_COOKIE;
		},
		NEXT_HMR_REFRESH_HEADER: function() {
			return NEXT_HMR_REFRESH_HEADER;
		},
		NEXT_IS_PRERENDER_HEADER: function() {
			return NEXT_IS_PRERENDER_HEADER;
		},
		NEXT_REWRITTEN_PATH_HEADER: function() {
			return NEXT_REWRITTEN_PATH_HEADER;
		},
		NEXT_REWRITTEN_QUERY_HEADER: function() {
			return NEXT_REWRITTEN_QUERY_HEADER;
		},
		NEXT_ROUTER_PREFETCH_HEADER: function() {
			return NEXT_ROUTER_PREFETCH_HEADER;
		},
		NEXT_ROUTER_SEGMENT_PREFETCH_HEADER: function() {
			return NEXT_ROUTER_SEGMENT_PREFETCH_HEADER;
		},
		NEXT_ROUTER_STALE_TIME_HEADER: function() {
			return NEXT_ROUTER_STALE_TIME_HEADER;
		},
		NEXT_ROUTER_STATE_TREE_HEADER: function() {
			return NEXT_ROUTER_STATE_TREE_HEADER;
		},
		NEXT_RSC_UNION_QUERY: function() {
			return NEXT_RSC_UNION_QUERY;
		},
		NEXT_URL: function() {
			return NEXT_URL;
		},
		RSC_CONTENT_TYPE_HEADER: function() {
			return RSC_CONTENT_TYPE_HEADER;
		},
		RSC_HEADER: function() {
			return RSC_HEADER;
		}
	});
	const RSC_HEADER = "RSC";
	const ACTION_HEADER = "Next-Action";
	const NEXT_ROUTER_STATE_TREE_HEADER = "Next-Router-State-Tree";
	const NEXT_ROUTER_PREFETCH_HEADER = "Next-Router-Prefetch";
	const NEXT_ROUTER_SEGMENT_PREFETCH_HEADER = "Next-Router-Segment-Prefetch";
	const NEXT_HMR_REFRESH_HEADER = "Next-HMR-Refresh";
	const NEXT_HMR_REFRESH_HASH_COOKIE = "__next_hmr_refresh_hash__";
	const NEXT_URL = "Next-Url";
	const RSC_CONTENT_TYPE_HEADER = "text/x-component";
	const FLIGHT_HEADERS = [
		RSC_HEADER,
		NEXT_ROUTER_STATE_TREE_HEADER,
		NEXT_ROUTER_PREFETCH_HEADER,
		NEXT_HMR_REFRESH_HEADER,
		NEXT_ROUTER_SEGMENT_PREFETCH_HEADER
	];
	const NEXT_RSC_UNION_QUERY = "_rsc";
	const NEXT_ROUTER_STALE_TIME_HEADER = "x-nextjs-stale-time";
	const NEXT_DID_POSTPONE_HEADER = "x-nextjs-postponed";
	const NEXT_REWRITTEN_PATH_HEADER = "x-nextjs-rewritten-path";
	const NEXT_REWRITTEN_QUERY_HEADER = "x-nextjs-rewritten-query";
	const NEXT_IS_PRERENDER_HEADER = "x-nextjs-prerender";
	const NEXT_ACTION_NOT_FOUND_HEADER = "x-nextjs-action-not-found";
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/app-render/work-unit-async-storage.external.js
var require_work_unit_async_storage_external = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/app-render/work-unit-async-storage.external.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$6(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$6(exports, {
		getDraftModeProviderForCacheScope: function() {
			return getDraftModeProviderForCacheScope;
		},
		getExpectedRequestStore: function() {
			return getExpectedRequestStore;
		},
		getHmrRefreshHash: function() {
			return getHmrRefreshHash;
		},
		getPrerenderResumeDataCache: function() {
			return getPrerenderResumeDataCache;
		},
		getRenderResumeDataCache: function() {
			return getRenderResumeDataCache;
		},
		throwForMissingRequestStore: function() {
			return throwForMissingRequestStore;
		},
		workUnitAsyncStorage: function() {
			return _workunitasyncstorageinstance.workUnitAsyncStorageInstance;
		}
	});
	const _workunitasyncstorageinstance = require_work_unit_async_storage_instance();
	const _approuterheaders = require_app_router_headers();
	function getExpectedRequestStore(callingExpression) {
		const workUnitStore = _workunitasyncstorageinstance.workUnitAsyncStorageInstance.getStore();
		if (!workUnitStore) throwForMissingRequestStore(callingExpression);
		switch (workUnitStore.type) {
			case "request": return workUnitStore;
			case "prerender":
			case "prerender-client":
			case "prerender-ppr":
			case "prerender-legacy": throw Object.defineProperty(new Error(`\`${callingExpression}\` cannot be called inside a prerender. This is a bug in Next.js.`), "__NEXT_ERROR_CODE", {
				value: "E401",
				enumerable: false,
				configurable: true
			});
			case "cache": throw Object.defineProperty(new Error(`\`${callingExpression}\` cannot be called inside "use cache". Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
				value: "E37",
				enumerable: false,
				configurable: true
			});
			case "unstable-cache": throw Object.defineProperty(new Error(`\`${callingExpression}\` cannot be called inside unstable_cache. Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
				value: "E69",
				enumerable: false,
				configurable: true
			});
			default:
				const _exhaustiveCheck = workUnitStore;
				return _exhaustiveCheck;
		}
	}
	function throwForMissingRequestStore(callingExpression) {
		throw Object.defineProperty(new Error(`\`${callingExpression}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", {
			value: "E251",
			enumerable: false,
			configurable: true
		});
	}
	function getPrerenderResumeDataCache(workUnitStore) {
		if (workUnitStore.type === "prerender" || workUnitStore.type === "prerender-client" || workUnitStore.type === "prerender-ppr") return workUnitStore.prerenderResumeDataCache;
		return null;
	}
	function getRenderResumeDataCache(workUnitStore) {
		switch (workUnitStore.type) {
			case "request": return workUnitStore.renderResumeDataCache;
			case "prerender":
			case "prerender-client": if (workUnitStore.renderResumeDataCache) return workUnitStore.renderResumeDataCache;
			case "prerender-ppr": return workUnitStore.prerenderResumeDataCache;
			default: return null;
		}
	}
	function getHmrRefreshHash(workStore, workUnitStore) {
		var _workUnitStore_cookies_get;
		if (!workStore.dev) return void 0;
		return workUnitStore.type === "cache" || workUnitStore.type === "prerender" ? workUnitStore.hmrRefreshHash : workUnitStore.type === "request" ? (_workUnitStore_cookies_get = workUnitStore.cookies.get(_approuterheaders.NEXT_HMR_REFRESH_HASH_COOKIE)) == null ? void 0 : _workUnitStore_cookies_get.value : void 0;
	}
	function getDraftModeProviderForCacheScope(workStore, workUnitStore) {
		if (workStore.isDraftMode) switch (workUnitStore.type) {
			case "cache":
			case "unstable-cache":
			case "request": return workUnitStore.draftMode;
			default: return void 0;
		}
		return void 0;
	}
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/app-render/work-async-storage-instance.js
var require_work_async_storage_instance = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/app-render/work-async-storage-instance.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "workAsyncStorageInstance", {
		enumerable: true,
		get: function() {
			return workAsyncStorageInstance;
		}
	});
	const _asynclocalstorage = require_async_local_storage();
	const workAsyncStorageInstance = (0, _asynclocalstorage.createAsyncLocalStorage)();
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/app-render/work-async-storage.external.js
var require_work_async_storage_external = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/app-render/work-async-storage.external.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "workAsyncStorage", {
		enumerable: true,
		get: function() {
			return _workasyncstorageinstance.workAsyncStorageInstance;
		}
	});
	const _workasyncstorageinstance = require_work_async_storage_instance();
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/lib/metadata/metadata-constants.js
var require_metadata_constants = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/lib/metadata/metadata-constants.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$5(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$5(exports, {
		METADATA_BOUNDARY_NAME: function() {
			return METADATA_BOUNDARY_NAME;
		},
		OUTLET_BOUNDARY_NAME: function() {
			return OUTLET_BOUNDARY_NAME;
		},
		VIEWPORT_BOUNDARY_NAME: function() {
			return VIEWPORT_BOUNDARY_NAME;
		}
	});
	const METADATA_BOUNDARY_NAME = "__next_metadata_boundary__";
	const VIEWPORT_BOUNDARY_NAME = "__next_viewport_boundary__";
	const OUTLET_BOUNDARY_NAME = "__next_outlet_boundary__";
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/lib/scheduler.js
var require_scheduler = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/lib/scheduler.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$4(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$4(exports, {
		atLeastOneTask: function() {
			return atLeastOneTask;
		},
		scheduleImmediate: function() {
			return scheduleImmediate;
		},
		scheduleOnNextTick: function() {
			return scheduleOnNextTick;
		},
		waitAtLeastOneReactRenderTask: function() {
			return waitAtLeastOneReactRenderTask;
		}
	});
	const scheduleOnNextTick = (cb) => {
		Promise.resolve().then(() => {
			if (process.env.NEXT_RUNTIME === "edge") setTimeout(cb, 0);
			else process.nextTick(cb);
		});
	};
	const scheduleImmediate = (cb) => {
		if (process.env.NEXT_RUNTIME === "edge") setTimeout(cb, 0);
		else setImmediate(cb);
	};
	function atLeastOneTask() {
		return new Promise((resolve) => scheduleImmediate(resolve));
	}
	function waitAtLeastOneReactRenderTask() {
		if (process.env.NEXT_RUNTIME === "edge") return new Promise((r) => setTimeout(r, 0));
		else return new Promise((r) => setImmediate(r));
	}
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/app-render/dynamic-rendering.js
var require_dynamic_rendering = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/app-render/dynamic-rendering.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$3(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$3(exports, {
		Postpone: function() {
			return Postpone;
		},
		PreludeState: function() {
			return PreludeState;
		},
		abortAndThrowOnSynchronousRequestDataAccess: function() {
			return abortAndThrowOnSynchronousRequestDataAccess;
		},
		abortOnSynchronousPlatformIOAccess: function() {
			return abortOnSynchronousPlatformIOAccess;
		},
		accessedDynamicData: function() {
			return accessedDynamicData;
		},
		annotateDynamicAccess: function() {
			return annotateDynamicAccess;
		},
		consumeDynamicAccess: function() {
			return consumeDynamicAccess;
		},
		createDynamicTrackingState: function() {
			return createDynamicTrackingState;
		},
		createDynamicValidationState: function() {
			return createDynamicValidationState;
		},
		createHangingInputAbortSignal: function() {
			return createHangingInputAbortSignal;
		},
		createPostponedAbortSignal: function() {
			return createPostponedAbortSignal;
		},
		formatDynamicAPIAccesses: function() {
			return formatDynamicAPIAccesses;
		},
		getFirstDynamicReason: function() {
			return getFirstDynamicReason;
		},
		isDynamicPostpone: function() {
			return isDynamicPostpone;
		},
		isPrerenderInterruptedError: function() {
			return isPrerenderInterruptedError;
		},
		markCurrentScopeAsDynamic: function() {
			return markCurrentScopeAsDynamic;
		},
		postponeWithTracking: function() {
			return postponeWithTracking;
		},
		throwIfDisallowedDynamic: function() {
			return throwIfDisallowedDynamic;
		},
		throwToInterruptStaticGeneration: function() {
			return throwToInterruptStaticGeneration;
		},
		trackAllowedDynamicAccess: function() {
			return trackAllowedDynamicAccess;
		},
		trackDynamicDataInDynamicRender: function() {
			return trackDynamicDataInDynamicRender;
		},
		trackFallbackParamAccessed: function() {
			return trackFallbackParamAccessed;
		},
		trackSynchronousPlatformIOAccessInDev: function() {
			return trackSynchronousPlatformIOAccessInDev;
		},
		trackSynchronousRequestDataAccessInDev: function() {
			return trackSynchronousRequestDataAccessInDev;
		},
		useDynamicRouteParams: function() {
			return useDynamicRouteParams$1;
		}
	});
	const _react$2 = /* @__PURE__ */ _interop_require_default(require_react());
	const _hooksservercontext$1 = require_hooks_server_context();
	const _staticgenerationbailout = require_static_generation_bailout();
	const _workunitasyncstorageexternal$1 = require_work_unit_async_storage_external();
	const _workasyncstorageexternal$1 = require_work_async_storage_external();
	const _dynamicrenderingutils$1 = require_dynamic_rendering_utils();
	const _metadataconstants = require_metadata_constants();
	const _scheduler = require_scheduler();
	function _interop_require_default(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	const hasPostpone = typeof _react$2.default.unstable_postpone === "function";
	function createDynamicTrackingState(isDebugDynamicAccesses) {
		return {
			isDebugDynamicAccesses,
			dynamicAccesses: [],
			syncDynamicErrorWithStack: null
		};
	}
	function createDynamicValidationState() {
		return {
			hasSuspenseAboveBody: false,
			hasDynamicMetadata: false,
			hasDynamicViewport: false,
			hasAllowedDynamic: false,
			dynamicErrors: []
		};
	}
	function getFirstDynamicReason(trackingState) {
		var _trackingState_dynamicAccesses_;
		return (_trackingState_dynamicAccesses_ = trackingState.dynamicAccesses[0]) == null ? void 0 : _trackingState_dynamicAccesses_.expression;
	}
	function markCurrentScopeAsDynamic(store, workUnitStore, expression) {
		if (workUnitStore) {
			if (workUnitStore.type === "cache" || workUnitStore.type === "unstable-cache") return;
		}
		if (store.forceDynamic || store.forceStatic) return;
		if (store.dynamicShouldError) throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${store.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
			value: "E553",
			enumerable: false,
			configurable: true
		});
		if (workUnitStore) {
			if (workUnitStore.type === "prerender-ppr") postponeWithTracking(store.route, expression, workUnitStore.dynamicTracking);
			else if (workUnitStore.type === "prerender-legacy") {
				workUnitStore.revalidate = 0;
				const err = Object.defineProperty(new _hooksservercontext$1.DynamicServerError(`Route ${store.route} couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
					value: "E550",
					enumerable: false,
					configurable: true
				});
				store.dynamicUsageDescription = expression;
				store.dynamicUsageStack = err.stack;
				throw err;
			} else if (process.env.NODE_ENV === "development" && workUnitStore && workUnitStore.type === "request") workUnitStore.usedDynamic = true;
		}
	}
	function trackFallbackParamAccessed(store, expression) {
		const prerenderStore = _workunitasyncstorageexternal$1.workUnitAsyncStorage.getStore();
		if (!prerenderStore || prerenderStore.type !== "prerender-ppr") return;
		postponeWithTracking(store.route, expression, prerenderStore.dynamicTracking);
	}
	function throwToInterruptStaticGeneration(expression, store, prerenderStore) {
		const err = Object.defineProperty(new _hooksservercontext$1.DynamicServerError(`Route ${store.route} couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
			value: "E558",
			enumerable: false,
			configurable: true
		});
		prerenderStore.revalidate = 0;
		store.dynamicUsageDescription = expression;
		store.dynamicUsageStack = err.stack;
		throw err;
	}
	function trackDynamicDataInDynamicRender(_store, workUnitStore) {
		if (workUnitStore) {
			if (workUnitStore.type === "cache" || workUnitStore.type === "unstable-cache") return;
			if (workUnitStore.type === "prerender" || workUnitStore.type === "prerender-client" || workUnitStore.type === "prerender-legacy") workUnitStore.revalidate = 0;
			if (process.env.NODE_ENV === "development" && workUnitStore.type === "request") workUnitStore.usedDynamic = true;
		}
	}
	function abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore) {
		const reason = `Route ${route} needs to bail out of prerendering at this point because it used ${expression}.`;
		const error = createPrerenderInterruptedError(reason);
		prerenderStore.controller.abort(error);
		const dynamicTracking = prerenderStore.dynamicTracking;
		if (dynamicTracking) dynamicTracking.dynamicAccesses.push({
			stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : void 0,
			expression
		});
	}
	function abortOnSynchronousPlatformIOAccess(route, expression, errorWithStack, prerenderStore) {
		const dynamicTracking = prerenderStore.dynamicTracking;
		abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore);
		if (dynamicTracking) {
			if (dynamicTracking.syncDynamicErrorWithStack === null) dynamicTracking.syncDynamicErrorWithStack = errorWithStack;
		}
	}
	function trackSynchronousPlatformIOAccessInDev(requestStore) {
		requestStore.prerenderPhase = false;
	}
	function abortAndThrowOnSynchronousRequestDataAccess(route, expression, errorWithStack, prerenderStore) {
		const prerenderSignal = prerenderStore.controller.signal;
		if (prerenderSignal.aborted === false) {
			abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore);
			const dynamicTracking = prerenderStore.dynamicTracking;
			if (dynamicTracking) {
				if (dynamicTracking.syncDynamicErrorWithStack === null) dynamicTracking.syncDynamicErrorWithStack = errorWithStack;
			}
		}
		throw createPrerenderInterruptedError(`Route ${route} needs to bail out of prerendering at this point because it used ${expression}.`);
	}
	const trackSynchronousRequestDataAccessInDev = trackSynchronousPlatformIOAccessInDev;
	function Postpone({ reason, route }) {
		const prerenderStore = _workunitasyncstorageexternal$1.workUnitAsyncStorage.getStore();
		const dynamicTracking = prerenderStore && prerenderStore.type === "prerender-ppr" ? prerenderStore.dynamicTracking : null;
		postponeWithTracking(route, reason, dynamicTracking);
	}
	function postponeWithTracking(route, expression, dynamicTracking) {
		assertPostpone();
		if (dynamicTracking) dynamicTracking.dynamicAccesses.push({
			stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : void 0,
			expression
		});
		_react$2.default.unstable_postpone(createPostponeReason(route, expression));
	}
	function createPostponeReason(route, expression) {
		return `Route ${route} needs to bail out of prerendering at this point because it used ${expression}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
	}
	function isDynamicPostpone(err) {
		if (typeof err === "object" && err !== null && typeof err.message === "string") return isDynamicPostponeReason(err.message);
		return false;
	}
	function isDynamicPostponeReason(reason) {
		return reason.includes("needs to bail out of prerendering at this point because it used") && reason.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
	}
	if (isDynamicPostponeReason(createPostponeReason("%%%", "^^^")) === false) throw Object.defineProperty(new Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", {
		value: "E296",
		enumerable: false,
		configurable: true
	});
	const NEXT_PRERENDER_INTERRUPTED = "NEXT_PRERENDER_INTERRUPTED";
	function createPrerenderInterruptedError(message) {
		const error = Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
			value: "E394",
			enumerable: false,
			configurable: true
		});
		error.digest = NEXT_PRERENDER_INTERRUPTED;
		return error;
	}
	function isPrerenderInterruptedError(error) {
		return typeof error === "object" && error !== null && error.digest === NEXT_PRERENDER_INTERRUPTED && "name" in error && "message" in error && error instanceof Error;
	}
	function accessedDynamicData(dynamicAccesses) {
		return dynamicAccesses.length > 0;
	}
	function consumeDynamicAccess(serverDynamic, clientDynamic) {
		serverDynamic.dynamicAccesses.push(...clientDynamic.dynamicAccesses);
		return serverDynamic.dynamicAccesses;
	}
	function formatDynamicAPIAccesses(dynamicAccesses) {
		return dynamicAccesses.filter((access) => typeof access.stack === "string" && access.stack.length > 0).map(({ expression, stack }) => {
			stack = stack.split("\n").slice(4).filter((line) => {
				if (line.includes("node_modules/next/")) return false;
				if (line.includes(" (<anonymous>)")) return false;
				if (line.includes(" (node:")) return false;
				return true;
			}).join("\n");
			return `Dynamic API Usage Debug - ${expression}:\n${stack}`;
		});
	}
	function assertPostpone() {
		if (!hasPostpone) throw Object.defineProperty(new Error(`Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js`), "__NEXT_ERROR_CODE", {
			value: "E224",
			enumerable: false,
			configurable: true
		});
	}
	function createPostponedAbortSignal(reason) {
		assertPostpone();
		const controller = new AbortController();
		try {
			_react$2.default.unstable_postpone(reason);
		} catch (x) {
			controller.abort(x);
		}
		return controller.signal;
	}
	function createHangingInputAbortSignal(workUnitStore) {
		const controller = new AbortController();
		if (workUnitStore.cacheSignal) workUnitStore.cacheSignal.inputReady().then(() => {
			controller.abort();
		});
		else (0, _scheduler.scheduleOnNextTick)(() => controller.abort());
		return controller.signal;
	}
	function annotateDynamicAccess(expression, prerenderStore) {
		const dynamicTracking = prerenderStore.dynamicTracking;
		if (dynamicTracking) dynamicTracking.dynamicAccesses.push({
			stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : void 0,
			expression
		});
	}
	function useDynamicRouteParams$1(expression) {
		const workStore = _workasyncstorageexternal$1.workAsyncStorage.getStore();
		if (workStore && workStore.isStaticGeneration && workStore.fallbackRouteParams && workStore.fallbackRouteParams.size > 0) {
			const workUnitStore = _workunitasyncstorageexternal$1.workUnitAsyncStorage.getStore();
			if (workUnitStore) {
				if (workUnitStore.type === "prerender-client") _react$2.default.use((0, _dynamicrenderingutils$1.makeHangingPromise)(workUnitStore.renderSignal, expression));
				else if (workUnitStore.type === "prerender-ppr") postponeWithTracking(workStore.route, expression, workUnitStore.dynamicTracking);
				else if (workUnitStore.type === "prerender-legacy") throwToInterruptStaticGeneration(expression, workStore, workUnitStore);
			}
		}
	}
	const hasSuspenseRegex = /\n\s+at Suspense \(<anonymous>\)/;
	const hasSuspenseAfterBodyOrHtmlRegex = /\n\s+at (?:body|html) \(<anonymous>\)[\s\S]*?\n\s+at Suspense \(<anonymous>\)/;
	const hasMetadataRegex = new RegExp(`\\n\\s+at ${_metadataconstants.METADATA_BOUNDARY_NAME}[\\n\\s]`);
	const hasViewportRegex = new RegExp(`\\n\\s+at ${_metadataconstants.VIEWPORT_BOUNDARY_NAME}[\\n\\s]`);
	const hasOutletRegex = new RegExp(`\\n\\s+at ${_metadataconstants.OUTLET_BOUNDARY_NAME}[\\n\\s]`);
	function trackAllowedDynamicAccess(workStore, componentStack, dynamicValidation, clientDynamic) {
		if (hasOutletRegex.test(componentStack)) return;
		else if (hasMetadataRegex.test(componentStack)) {
			dynamicValidation.hasDynamicMetadata = true;
			return;
		} else if (hasViewportRegex.test(componentStack)) {
			dynamicValidation.hasDynamicViewport = true;
			return;
		} else if (hasSuspenseAfterBodyOrHtmlRegex.test(componentStack)) {
			dynamicValidation.hasAllowedDynamic = true;
			dynamicValidation.hasSuspenseAboveBody = true;
			return;
		} else if (hasSuspenseRegex.test(componentStack)) {
			dynamicValidation.hasAllowedDynamic = true;
			return;
		} else if (clientDynamic.syncDynamicErrorWithStack) {
			dynamicValidation.dynamicErrors.push(clientDynamic.syncDynamicErrorWithStack);
			return;
		} else {
			const message = `Route "${workStore.route}": A component accessed data, headers, params, searchParams, or a short-lived cache without a Suspense boundary nor a "use cache" above it. See more info: https://nextjs.org/docs/messages/next-prerender-missing-suspense`;
			const error = createErrorWithComponentOrOwnerStack(message, componentStack);
			dynamicValidation.dynamicErrors.push(error);
			return;
		}
	}
	/**
	* In dev mode, we prefer using the owner stack, otherwise the provided
	* component stack is used.
	*/ function createErrorWithComponentOrOwnerStack(message, componentStack) {
		const ownerStack = process.env.NODE_ENV !== "production" && _react$2.default.captureOwnerStack ? _react$2.default.captureOwnerStack() : null;
		const error = Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
			value: "E394",
			enumerable: false,
			configurable: true
		});
		error.stack = error.name + ": " + message + (ownerStack !== null && ownerStack !== void 0 ? ownerStack : componentStack);
		return error;
	}
	var PreludeState = /* @__PURE__ */ function(PreludeState$1) {
		PreludeState$1[PreludeState$1["Full"] = 0] = "Full";
		PreludeState$1[PreludeState$1["Empty"] = 1] = "Empty";
		PreludeState$1[PreludeState$1["Errored"] = 2] = "Errored";
		return PreludeState$1;
	}({});
	function logDisallowedDynamicError(workStore, error) {
		console.error(error);
		if (!workStore.dev) if (workStore.hasReadableErrorStacks) console.error(`To get a more detailed stack trace and pinpoint the issue, start the app in development mode by running \`next dev\`, then open "${workStore.route}" in your browser to investigate the error.`);
		else console.error(`To get a more detailed stack trace and pinpoint the issue, try one of the following:
  - Start the app in development mode by running \`next dev\`, then open "${workStore.route}" in your browser to investigate the error.
  - Rerun the production build with \`next build --debug-prerender\` to generate better stack traces.`);
	}
	function throwIfDisallowedDynamic(workStore, prelude, dynamicValidation, serverDynamic) {
		if (workStore.invalidDynamicUsageError) {
			logDisallowedDynamicError(workStore, workStore.invalidDynamicUsageError);
			throw new _staticgenerationbailout.StaticGenBailoutError();
		}
		if (prelude !== 0) {
			if (dynamicValidation.hasSuspenseAboveBody) return;
			if (serverDynamic.syncDynamicErrorWithStack) {
				logDisallowedDynamicError(workStore, serverDynamic.syncDynamicErrorWithStack);
				throw new _staticgenerationbailout.StaticGenBailoutError();
			}
			const dynamicErrors = dynamicValidation.dynamicErrors;
			if (dynamicErrors.length > 0) {
				for (let i = 0; i < dynamicErrors.length; i++) logDisallowedDynamicError(workStore, dynamicErrors[i]);
				throw new _staticgenerationbailout.StaticGenBailoutError();
			}
			if (dynamicValidation.hasDynamicViewport) {
				console.error(`Route "${workStore.route}" has a \`generateViewport\` that depends on Request data (\`cookies()\`, etc...) or uncached external data (\`fetch(...)\`, etc...) without explicitly allowing fully dynamic rendering. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-viewport`);
				throw new _staticgenerationbailout.StaticGenBailoutError();
			}
			if (prelude === 1) {
				console.error(`Route "${workStore.route}" did not produce a static shell and Next.js was unable to determine a reason. This is a bug in Next.js.`);
				throw new _staticgenerationbailout.StaticGenBailoutError();
			}
		} else if (dynamicValidation.hasAllowedDynamic === false && dynamicValidation.hasDynamicMetadata) {
			console.error(`Route "${workStore.route}" has a \`generateMetadata\` that depends on Request data (\`cookies()\`, etc...) or uncached external data (\`fetch(...)\`, etc...) when the rest of the route does not. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-metadata`);
			throw new _staticgenerationbailout.StaticGenBailoutError();
		}
	}
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/unstable-rethrow.server.js
var require_unstable_rethrow_server = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/unstable-rethrow.server.js"(exports, module) {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "unstable_rethrow", {
		enumerable: true,
		get: function() {
			return unstable_rethrow$2;
		}
	});
	const _dynamicrenderingutils = require_dynamic_rendering_utils();
	const _ispostpone = require_is_postpone();
	const _bailouttocsr$2 = require_bailout_to_csr();
	const _isnextroutererror$1 = require_is_next_router_error();
	const _dynamicrendering = require_dynamic_rendering();
	const _hooksservercontext = require_hooks_server_context();
	function unstable_rethrow$2(error) {
		if ((0, _isnextroutererror$1.isNextRouterError)(error) || (0, _bailouttocsr$2.isBailoutToCSRError)(error) || (0, _hooksservercontext.isDynamicServerError)(error) || (0, _dynamicrendering.isDynamicPostpone)(error) || (0, _ispostpone.isPostpone)(error) || (0, _dynamicrenderingutils.isHangingPromiseRejectionError)(error)) throw error;
		if (error instanceof Error && "cause" in error) unstable_rethrow$2(error.cause);
	}
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/unstable-rethrow.browser.js
var require_unstable_rethrow_browser = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/unstable-rethrow.browser.js"(exports, module) {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "unstable_rethrow", {
		enumerable: true,
		get: function() {
			return unstable_rethrow$1;
		}
	});
	const _bailouttocsr$1 = require_bailout_to_csr();
	const _isnextroutererror = require_is_next_router_error();
	function unstable_rethrow$1(error) {
		if ((0, _isnextroutererror.isNextRouterError)(error) || (0, _bailouttocsr$1.isBailoutToCSRError)(error)) throw error;
		if (error instanceof Error && "cause" in error) unstable_rethrow$1(error.cause);
	}
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/unstable-rethrow.js
var require_unstable_rethrow = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/unstable-rethrow.js"(exports, module) {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "unstable_rethrow", {
		enumerable: true,
		get: function() {
			return unstable_rethrow;
		}
	});
	const unstable_rethrow = typeof window === "undefined" ? require_unstable_rethrow_server().unstable_rethrow : require_unstable_rethrow_browser().unstable_rethrow;
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/navigation.react-server.js
var require_navigation_react_server = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/navigation.react-server.js"(exports, module) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$2(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$2(exports, {
		ReadonlyURLSearchParams: function() {
			return ReadonlyURLSearchParams;
		},
		RedirectType: function() {
			return _redirecterror.RedirectType;
		},
		forbidden: function() {
			return _forbidden.forbidden;
		},
		notFound: function() {
			return _notfound.notFound;
		},
		permanentRedirect: function() {
			return _redirect.permanentRedirect;
		},
		redirect: function() {
			return _redirect.redirect;
		},
		unauthorized: function() {
			return _unauthorized.unauthorized;
		},
		unstable_rethrow: function() {
			return _unstablerethrow.unstable_rethrow;
		}
	});
	const _redirect = require_redirect();
	const _redirecterror = require_redirect_error();
	const _notfound = require_not_found();
	const _forbidden = require_forbidden();
	const _unauthorized = require_unauthorized();
	const _unstablerethrow = require_unstable_rethrow();
	var ReadonlyURLSearchParamsError = class extends Error {
		constructor() {
			super("Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams");
		}
	};
	var ReadonlyURLSearchParams = class extends URLSearchParams {
		/** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ append() {
			throw new ReadonlyURLSearchParamsError();
		}
		/** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ delete() {
			throw new ReadonlyURLSearchParamsError();
		}
		/** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ set() {
			throw new ReadonlyURLSearchParamsError();
		}
		/** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ sort() {
			throw new ReadonlyURLSearchParamsError();
		}
	};
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
} });

//#endregion
//#region ../../node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs
var require__interop_require_wildcard = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs"(exports) {
	function _getRequireWildcardCache(nodeInterop) {
		if (typeof WeakMap !== "function") return null;
		var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
		var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
		return (_getRequireWildcardCache = function(nodeInterop$1) {
			return nodeInterop$1 ? cacheNodeInterop : cacheBabelInterop;
		})(nodeInterop);
	}
	function _interop_require_wildcard$1(obj, nodeInterop) {
		if (!nodeInterop && obj && obj.__esModule) return obj;
		if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { default: obj };
		var cache = _getRequireWildcardCache(nodeInterop);
		if (cache && cache.has(obj)) return cache.get(obj);
		var newObj = { __proto__: null };
		var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
		for (var key in obj) if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
			var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
			if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
			else newObj[key] = obj[key];
		}
		newObj.default = obj;
		if (cache) cache.set(obj, newObj);
		return newObj;
	}
	exports._ = _interop_require_wildcard$1;
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/shared/lib/server-inserted-html.shared-runtime.js
var require_server_inserted_html_shared_runtime = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/shared/lib/server-inserted-html.shared-runtime.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$1(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$1(exports, {
		ServerInsertedHTMLContext: function() {
			return ServerInsertedHTMLContext;
		},
		useServerInsertedHTML: function() {
			return useServerInsertedHTML;
		}
	});
	const _interop_require_wildcard = require__interop_require_wildcard();
	const _react$1 = /* @__PURE__ */ _interop_require_wildcard._(require_react());
	const ServerInsertedHTMLContext = /* @__PURE__ */ _react$1.default.createContext(null);
	function useServerInsertedHTML(callback) {
		const addInsertedServerHTMLCallback = (0, _react$1.useContext)(ServerInsertedHTMLContext);
		if (addInsertedServerHTMLCallback) addInsertedServerHTMLCallback(callback);
	}
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/bailout-to-client-rendering.js
var require_bailout_to_client_rendering = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/bailout-to-client-rendering.js"(exports, module) {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "bailoutToClientRendering", {
		enumerable: true,
		get: function() {
			return bailoutToClientRendering;
		}
	});
	const _bailouttocsr = require_bailout_to_csr();
	const _workasyncstorageexternal = require_work_async_storage_external();
	const _workunitasyncstorageexternal = require_work_unit_async_storage_external();
	function bailoutToClientRendering(reason) {
		const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
		if (workStore == null ? void 0 : workStore.forceStatic) return;
		const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
		if (workUnitStore) switch (workUnitStore.type) {
			case "prerender":
			case "prerender-client":
			case "prerender-ppr":
			case "prerender-legacy": throw Object.defineProperty(new _bailouttocsr.BailoutToCSRError(reason), "__NEXT_ERROR_CODE", {
				value: "E394",
				enumerable: false,
				configurable: true
			});
			default:
		}
	}
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/navigation.js
var require_navigation$1 = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/components/navigation.js"(exports, module) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export(exports, {
		ReadonlyURLSearchParams: function() {
			return _navigationreactserver.ReadonlyURLSearchParams;
		},
		RedirectType: function() {
			return _navigationreactserver.RedirectType;
		},
		ServerInsertedHTMLContext: function() {
			return _serverinsertedhtmlsharedruntime.ServerInsertedHTMLContext;
		},
		forbidden: function() {
			return _navigationreactserver.forbidden;
		},
		notFound: function() {
			return _navigationreactserver.notFound;
		},
		permanentRedirect: function() {
			return _navigationreactserver.permanentRedirect;
		},
		redirect: function() {
			return _navigationreactserver.redirect;
		},
		unauthorized: function() {
			return _navigationreactserver.unauthorized;
		},
		unstable_rethrow: function() {
			return _navigationreactserver.unstable_rethrow;
		},
		useParams: function() {
			return useParams;
		},
		usePathname: function() {
			return usePathname;
		},
		useRouter: function() {
			return useRouter;
		},
		useSearchParams: function() {
			return useSearchParams;
		},
		useSelectedLayoutSegment: function() {
			return useSelectedLayoutSegment;
		},
		useSelectedLayoutSegments: function() {
			return useSelectedLayoutSegments;
		},
		useServerInsertedHTML: function() {
			return _serverinsertedhtmlsharedruntime.useServerInsertedHTML;
		}
	});
	const _react = require_react();
	const _approutercontextsharedruntime = require_app_router_context_shared_runtime();
	const _hooksclientcontextsharedruntime = require_hooks_client_context_shared_runtime();
	const _getsegmentvalue = require_get_segment_value();
	const _segment = require_segment();
	const _navigationreactserver = require_navigation_react_server();
	const _serverinsertedhtmlsharedruntime = require_server_inserted_html_shared_runtime();
	const useDynamicRouteParams = typeof window === "undefined" ? require_dynamic_rendering().useDynamicRouteParams : void 0;
	function useSearchParams() {
		const searchParams = (0, _react.useContext)(_hooksclientcontextsharedruntime.SearchParamsContext);
		const readonlySearchParams = (0, _react.useMemo)(() => {
			if (!searchParams) return null;
			return new _navigationreactserver.ReadonlyURLSearchParams(searchParams);
		}, [searchParams]);
		if (typeof window === "undefined") {
			const { bailoutToClientRendering: bailoutToClientRendering$1 } = require_bailout_to_client_rendering();
			bailoutToClientRendering$1("useSearchParams()");
		}
		return readonlySearchParams;
	}
	function usePathname() {
		useDynamicRouteParams == null || useDynamicRouteParams("usePathname()");
		return (0, _react.useContext)(_hooksclientcontextsharedruntime.PathnameContext);
	}
	function useRouter() {
		const router = (0, _react.useContext)(_approutercontextsharedruntime.AppRouterContext);
		if (router === null) throw Object.defineProperty(new Error("invariant expected app router to be mounted"), "__NEXT_ERROR_CODE", {
			value: "E238",
			enumerable: false,
			configurable: true
		});
		return router;
	}
	function useParams() {
		useDynamicRouteParams == null || useDynamicRouteParams("useParams()");
		return (0, _react.useContext)(_hooksclientcontextsharedruntime.PathParamsContext);
	}
	/** Get the canonical parameters from the current level to the leaf node. */ function getSelectedLayoutSegmentPath(tree, parallelRouteKey, first, segmentPath) {
		if (first === void 0) first = true;
		if (segmentPath === void 0) segmentPath = [];
		let node;
		if (first) node = tree[1][parallelRouteKey];
		else {
			const parallelRoutes = tree[1];
			var _parallelRoutes_children;
			node = (_parallelRoutes_children = parallelRoutes.children) != null ? _parallelRoutes_children : Object.values(parallelRoutes)[0];
		}
		if (!node) return segmentPath;
		const segment = node[0];
		let segmentValue = (0, _getsegmentvalue.getSegmentValue)(segment);
		if (!segmentValue || segmentValue.startsWith(_segment.PAGE_SEGMENT_KEY)) return segmentPath;
		segmentPath.push(segmentValue);
		return getSelectedLayoutSegmentPath(node, parallelRouteKey, false, segmentPath);
	}
	function useSelectedLayoutSegments(parallelRouteKey) {
		if (parallelRouteKey === void 0) parallelRouteKey = "children";
		useDynamicRouteParams == null || useDynamicRouteParams("useSelectedLayoutSegments()");
		const context = (0, _react.useContext)(_approutercontextsharedruntime.LayoutRouterContext);
		if (!context) return null;
		return getSelectedLayoutSegmentPath(context.parentTree, parallelRouteKey);
	}
	function useSelectedLayoutSegment(parallelRouteKey) {
		if (parallelRouteKey === void 0) parallelRouteKey = "children";
		useDynamicRouteParams == null || useDynamicRouteParams("useSelectedLayoutSegment()");
		const selectedLayoutSegments = useSelectedLayoutSegments(parallelRouteKey);
		if (!selectedLayoutSegments || selectedLayoutSegments.length === 0) return null;
		const selectedLayoutSegment = parallelRouteKey === "children" ? selectedLayoutSegments[0] : selectedLayoutSegments[selectedLayoutSegments.length - 1];
		return selectedLayoutSegment === _segment.DEFAULT_SEGMENT_KEY ? null : selectedLayoutSegment;
	}
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
} });

//#endregion
//#region ../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/navigation.js
var require_navigation = require_getErrorShape.__commonJS({ "../../node_modules/.pnpm/next@15.4.10_@babel+core@7.26.9_@playwright+test@1.51.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/navigation.js"(exports, module) {
	module.exports = require_navigation$1();
} });

//#endregion
//#region src/adapters/next-app-dir/rethrowNextErrors.ts
var import_navigation = require_getErrorShape.__toESM(require_navigation(), 1);
/**
* @remarks The helpers from `next/dist/client/components/*` has been removed in Next.js 15.
* Inlining them here instead...
* @see https://github.com/vercel/next.js/blob/5ae286ffd664e5c76841ed64f6e2da85a0835922/packages/next/src/client/components/redirect.ts#L97-L123
*/
const REDIRECT_ERROR_CODE = "NEXT_REDIRECT";
function isRedirectError(error) {
	if (typeof error !== "object" || error === null || !("digest" in error) || typeof error.digest !== "string") return false;
	const [errorCode, type, destination, status] = error.digest.split(";", 4);
	const statusCode = Number(status);
	return errorCode === REDIRECT_ERROR_CODE && (type === "replace" || type === "push") && typeof destination === "string" && !isNaN(statusCode);
}
/**
* @remarks The helpers from `next/dist/client/components/*` has been removed in Next.js 15.
* Inlining them here instead...
* @see https://github.com/vercel/next.js/blob/5ae286ffd664e5c76841ed64f6e2da85a0835922/packages/next/src/client/components/not-found.ts#L33-L39
*/
const NOT_FOUND_ERROR_CODE = "NEXT_NOT_FOUND";
function isNotFoundError(error) {
	if (typeof error !== "object" || error === null || !("digest" in error)) return false;
	return error.digest === NOT_FOUND_ERROR_CODE;
}
/**
* Rethrow errors that should be handled by Next.js
*/
const rethrowNextErrors = (error) => {
	if (error.code === "NOT_FOUND") import_navigation.notFound();
	if (error instanceof TRPCRedirectError) import_navigation.redirect(...error.args);
	const { cause } = error;
	if ("unstable_rethrow" in import_navigation && typeof import_navigation.unstable_rethrow === "function") import_navigation.unstable_rethrow(cause);
	if (isRedirectError(cause) || isNotFoundError(cause)) throw cause;
};

//#endregion
//#region src/adapters/next-app-dir/nextAppDirCaller.ts
/**
* Create a caller that works with Next.js React Server Components & Server Actions
*/
function nextAppDirCaller(config) {
	const { normalizeFormData = true } = config;
	const createContext = async () => {
		var _config$createContext, _config$createContext2;
		return (_config$createContext = config === null || config === void 0 || (_config$createContext2 = config.createContext) === null || _config$createContext2 === void 0 ? void 0 : _config$createContext2.call(config)) !== null && _config$createContext !== void 0 ? _config$createContext : {};
	};
	return async (opts) => {
		var _config$pathExtractor, _config$pathExtractor2;
		const path = (_config$pathExtractor = (_config$pathExtractor2 = config.pathExtractor) === null || _config$pathExtractor2 === void 0 ? void 0 : _config$pathExtractor2.call(config, { meta: opts._def.meta })) !== null && _config$pathExtractor !== void 0 ? _config$pathExtractor : "";
		const ctx = await createContext().catch((cause) => {
			const error = new require_tracked.TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Failed to create context",
				cause
			});
			throw error;
		});
		const handleError = (cause) => {
			var _config$onError;
			const error = require_tracked.getTRPCErrorFromUnknown(cause);
			(_config$onError = config.onError) === null || _config$onError === void 0 || _config$onError.call(config, {
				ctx,
				error,
				input: opts.args[0],
				path,
				type: opts._def.type
			});
			rethrowNextErrors(error);
			throw error;
		};
		switch (opts._def.type) {
			case "mutation": {
				/**
				* When you wrap an action with useFormState, it gets an extra argument as its first argument.
				* The submitted form data is therefore its second argument instead of its first as it would usually be.
				* The new first argument that gets added is the current state of the form.
				* @see https://react.dev/reference/react-dom/hooks/useFormState#my-action-can-no-longer-read-the-submitted-form-data
				*/
				let input = opts.args.length === 1 ? opts.args[0] : opts.args[1];
				if (normalizeFormData && input instanceof FormData) input = require_unstable_core_do_not_import.formDataToObject(input);
				return await opts.invoke({
					type: opts._def.type,
					ctx,
					getRawInput: async () => input,
					path,
					input,
					signal: void 0
				}).then((data) => {
					if (data instanceof TRPCRedirectError) throw data;
					return data;
				}).catch(handleError);
			}
			case "query": {
				const input = opts.args[0];
				return await opts.invoke({
					type: opts._def.type,
					ctx,
					getRawInput: async () => input,
					path,
					input,
					signal: void 0
				}).then((data) => {
					if (data instanceof TRPCRedirectError) throw data;
					return data;
				}).catch(handleError);
			}
			case "subscription":
			default: throw new require_tracked.TRPCError({
				code: "NOT_IMPLEMENTED",
				message: `Not implemented for type ${opts._def.type}`
			});
		}
	};
}

//#endregion
//#region src/adapters/next-app-dir/notFound.ts
/**
* Like `next/navigation`'s `notFound()` but throws a `TRPCError` that later will be handled by Next.js
* @public
*/
const notFound = () => {
	throw new require_tracked.TRPCError({ code: "NOT_FOUND" });
};

//#endregion
exports.experimental_nextAppDirCaller = nextAppDirCaller;
exports.experimental_notFound = notFound;
exports.experimental_redirect = redirect;
exports.rethrowNextErrors = rethrowNextErrors;