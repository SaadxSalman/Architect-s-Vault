//#region src/unstable-core-do-not-import/utils.ts
/**
* Ensures there are no duplicate keys when building a procedure.
* @internal
*/
function mergeWithoutOverrides(obj1, ...objs) {
	const newObj = Object.assign(emptyObject(), obj1);
	for (const overrides of objs) for (const key in overrides) {
		if (key in newObj && newObj[key] !== overrides[key]) throw new Error(`Duplicate key ${key}`);
		newObj[key] = overrides[key];
	}
	return newObj;
}
/**
* Check that value is object
* @internal
*/
function isObject(value) {
	return !!value && !Array.isArray(value) && typeof value === "object";
}
function isFunction(fn) {
	return typeof fn === "function";
}
/**
* Create an object without inheriting anything from `Object.prototype`
* @internal
*/
function emptyObject() {
	return Object.create(null);
}
const asyncIteratorsSupported = typeof Symbol === "function" && !!Symbol.asyncIterator;
function isAsyncIterable(value) {
	return asyncIteratorsSupported && isObject(value) && Symbol.asyncIterator in value;
}
/**
* Run an IIFE
*/
const run = (fn) => fn();
function noop() {}
function identity(it) {
	return it;
}
/**
* Generic runtime assertion function. Throws, if the condition is not `true`.
*
* Can be used as a slightly less dangerous variant of type assertions. Code
* mistakes would be revealed at runtime then (hopefully during testing).
*/
function assert(condition, msg = "no additional info") {
	if (!condition) throw new Error(`AssertionError: ${msg}`);
}
function sleep(ms = 0) {
	return new Promise((res) => setTimeout(res, ms));
}
/**
* Ponyfill for
* [`AbortSignal.any`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/any_static).
*/
function abortSignalsAnyPonyfill(signals) {
	if (typeof AbortSignal.any === "function") return AbortSignal.any(signals);
	const ac = new AbortController();
	for (const signal of signals) {
		if (signal.aborted) {
			trigger();
			break;
		}
		signal.addEventListener("abort", trigger, { once: true });
	}
	return ac.signal;
	function trigger() {
		ac.abort();
		for (const signal of signals) signal.removeEventListener("abort", trigger);
	}
}

//#endregion
//#region src/unstable-core-do-not-import/rpc/codes.ts
/**
* JSON-RPC 2.0 Error codes
*
* `-32000` to `-32099` are reserved for implementation-defined server-errors.
* For tRPC we're copying the last digits of HTTP 4XX errors.
*/
const TRPC_ERROR_CODES_BY_KEY = {
	PARSE_ERROR: -32700,
	BAD_REQUEST: -32600,
	INTERNAL_SERVER_ERROR: -32603,
	NOT_IMPLEMENTED: -32603,
	BAD_GATEWAY: -32603,
	SERVICE_UNAVAILABLE: -32603,
	GATEWAY_TIMEOUT: -32603,
	UNAUTHORIZED: -32001,
	PAYMENT_REQUIRED: -32002,
	FORBIDDEN: -32003,
	NOT_FOUND: -32004,
	METHOD_NOT_SUPPORTED: -32005,
	TIMEOUT: -32008,
	CONFLICT: -32009,
	PRECONDITION_FAILED: -32012,
	PAYLOAD_TOO_LARGE: -32013,
	UNSUPPORTED_MEDIA_TYPE: -32015,
	UNPROCESSABLE_CONTENT: -32022,
	PRECONDITION_REQUIRED: -32028,
	TOO_MANY_REQUESTS: -32029,
	CLIENT_CLOSED_REQUEST: -32099
};
const TRPC_ERROR_CODES_BY_NUMBER = {
	[-32700]: "PARSE_ERROR",
	[-32600]: "BAD_REQUEST",
	[-32603]: "INTERNAL_SERVER_ERROR",
	[-32001]: "UNAUTHORIZED",
	[-32002]: "PAYMENT_REQUIRED",
	[-32003]: "FORBIDDEN",
	[-32004]: "NOT_FOUND",
	[-32005]: "METHOD_NOT_SUPPORTED",
	[-32008]: "TIMEOUT",
	[-32009]: "CONFLICT",
	[-32012]: "PRECONDITION_FAILED",
	[-32013]: "PAYLOAD_TOO_LARGE",
	[-32015]: "UNSUPPORTED_MEDIA_TYPE",
	[-32022]: "UNPROCESSABLE_CONTENT",
	[-32028]: "PRECONDITION_REQUIRED",
	[-32029]: "TOO_MANY_REQUESTS",
	[-32099]: "CLIENT_CLOSED_REQUEST"
};
/**
* tRPC error codes that are considered retryable
* With out of the box SSE, the client will reconnect when these errors are encountered
*/
const retryableRpcCodes = [
	TRPC_ERROR_CODES_BY_KEY.BAD_GATEWAY,
	TRPC_ERROR_CODES_BY_KEY.SERVICE_UNAVAILABLE,
	TRPC_ERROR_CODES_BY_KEY.GATEWAY_TIMEOUT,
	TRPC_ERROR_CODES_BY_KEY.INTERNAL_SERVER_ERROR
];

//#endregion
export { TRPC_ERROR_CODES_BY_KEY, TRPC_ERROR_CODES_BY_NUMBER, abortSignalsAnyPonyfill, assert, emptyObject, identity, isAsyncIterable, isFunction, isObject, mergeWithoutOverrides, noop, retryableRpcCodes, run, sleep };
//# sourceMappingURL=codes-DagpWZLc.mjs.map