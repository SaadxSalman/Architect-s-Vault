const require_getErrorShape = require('../../getErrorShape-MR4DZeb7.cjs');
require('../../codes-BfZsPdy-.cjs');
require('../../tracked-D4WGA_Z-.cjs');
const require_resolveResponse = require('../../resolveResponse-ByfQ6olt.cjs');
require('../../observable-B1Nk6r1H.cjs');
const node_stream = require_getErrorShape.__toESM(require("node:stream"));
const node_stream_promises = require_getErrorShape.__toESM(require("node:stream/promises"));

//#region src/vendor/cookie-es/set-cookie/split.ts
/**
* Based on https://github.com/unjs/cookie-es/tree/v1.2.2
* MIT License
* 
* Cookie-es copyright (c) Pooya Parsa <pooya@pi0.io>
* Set-Cookie parsing based on https://github.com/nfriedly/set-cookie-parser
* Copyright (c) 2015 Nathan Friedly <nathan@nfriedly.com> (http://nfriedly.com/)
* 
* @see https://github.com/unjs/cookie-es/blob/main/src/set-cookie/split.ts
*/
/**
* Set-Cookie header field-values are sometimes comma joined in one string. This splits them without choking on commas
* that are within a single set-cookie field-value, such as in the Expires portion.
*
* See https://tools.ietf.org/html/rfc2616#section-4.2
*/
function splitSetCookieString(cookiesString) {
	if (Array.isArray(cookiesString)) return cookiesString.flatMap((c) => splitSetCookieString(c));
	if (typeof cookiesString !== "string") return [];
	const cookiesStrings = [];
	let pos = 0;
	let start;
	let ch;
	let lastComma;
	let nextStart;
	let cookiesSeparatorFound;
	const skipWhitespace = () => {
		while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) pos += 1;
		return pos < cookiesString.length;
	};
	const notSpecialChar = () => {
		ch = cookiesString.charAt(pos);
		return ch !== "=" && ch !== ";" && ch !== ",";
	};
	while (pos < cookiesString.length) {
		start = pos;
		cookiesSeparatorFound = false;
		while (skipWhitespace()) {
			ch = cookiesString.charAt(pos);
			if (ch === ",") {
				lastComma = pos;
				pos += 1;
				skipWhitespace();
				nextStart = pos;
				while (pos < cookiesString.length && notSpecialChar()) pos += 1;
				if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
					cookiesSeparatorFound = true;
					pos = nextStart;
					cookiesStrings.push(cookiesString.slice(start, lastComma));
					start = pos;
				} else pos = lastComma + 1;
			} else pos += 1;
		}
		if (!cookiesSeparatorFound || pos >= cookiesString.length) cookiesStrings.push(cookiesString.slice(start));
	}
	return cookiesStrings;
}

//#endregion
//#region src/adapters/aws-lambda/getPlanner.ts
var import_objectSpread2$1 = require_getErrorShape.__toESM(require_getErrorShape.require_objectSpread2(), 1);
function determinePayloadFormat(event) {
	const unknownEvent = event;
	if (typeof unknownEvent.version === "undefined") return "1.0";
	else return unknownEvent.version;
}
function getHeadersAndCookiesFromResponse(response) {
	const headers = Object.fromEntries(response.headers.entries());
	const cookies = splitSetCookieString(response.headers.getSetCookie()).map((cookie) => cookie.trim());
	delete headers["set-cookie"];
	return {
		headers,
		cookies
	};
}
const v1Processor = {
	getTRPCPath: (event) => {
		if (!event.pathParameters) {
			var _event$path$split$pop;
			return (_event$path$split$pop = event.path.split("/").pop()) !== null && _event$path$split$pop !== void 0 ? _event$path$split$pop : "";
		}
		const matches = event.resource.matchAll(new RegExp("\\{(.*?)\\}", "g"));
		for (const match of matches) {
			const group = match[1];
			if (group.includes("+") && event.pathParameters) {
				var _event$pathParameters;
				return (_event$pathParameters = event.pathParameters[group.replace("+", "")]) !== null && _event$pathParameters !== void 0 ? _event$pathParameters : "";
			}
		}
		return event.path.slice(1);
	},
	url(event) {
		var _ref, _ref2, _event$requestContext, _event$multiValueHead, _event$queryStringPar;
		const hostname = (_ref = (_ref2 = (_event$requestContext = event.requestContext.domainName) !== null && _event$requestContext !== void 0 ? _event$requestContext : event.headers["host"]) !== null && _ref2 !== void 0 ? _ref2 : (_event$multiValueHead = event.multiValueHeaders) === null || _event$multiValueHead === void 0 || (_event$multiValueHead = _event$multiValueHead["host"]) === null || _event$multiValueHead === void 0 ? void 0 : _event$multiValueHead[0]) !== null && _ref !== void 0 ? _ref : "localhost";
		const searchParams = new URLSearchParams();
		for (const [key, value] of Object.entries((_event$queryStringPar = event.queryStringParameters) !== null && _event$queryStringPar !== void 0 ? _event$queryStringPar : {})) if (value !== void 0) searchParams.append(key, value);
		const qs = searchParams.toString();
		return {
			hostname,
			pathname: event.path,
			search: qs && `?${qs}`
		};
	},
	getHeaders: (event) => {
		var _event$multiValueHead2, _event$headers;
		const headers = new Headers();
		for (const [k, values] of Object.entries((_event$multiValueHead2 = event.multiValueHeaders) !== null && _event$multiValueHead2 !== void 0 ? _event$multiValueHead2 : {})) if (values) values.forEach((v) => headers.append(k, v));
		for (const [key, value] of Object.entries((_event$headers = event.headers) !== null && _event$headers !== void 0 ? _event$headers : {})) if (value !== void 0 && !headers.has(key)) headers.append(key, value);
		return headers;
	},
	getMethod: (event) => event.httpMethod,
	toResult: async (response) => {
		const { headers, cookies } = getHeadersAndCookiesFromResponse(response);
		const result = (0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, cookies.length && { multiValueHeaders: { "set-cookie": cookies } }), {}, {
			statusCode: response.status,
			body: await response.text(),
			headers
		});
		return result;
	},
	toStream: async (response, stream) => {
		const { headers, cookies } = getHeadersAndCookiesFromResponse(response);
		const metadata = {
			statusCode: response.status,
			headers,
			cookies
		};
		const responseStream = awslambda.HttpResponseStream.from(stream, metadata);
		if (response.body) await (0, node_stream_promises.pipeline)(node_stream.Readable.fromWeb(response.body), responseStream);
		else responseStream.end();
	}
};
const v2Processor = {
	getTRPCPath: (event) => {
		const matches = event.routeKey.matchAll(new RegExp("\\{(.*?)\\}", "g"));
		for (const match of matches) {
			const group = match[1];
			if (group.includes("+") && event.pathParameters) {
				var _event$pathParameters2;
				return (_event$pathParameters2 = event.pathParameters[group.replace("+", "")]) !== null && _event$pathParameters2 !== void 0 ? _event$pathParameters2 : "";
			}
		}
		return event.rawPath.slice(1);
	},
	url(event) {
		return {
			hostname: event.requestContext.domainName,
			pathname: event.rawPath,
			search: event.rawQueryString && `?${event.rawQueryString}`
		};
	},
	getHeaders: (event) => {
		var _event$headers2;
		const headers = new Headers();
		for (const [key, value] of Object.entries((_event$headers2 = event.headers) !== null && _event$headers2 !== void 0 ? _event$headers2 : {})) if (value !== void 0) headers.append(key, value);
		if (event.cookies) headers.append("cookie", event.cookies.join("; "));
		return headers;
	},
	getMethod: (event) => event.requestContext.http.method,
	toResult: async (response) => {
		const { headers, cookies } = getHeadersAndCookiesFromResponse(response);
		const result = {
			cookies,
			statusCode: response.status,
			body: await response.text(),
			headers
		};
		return result;
	},
	toStream: async (response, stream) => {
		const { headers, cookies } = getHeadersAndCookiesFromResponse(response);
		const metadata = {
			statusCode: response.status,
			headers,
			cookies
		};
		const responseStream = awslambda.HttpResponseStream.from(stream, metadata);
		if (response.body) await (0, node_stream_promises.pipeline)(node_stream.Readable.fromWeb(response.body), responseStream);
		else responseStream.end();
	}
};
function getPlanner(event) {
	const version = determinePayloadFormat(event);
	let processor;
	switch (version) {
		case "1.0":
			processor = v1Processor;
			break;
		case "2.0":
			processor = v2Processor;
			break;
		default: throw new Error(`Unsupported version: ${version}`);
	}
	const urlParts = processor.url(event);
	const url = `https://${urlParts.hostname}${urlParts.pathname}${urlParts.search}`;
	const init = {
		headers: processor.getHeaders(event),
		method: processor.getMethod(event),
		duplex: "half"
	};
	if (event.body) init.body = event.isBase64Encoded ? Buffer.from(event.body, "base64") : event.body;
	const request = new Request(url, init);
	return {
		path: processor.getTRPCPath(event),
		request,
		toResult: processor.toResult,
		toStream: processor.toStream
	};
}

//#endregion
//#region src/adapters/aws-lambda/index.ts
var import_objectSpread2 = require_getErrorShape.__toESM(require_getErrorShape.require_objectSpread2(), 1);
function awsLambdaRequestHandler(opts) {
	return async (event, context) => {
		const planner = getPlanner(event);
		const createContext = async (innerOpts) => {
			var _opts$createContext;
			return await ((_opts$createContext = opts.createContext) === null || _opts$createContext === void 0 ? void 0 : _opts$createContext.call(opts, (0, import_objectSpread2.default)({
				event,
				context
			}, innerOpts)));
		};
		const response = await require_resolveResponse.resolveResponse((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, opts), {}, {
			createContext,
			req: planner.request,
			path: planner.path,
			error: null,
			onError(o) {
				var _opts$onError;
				opts === null || opts === void 0 || (_opts$onError = opts.onError) === null || _opts$onError === void 0 || _opts$onError.call(opts, (0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, o), {}, { req: event }));
			}
		}));
		return await planner.toResult(response);
	};
}
function awsLambdaStreamingRequestHandler(opts) {
	return async (event, responseStream, context) => {
		const planner = getPlanner(event);
		const createContext = async (innerOpts) => {
			var _opts$createContext2;
			return await ((_opts$createContext2 = opts.createContext) === null || _opts$createContext2 === void 0 ? void 0 : _opts$createContext2.call(opts, (0, import_objectSpread2.default)({
				event,
				context
			}, innerOpts)));
		};
		const response = await require_resolveResponse.resolveResponse((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, opts), {}, {
			createContext,
			req: planner.request,
			path: planner.path,
			error: null,
			onError(o) {
				var _opts$onError2;
				opts === null || opts === void 0 || (_opts$onError2 = opts.onError) === null || _opts$onError2 === void 0 || _opts$onError2.call(opts, (0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, o), {}, { req: event }));
			}
		}));
		await planner.toStream(response, responseStream);
	};
}

//#endregion
exports.awsLambdaRequestHandler = awsLambdaRequestHandler;
exports.awsLambdaStreamingRequestHandler = awsLambdaStreamingRequestHandler;