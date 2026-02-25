import { __toESM, require_objectSpread2 } from "./objectSpread2-BvkFp-_Y.mjs";
import { getTransformer } from "./unstable-internals-Bg7n9BBj.mjs";

//#region src/getFetch.ts
const isFunction = (fn) => typeof fn === "function";
function getFetch(customFetchImpl) {
	if (customFetchImpl) return customFetchImpl;
	if (typeof window !== "undefined" && isFunction(window.fetch)) return window.fetch;
	if (typeof globalThis !== "undefined" && isFunction(globalThis.fetch)) return globalThis.fetch;
	throw new Error("No fetch implementation found");
}

//#endregion
//#region src/links/internals/httpUtils.ts
var import_objectSpread2 = __toESM(require_objectSpread2(), 1);
function resolveHTTPLinkOptions(opts) {
	return {
		url: opts.url.toString(),
		fetch: opts.fetch,
		transformer: getTransformer(opts.transformer),
		methodOverride: opts.methodOverride
	};
}
function arrayToDict(array) {
	const dict = {};
	for (let index = 0; index < array.length; index++) {
		const element = array[index];
		dict[index] = element;
	}
	return dict;
}
const METHOD = {
	query: "GET",
	mutation: "POST",
	subscription: "PATCH"
};
function getInput(opts) {
	return "input" in opts ? opts.transformer.input.serialize(opts.input) : arrayToDict(opts.inputs.map((_input) => opts.transformer.input.serialize(_input)));
}
const getUrl = (opts) => {
	const parts = opts.url.split("?");
	const base = parts[0].replace(/\/$/, "");
	let url = base + "/" + opts.path;
	const queryParts = [];
	if (parts[1]) queryParts.push(parts[1]);
	if ("inputs" in opts) queryParts.push("batch=1");
	if (opts.type === "query" || opts.type === "subscription") {
		const input = getInput(opts);
		if (input !== void 0 && opts.methodOverride !== "POST") queryParts.push(`input=${encodeURIComponent(JSON.stringify(input))}`);
	}
	if (queryParts.length) url += "?" + queryParts.join("&");
	return url;
};
const getBody = (opts) => {
	if (opts.type === "query" && opts.methodOverride !== "POST") return void 0;
	const input = getInput(opts);
	return input !== void 0 ? JSON.stringify(input) : void 0;
};
const jsonHttpRequester = (opts) => {
	return httpRequest((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, opts), {}, {
		contentTypeHeader: "application/json",
		getUrl,
		getBody
	}));
};
/**
* Polyfill for DOMException with AbortError name
*/
var AbortError = class extends Error {
	constructor() {
		const name = "AbortError";
		super(name);
		this.name = name;
		this.message = name;
	}
};
/**
* Polyfill for `signal.throwIfAborted()`
*
* @see https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/throwIfAborted
*/
const throwIfAborted = (signal) => {
	var _signal$throwIfAborte;
	if (!(signal === null || signal === void 0 ? void 0 : signal.aborted)) return;
	(_signal$throwIfAborte = signal.throwIfAborted) === null || _signal$throwIfAborte === void 0 || _signal$throwIfAborte.call(signal);
	if (typeof DOMException !== "undefined") throw new DOMException("AbortError", "AbortError");
	throw new AbortError();
};
async function fetchHTTPResponse(opts) {
	var _opts$methodOverride;
	throwIfAborted(opts.signal);
	const url = opts.getUrl(opts);
	const body = opts.getBody(opts);
	const method = (_opts$methodOverride = opts.methodOverride) !== null && _opts$methodOverride !== void 0 ? _opts$methodOverride : METHOD[opts.type];
	const resolvedHeaders = await (async () => {
		const heads = await opts.headers();
		if (Symbol.iterator in heads) return Object.fromEntries(heads);
		return heads;
	})();
	const headers = (0, import_objectSpread2.default)((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, opts.contentTypeHeader && method !== "GET" ? { "content-type": opts.contentTypeHeader } : {}), opts.trpcAcceptHeader ? { "trpc-accept": opts.trpcAcceptHeader } : void 0), resolvedHeaders);
	return getFetch(opts.fetch)(url, {
		method,
		signal: opts.signal,
		body,
		headers
	});
}
async function httpRequest(opts) {
	const meta = {};
	const res = await fetchHTTPResponse(opts);
	meta.response = res;
	const json = await res.json();
	meta.responseJSON = json;
	return {
		json,
		meta
	};
}

//#endregion
export { fetchHTTPResponse, getBody, getFetch, getUrl, httpRequest, jsonHttpRequester, resolveHTTPLinkOptions };
//# sourceMappingURL=httpUtils-Dv57hbOd.mjs.map