import { __toESM, getErrorShape, require_objectSpread2 } from "./getErrorShape-vC8mUXJD.mjs";
import { run } from "./codes-DagpWZLc.mjs";
import { TRPCError, getTRPCErrorFromUnknown, transformTRPCResponse } from "./tracked-D4V22yc5.mjs";
import { isAbortError, resolveResponse } from "./resolveResponse-C7AcnFLN.mjs";
import { IncomingMessage } from "node:http";

//#region src/adapters/node-http/incomingMessageToRequest.ts
function createBody(req, opts) {
	if ("body" in req) {
		if (req.body === void 0) return void 0;
		if (typeof req.body === "string") return req.body;
		if (req.body instanceof IncomingMessage) return req.body;
		return JSON.stringify(req.body);
	}
	let size = 0;
	let hasClosed = false;
	return new ReadableStream({
		start(controller) {
			const onData = (chunk) => {
				size += chunk.length;
				if (!opts.maxBodySize || size <= opts.maxBodySize) {
					controller.enqueue(new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength));
					return;
				}
				controller.error(new TRPCError({ code: "PAYLOAD_TOO_LARGE" }));
				hasClosed = true;
				req.off("data", onData);
				req.off("end", onEnd);
			};
			const onEnd = () => {
				if (hasClosed) return;
				hasClosed = true;
				req.off("data", onData);
				req.off("end", onEnd);
				controller.close();
			};
			req.on("data", onData);
			req.on("end", onEnd);
		},
		cancel() {
			req.destroy();
		}
	});
}
function createURL(req) {
	try {
		var _ref, _req$headers$host;
		const protocol = req.headers[":scheme"] && req.headers[":scheme"] === "https" || req.socket && "encrypted" in req.socket && req.socket.encrypted ? "https:" : "http:";
		const host = (_ref = (_req$headers$host = req.headers.host) !== null && _req$headers$host !== void 0 ? _req$headers$host : req.headers[":authority"]) !== null && _ref !== void 0 ? _ref : "localhost";
		return new URL(req.url, `${protocol}//${host}`);
	} catch (cause) {
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: "Invalid URL",
			cause
		});
	}
}
function createHeaders(incoming) {
	const headers = new Headers();
	for (const key in incoming) {
		const value = incoming[key];
		if (typeof key === "string" && key.startsWith(":")) continue;
		if (Array.isArray(value)) for (const item of value) headers.append(key, item);
		else if (value != null) headers.append(key, value);
	}
	return headers;
}
/**
* Convert an [`IncomingMessage`](https://nodejs.org/api/http.html#class-httpincomingmessage) to a [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request)
*/
function incomingMessageToRequest(req, res, opts) {
	const ac = new AbortController();
	const onAbort = () => {
		res.off("close", onAbort);
		req.off("aborted", onAbort);
		ac.abort();
	};
	res.once("close", onAbort);
	req.once("aborted", onAbort);
	const url = createURL(req);
	const init = {
		headers: createHeaders(req.headers),
		method: req.method,
		signal: ac.signal
	};
	if (req.method !== "GET" && req.method !== "HEAD") {
		init.body = createBody(req, opts);
		init.duplex = "half";
	}
	const request = new Request(url, init);
	return request;
}

//#endregion
//#region src/adapters/node-http/writeResponse.ts
async function writeResponseBodyChunk(res, chunk) {
	if (res.write(chunk) === false) await new Promise((resolve, reject) => {
		const onError = (err) => {
			reject(err);
			cleanup();
		};
		const onDrain = () => {
			resolve();
			cleanup();
		};
		const cleanup = () => {
			res.off("error", onError);
			res.off("drain", onDrain);
		};
		res.once("error", onError);
		res.once("drain", onDrain);
	});
}
/**
* @internal
*/
async function writeResponseBody(opts) {
	const { res } = opts;
	try {
		const writableStream = new WritableStream({ async write(chunk) {
			var _res$flush;
			await writeResponseBodyChunk(res, chunk);
			(_res$flush = res.flush) === null || _res$flush === void 0 || _res$flush.call(res);
		} });
		await opts.body.pipeTo(writableStream, { signal: opts.signal });
	} catch (err) {
		if (isAbortError(err)) return;
		throw err;
	}
}
/**
* @internal
*/
async function writeResponse(opts) {
	const { response, rawResponse } = opts;
	if (rawResponse.statusCode === 200) rawResponse.statusCode = response.status;
	for (const [key, value] of response.headers) rawResponse.setHeader(key, value);
	try {
		if (response.body) await writeResponseBody({
			res: rawResponse,
			signal: opts.request.signal,
			body: response.body
		});
	} catch (err) {
		if (!rawResponse.headersSent) rawResponse.statusCode = 500;
		throw err;
	} finally {
		rawResponse.end();
	}
}

//#endregion
//#region src/adapters/node-http/nodeHTTPRequestHandler.ts
var import_objectSpread2 = __toESM(require_objectSpread2(), 1);
/**
* @internal
*/
function internal_exceptionHandler(opts) {
	return (cause) => {
		var _opts$onError;
		const { res, req } = opts;
		const error = getTRPCErrorFromUnknown(cause);
		const shape = getErrorShape({
			config: opts.router._def._config,
			error,
			type: "unknown",
			path: void 0,
			input: void 0,
			ctx: void 0
		});
		(_opts$onError = opts.onError) === null || _opts$onError === void 0 || _opts$onError.call(opts, {
			req,
			error,
			type: "unknown",
			path: void 0,
			input: void 0,
			ctx: void 0
		});
		const transformed = transformTRPCResponse(opts.router._def._config, { error: shape });
		res.statusCode = shape.data.httpStatus;
		res.end(JSON.stringify(transformed));
	};
}
/**
* @remark the promise never rejects
*/
async function nodeHTTPRequestHandler(opts) {
	return new Promise((resolve) => {
		var _opts$middleware;
		const handleViaMiddleware = (_opts$middleware = opts.middleware) !== null && _opts$middleware !== void 0 ? _opts$middleware : (_req, _res, next) => next();
		opts.res.once("finish", () => {
			resolve();
		});
		return handleViaMiddleware(opts.req, opts.res, (err) => {
			run(async () => {
				var _opts$maxBodySize;
				const request = incomingMessageToRequest(opts.req, opts.res, { maxBodySize: (_opts$maxBodySize = opts.maxBodySize) !== null && _opts$maxBodySize !== void 0 ? _opts$maxBodySize : null });
				const createContext = async (innerOpts) => {
					var _opts$createContext;
					return await ((_opts$createContext = opts.createContext) === null || _opts$createContext === void 0 ? void 0 : _opts$createContext.call(opts, (0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, opts), innerOpts)));
				};
				const response = await resolveResponse((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, opts), {}, {
					req: request,
					error: err ? getTRPCErrorFromUnknown(err) : null,
					createContext,
					onError(o) {
						var _opts$onError2;
						opts === null || opts === void 0 || (_opts$onError2 = opts.onError) === null || _opts$onError2 === void 0 || _opts$onError2.call(opts, (0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, o), {}, { req: opts.req }));
					}
				}));
				await writeResponse({
					request,
					response,
					rawResponse: opts.res
				});
			}).catch(internal_exceptionHandler(opts));
		});
	});
}

//#endregion
export { createURL, incomingMessageToRequest, internal_exceptionHandler, nodeHTTPRequestHandler };
//# sourceMappingURL=node-http-pD5xpNfK.mjs.map