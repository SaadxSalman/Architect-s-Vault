import { TRPC_ERROR_CODES_BY_KEY, TRPC_ERROR_CODES_BY_NUMBER, emptyObject, isObject } from "./codes-DagpWZLc.mjs";

//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
	return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion
//#region src/unstable-core-do-not-import/createProxy.ts
const noop = () => {};
const freezeIfAvailable = (obj) => {
	if (Object.freeze) Object.freeze(obj);
};
function createInnerProxy(callback, path, memo) {
	var _memo$cacheKey;
	const cacheKey = path.join(".");
	(_memo$cacheKey = memo[cacheKey]) !== null && _memo$cacheKey !== void 0 || (memo[cacheKey] = new Proxy(noop, {
		get(_obj, key) {
			if (typeof key !== "string" || key === "then") return void 0;
			return createInnerProxy(callback, [...path, key], memo);
		},
		apply(_1, _2, args) {
			const lastOfPath = path[path.length - 1];
			let opts = {
				args,
				path
			};
			if (lastOfPath === "call") opts = {
				args: args.length >= 2 ? [args[1]] : [],
				path: path.slice(0, -1)
			};
			else if (lastOfPath === "apply") opts = {
				args: args.length >= 2 ? args[1] : [],
				path: path.slice(0, -1)
			};
			freezeIfAvailable(opts.args);
			freezeIfAvailable(opts.path);
			return callback(opts);
		}
	}));
	return memo[cacheKey];
}
/**
* Creates a proxy that calls the callback with the path and arguments
*
* @internal
*/
const createRecursiveProxy = (callback) => createInnerProxy(callback, [], emptyObject());
/**
* Used in place of `new Proxy` where each handler will map 1 level deep to another value.
*
* @internal
*/
const createFlatProxy = (callback) => {
	return new Proxy(noop, { get(_obj, name) {
		if (name === "then") return void 0;
		return callback(name);
	} });
};

//#endregion
//#region src/unstable-core-do-not-import/http/getHTTPStatusCode.ts
const JSONRPC2_TO_HTTP_CODE = {
	PARSE_ERROR: 400,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	PAYMENT_REQUIRED: 402,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	METHOD_NOT_SUPPORTED: 405,
	TIMEOUT: 408,
	CONFLICT: 409,
	PRECONDITION_FAILED: 412,
	PAYLOAD_TOO_LARGE: 413,
	UNSUPPORTED_MEDIA_TYPE: 415,
	UNPROCESSABLE_CONTENT: 422,
	PRECONDITION_REQUIRED: 428,
	TOO_MANY_REQUESTS: 429,
	CLIENT_CLOSED_REQUEST: 499,
	INTERNAL_SERVER_ERROR: 500,
	NOT_IMPLEMENTED: 501,
	BAD_GATEWAY: 502,
	SERVICE_UNAVAILABLE: 503,
	GATEWAY_TIMEOUT: 504
};
const HTTP_CODE_TO_JSONRPC2 = {
	400: "BAD_REQUEST",
	401: "UNAUTHORIZED",
	402: "PAYMENT_REQUIRED",
	403: "FORBIDDEN",
	404: "NOT_FOUND",
	405: "METHOD_NOT_SUPPORTED",
	408: "TIMEOUT",
	409: "CONFLICT",
	412: "PRECONDITION_FAILED",
	413: "PAYLOAD_TOO_LARGE",
	415: "UNSUPPORTED_MEDIA_TYPE",
	422: "UNPROCESSABLE_CONTENT",
	428: "PRECONDITION_REQUIRED",
	429: "TOO_MANY_REQUESTS",
	499: "CLIENT_CLOSED_REQUEST",
	500: "INTERNAL_SERVER_ERROR",
	501: "NOT_IMPLEMENTED",
	502: "BAD_GATEWAY",
	503: "SERVICE_UNAVAILABLE",
	504: "GATEWAY_TIMEOUT"
};
function getStatusCodeFromKey(code) {
	var _JSONRPC2_TO_HTTP_COD;
	return (_JSONRPC2_TO_HTTP_COD = JSONRPC2_TO_HTTP_CODE[code]) !== null && _JSONRPC2_TO_HTTP_COD !== void 0 ? _JSONRPC2_TO_HTTP_COD : 500;
}
function getStatusKeyFromCode(code) {
	var _HTTP_CODE_TO_JSONRPC;
	return (_HTTP_CODE_TO_JSONRPC = HTTP_CODE_TO_JSONRPC2[code]) !== null && _HTTP_CODE_TO_JSONRPC !== void 0 ? _HTTP_CODE_TO_JSONRPC : "INTERNAL_SERVER_ERROR";
}
function getHTTPStatusCode(json) {
	const arr = Array.isArray(json) ? json : [json];
	const httpStatuses = new Set(arr.map((res) => {
		if ("error" in res && isObject(res.error.data)) {
			var _res$error$data;
			if (typeof ((_res$error$data = res.error.data) === null || _res$error$data === void 0 ? void 0 : _res$error$data["httpStatus"]) === "number") return res.error.data["httpStatus"];
			const code = TRPC_ERROR_CODES_BY_NUMBER[res.error.code];
			return getStatusCodeFromKey(code);
		}
		return 200;
	}));
	if (httpStatuses.size !== 1) return 207;
	const httpStatus = httpStatuses.values().next().value;
	return httpStatus;
}
function getHTTPStatusCodeFromError(error) {
	return getStatusCodeFromKey(error.code);
}

//#endregion
//#region ../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/typeof.js
var require_typeof = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/typeof.js"(exports, module) {
	function _typeof$2(o) {
		"@babel/helpers - typeof";
		return module.exports = _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
			return typeof o$1;
		} : function(o$1) {
			return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
		}, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof$2(o);
	}
	module.exports = _typeof$2, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });

//#endregion
//#region ../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPrimitive.js
var require_toPrimitive = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPrimitive.js"(exports, module) {
	var _typeof$1 = require_typeof()["default"];
	function toPrimitive$1(t, r) {
		if ("object" != _typeof$1(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof$1(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	module.exports = toPrimitive$1, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });

//#endregion
//#region ../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPropertyKey.js
var require_toPropertyKey = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPropertyKey.js"(exports, module) {
	var _typeof = require_typeof()["default"];
	var toPrimitive = require_toPrimitive();
	function toPropertyKey$1(t) {
		var i = toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	module.exports = toPropertyKey$1, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });

//#endregion
//#region ../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/defineProperty.js
var require_defineProperty = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/defineProperty.js"(exports, module) {
	var toPropertyKey = require_toPropertyKey();
	function _defineProperty(e, r, t) {
		return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });

//#endregion
//#region ../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectSpread2.js
var require_objectSpread2 = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectSpread2.js"(exports, module) {
	var defineProperty = require_defineProperty();
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r$1) {
				return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread2(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r$1) {
				defineProperty(e, r$1, t[r$1]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r$1) {
				Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
			});
		}
		return e;
	}
	module.exports = _objectSpread2, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });

//#endregion
//#region src/unstable-core-do-not-import/error/getErrorShape.ts
var import_objectSpread2 = __toESM(require_objectSpread2(), 1);
/**
* @internal
*/
function getErrorShape(opts) {
	const { path, error, config } = opts;
	const { code } = opts.error;
	const shape = {
		message: error.message,
		code: TRPC_ERROR_CODES_BY_KEY[code],
		data: {
			code,
			httpStatus: getHTTPStatusCodeFromError(error)
		}
	};
	if (config.isDev && typeof opts.error.stack === "string") shape.data.stack = opts.error.stack;
	if (typeof path === "string") shape.data.path = path;
	return config.errorFormatter((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, opts), {}, { shape }));
}

//#endregion
export { HTTP_CODE_TO_JSONRPC2, JSONRPC2_TO_HTTP_CODE, __commonJS, __toESM, createFlatProxy, createRecursiveProxy, getErrorShape, getHTTPStatusCode, getHTTPStatusCodeFromError, getStatusCodeFromKey, getStatusKeyFromCode, require_defineProperty, require_objectSpread2 };
//# sourceMappingURL=getErrorShape-vC8mUXJD.mjs.map