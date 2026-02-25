import { __commonJS, __toESM, require_defineProperty, require_objectSpread2 } from "./objectSpread2-BvkFp-_Y.mjs";
import { createChain, splitLink } from "./splitLink-B7Cuf2c_.mjs";
import { TRPCClientError, isTRPCClientError } from "./TRPCClientError-CjKyS10w.mjs";
import { fetchHTTPResponse, getBody, getFetch, getUrl, resolveHTTPLinkOptions } from "./httpUtils-Dv57hbOd.mjs";
import { httpLink, isFormData, isNonJsonSerializable, isOctetType } from "./httpLink-DCFpUmZF.mjs";
import { abortSignalToPromise, allAbortSignals, dataLoader, httpBatchLink, raceAbortSignals } from "./httpBatchLink-BOe5aCcR.mjs";
import { getTransformer } from "./unstable-internals-Bg7n9BBj.mjs";
import { loggerLink } from "./loggerLink-ineCN1PO.mjs";
import { createWSClient, resultOf, wsLink } from "./wsLink-CatceK3c.mjs";
import { behaviorSubject, observable, observableToPromise, share } from "@trpc/server/observable";
import { callProcedure, createFlatProxy, createRecursiveProxy, isAbortError, isAsyncIterable, iteratorResource, jsonlStreamConsumer, makeResource, retryableRpcCodes, run, sseStreamConsumer } from "@trpc/server/unstable-core-do-not-import";
import { getTRPCErrorFromUnknown, getTRPCErrorShape, isTrackedEnvelope } from "@trpc/server";
import { TRPC_ERROR_CODES_BY_KEY } from "@trpc/server/rpc";

//#region src/internals/TRPCUntypedClient.ts
var import_defineProperty = __toESM(require_defineProperty(), 1);
var import_objectSpread2$4 = __toESM(require_objectSpread2(), 1);
var TRPCUntypedClient = class {
	constructor(opts) {
		(0, import_defineProperty.default)(this, "links", void 0);
		(0, import_defineProperty.default)(this, "runtime", void 0);
		(0, import_defineProperty.default)(this, "requestId", void 0);
		this.requestId = 0;
		this.runtime = {};
		this.links = opts.links.map((link) => link(this.runtime));
	}
	$request(opts) {
		var _opts$context;
		const chain$ = createChain({
			links: this.links,
			op: (0, import_objectSpread2$4.default)((0, import_objectSpread2$4.default)({}, opts), {}, {
				context: (_opts$context = opts.context) !== null && _opts$context !== void 0 ? _opts$context : {},
				id: ++this.requestId
			})
		});
		return chain$.pipe(share());
	}
	async requestAsPromise(opts) {
		var _this = this;
		try {
			const req$ = _this.$request(opts);
			const envelope = await observableToPromise(req$);
			const data = envelope.result.data;
			return data;
		} catch (err) {
			throw TRPCClientError.from(err);
		}
	}
	query(path, input, opts) {
		return this.requestAsPromise({
			type: "query",
			path,
			input,
			context: opts === null || opts === void 0 ? void 0 : opts.context,
			signal: opts === null || opts === void 0 ? void 0 : opts.signal
		});
	}
	mutation(path, input, opts) {
		return this.requestAsPromise({
			type: "mutation",
			path,
			input,
			context: opts === null || opts === void 0 ? void 0 : opts.context,
			signal: opts === null || opts === void 0 ? void 0 : opts.signal
		});
	}
	subscription(path, input, opts) {
		const observable$ = this.$request({
			type: "subscription",
			path,
			input,
			context: opts.context,
			signal: opts.signal
		});
		return observable$.subscribe({
			next(envelope) {
				switch (envelope.result.type) {
					case "state": {
						var _opts$onConnectionSta;
						(_opts$onConnectionSta = opts.onConnectionStateChange) === null || _opts$onConnectionSta === void 0 || _opts$onConnectionSta.call(opts, envelope.result);
						break;
					}
					case "started": {
						var _opts$onStarted;
						(_opts$onStarted = opts.onStarted) === null || _opts$onStarted === void 0 || _opts$onStarted.call(opts, { context: envelope.context });
						break;
					}
					case "stopped": {
						var _opts$onStopped;
						(_opts$onStopped = opts.onStopped) === null || _opts$onStopped === void 0 || _opts$onStopped.call(opts);
						break;
					}
					case "data":
					case void 0: {
						var _opts$onData;
						(_opts$onData = opts.onData) === null || _opts$onData === void 0 || _opts$onData.call(opts, envelope.result.data);
						break;
					}
				}
			},
			error(err) {
				var _opts$onError;
				(_opts$onError = opts.onError) === null || _opts$onError === void 0 || _opts$onError.call(opts, err);
			},
			complete() {
				var _opts$onComplete;
				(_opts$onComplete = opts.onComplete) === null || _opts$onComplete === void 0 || _opts$onComplete.call(opts);
			}
		});
	}
};

//#endregion
//#region src/createTRPCUntypedClient.ts
function createTRPCUntypedClient(opts) {
	return new TRPCUntypedClient(opts);
}

//#endregion
//#region src/createTRPCClient.ts
const untypedClientSymbol = Symbol.for("trpc_untypedClient");
const clientCallTypeMap = {
	query: "query",
	mutate: "mutation",
	subscribe: "subscription"
};
/** @internal */
const clientCallTypeToProcedureType = (clientCallType) => {
	return clientCallTypeMap[clientCallType];
};
/**
* @internal
*/
function createTRPCClientProxy(client) {
	const proxy = createRecursiveProxy(({ path, args }) => {
		const pathCopy = [...path];
		const procedureType = clientCallTypeToProcedureType(pathCopy.pop());
		const fullPath = pathCopy.join(".");
		return client[procedureType](fullPath, ...args);
	});
	return createFlatProxy((key) => {
		if (key === untypedClientSymbol) return client;
		return proxy[key];
	});
}
function createTRPCClient(opts) {
	const client = new TRPCUntypedClient(opts);
	const proxy = createTRPCClientProxy(client);
	return proxy;
}
/**
* Get an untyped client from a proxy client
* @internal
*/
function getUntypedClient(client) {
	return client[untypedClientSymbol];
}

//#endregion
//#region src/links/httpBatchStreamLink.ts
var import_objectSpread2$3 = __toESM(require_objectSpread2(), 1);
/**
* @see https://trpc.io/docs/client/links/httpBatchStreamLink
*/
function httpBatchStreamLink(opts) {
	var _opts$maxURLLength, _opts$maxItems;
	const resolvedOpts = resolveHTTPLinkOptions(opts);
	const maxURLLength = (_opts$maxURLLength = opts.maxURLLength) !== null && _opts$maxURLLength !== void 0 ? _opts$maxURLLength : Infinity;
	const maxItems = (_opts$maxItems = opts.maxItems) !== null && _opts$maxItems !== void 0 ? _opts$maxItems : Infinity;
	return () => {
		const batchLoader = (type) => {
			return {
				validate(batchOps) {
					if (maxURLLength === Infinity && maxItems === Infinity) return true;
					if (batchOps.length > maxItems) return false;
					const path = batchOps.map((op) => op.path).join(",");
					const inputs = batchOps.map((op) => op.input);
					const url = getUrl((0, import_objectSpread2$3.default)((0, import_objectSpread2$3.default)({}, resolvedOpts), {}, {
						type,
						path,
						inputs,
						signal: null
					}));
					return url.length <= maxURLLength;
				},
				async fetch(batchOps) {
					const path = batchOps.map((op) => op.path).join(",");
					const inputs = batchOps.map((op) => op.input);
					const batchSignals = allAbortSignals(...batchOps.map((op) => op.signal));
					const abortController = new AbortController();
					const responsePromise = fetchHTTPResponse((0, import_objectSpread2$3.default)((0, import_objectSpread2$3.default)({}, resolvedOpts), {}, {
						signal: raceAbortSignals(batchSignals, abortController.signal),
						type,
						contentTypeHeader: "application/json",
						trpcAcceptHeader: "application/jsonl",
						getUrl,
						getBody,
						inputs,
						path,
						headers() {
							if (!opts.headers) return {};
							if (typeof opts.headers === "function") return opts.headers({ opList: batchOps });
							return opts.headers;
						}
					}));
					const res = await responsePromise;
					const [head] = await jsonlStreamConsumer({
						from: res.body,
						deserialize: (data) => resolvedOpts.transformer.output.deserialize(data),
						formatError(opts$1) {
							const error = opts$1.error;
							return TRPCClientError.from({ error });
						},
						abortController
					});
					const promises = Object.keys(batchOps).map(async (key) => {
						let json = await Promise.resolve(head[key]);
						if ("result" in json) {
							/**
							* Not very pretty, but we need to unwrap nested data as promises
							* Our stream producer will only resolve top-level async values or async values that are directly nested in another async value
							*/
							const result = await Promise.resolve(json.result);
							json = { result: { data: await Promise.resolve(result.data) } };
						}
						return {
							json,
							meta: { response: res }
						};
					});
					return promises;
				}
			};
		};
		const query = dataLoader(batchLoader("query"));
		const mutation = dataLoader(batchLoader("mutation"));
		const loaders = {
			query,
			mutation
		};
		return ({ op }) => {
			return observable((observer) => {
				/* istanbul ignore if -- @preserve */
				if (op.type === "subscription") throw new Error("Subscriptions are unsupported by `httpBatchStreamLink` - use `httpSubscriptionLink` or `wsLink`");
				const loader = loaders[op.type];
				const promise = loader.load(op);
				let _res = void 0;
				promise.then((res) => {
					_res = res;
					if ("error" in res.json) {
						observer.error(TRPCClientError.from(res.json, { meta: res.meta }));
						return;
					} else if ("result" in res.json) {
						observer.next({
							context: res.meta,
							result: res.json.result
						});
						observer.complete();
						return;
					}
					observer.complete();
				}).catch((err) => {
					observer.error(TRPCClientError.from(err, { meta: _res === null || _res === void 0 ? void 0 : _res.meta }));
				});
				return () => {};
			});
		};
	};
}
/**
* @deprecated use {@link httpBatchStreamLink} instead
*/
const unstable_httpBatchStreamLink = httpBatchStreamLink;

//#endregion
//#region src/internals/inputWithTrackedEventId.ts
var import_objectSpread2$2 = __toESM(require_objectSpread2(), 1);
function inputWithTrackedEventId(input, lastEventId) {
	if (!lastEventId) return input;
	if (input != null && typeof input !== "object") return input;
	return (0, import_objectSpread2$2.default)((0, import_objectSpread2$2.default)({}, input !== null && input !== void 0 ? input : {}), {}, { lastEventId });
}

//#endregion
//#region ../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/asyncIterator.js
var require_asyncIterator = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/asyncIterator.js"(exports, module) {
	function _asyncIterator$1(r) {
		var n, t, o, e = 2;
		for ("undefined" != typeof Symbol && (t = Symbol.asyncIterator, o = Symbol.iterator); e--;) {
			if (t && null != (n = r[t])) return n.call(r);
			if (o && null != (n = r[o])) return new AsyncFromSyncIterator(n.call(r));
			t = "@@asyncIterator", o = "@@iterator";
		}
		throw new TypeError("Object is not async iterable");
	}
	function AsyncFromSyncIterator(r) {
		function AsyncFromSyncIteratorContinuation(r$1) {
			if (Object(r$1) !== r$1) return Promise.reject(new TypeError(r$1 + " is not an object."));
			var n = r$1.done;
			return Promise.resolve(r$1.value).then(function(r$2) {
				return {
					value: r$2,
					done: n
				};
			});
		}
		return AsyncFromSyncIterator = function AsyncFromSyncIterator$1(r$1) {
			this.s = r$1, this.n = r$1.next;
		}, AsyncFromSyncIterator.prototype = {
			s: null,
			n: null,
			next: function next() {
				return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments));
			},
			"return": function _return(r$1) {
				var n = this.s["return"];
				return void 0 === n ? Promise.resolve({
					value: r$1,
					done: !0
				}) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments));
			},
			"throw": function _throw(r$1) {
				var n = this.s["return"];
				return void 0 === n ? Promise.reject(r$1) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments));
			}
		}, new AsyncFromSyncIterator(r);
	}
	module.exports = _asyncIterator$1, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });

//#endregion
//#region src/links/httpSubscriptionLink.ts
var import_asyncIterator = __toESM(require_asyncIterator(), 1);
async function urlWithConnectionParams(opts) {
	let url = await resultOf(opts.url);
	if (opts.connectionParams) {
		const params = await resultOf(opts.connectionParams);
		const prefix = url.includes("?") ? "&" : "?";
		url += prefix + "connectionParams=" + encodeURIComponent(JSON.stringify(params));
	}
	return url;
}
/**
* @see https://trpc.io/docs/client/links/httpSubscriptionLink
*/
function httpSubscriptionLink(opts) {
	const transformer = getTransformer(opts.transformer);
	return () => {
		return ({ op }) => {
			return observable((observer) => {
				var _opts$EventSource;
				const { type, path, input } = op;
				/* istanbul ignore if -- @preserve */
				if (type !== "subscription") throw new Error("httpSubscriptionLink only supports subscriptions");
				let lastEventId = void 0;
				const ac = new AbortController();
				const signal = raceAbortSignals(op.signal, ac.signal);
				const eventSourceStream = sseStreamConsumer({
					url: async () => getUrl({
						transformer,
						url: await urlWithConnectionParams(opts),
						input: inputWithTrackedEventId(input, lastEventId),
						path,
						type,
						signal: null
					}),
					init: () => resultOf(opts.eventSourceOptions, { op }),
					signal,
					deserialize: (data) => transformer.output.deserialize(data),
					EventSource: (_opts$EventSource = opts.EventSource) !== null && _opts$EventSource !== void 0 ? _opts$EventSource : globalThis.EventSource
				});
				const connectionState = behaviorSubject({
					type: "state",
					state: "connecting",
					error: null
				});
				const connectionSub = connectionState.subscribe({ next(state) {
					observer.next({ result: state });
				} });
				run(async () => {
					var _iteratorAbruptCompletion = false;
					var _didIteratorError = false;
					var _iteratorError;
					try {
						for (var _iterator = (0, import_asyncIterator.default)(eventSourceStream), _step; _iteratorAbruptCompletion = !(_step = await _iterator.next()).done; _iteratorAbruptCompletion = false) {
							const chunk = _step.value;
							switch (chunk.type) {
								case "ping": break;
								case "data":
									const chunkData = chunk.data;
									let result;
									if (chunkData.id) {
										lastEventId = chunkData.id;
										result = {
											id: chunkData.id,
											data: chunkData
										};
									} else result = { data: chunkData.data };
									observer.next({
										result,
										context: { eventSource: chunk.eventSource }
									});
									break;
								case "connected": {
									observer.next({
										result: { type: "started" },
										context: { eventSource: chunk.eventSource }
									});
									connectionState.next({
										type: "state",
										state: "pending",
										error: null
									});
									break;
								}
								case "serialized-error": {
									const error = TRPCClientError.from({ error: chunk.error });
									if (retryableRpcCodes.includes(chunk.error.code)) {
										connectionState.next({
											type: "state",
											state: "connecting",
											error
										});
										break;
									}
									throw error;
								}
								case "connecting": {
									const lastState = connectionState.get();
									const error = chunk.event && TRPCClientError.from(chunk.event);
									if (!error && lastState.state === "connecting") break;
									connectionState.next({
										type: "state",
										state: "connecting",
										error
									});
									break;
								}
								case "timeout": connectionState.next({
									type: "state",
									state: "connecting",
									error: new TRPCClientError(`Timeout of ${chunk.ms}ms reached while waiting for a response`)
								});
							}
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (_iteratorAbruptCompletion && _iterator.return != null) await _iterator.return();
						} finally {
							if (_didIteratorError) throw _iteratorError;
						}
					}
					observer.next({ result: { type: "stopped" } });
					connectionState.next({
						type: "state",
						state: "idle",
						error: null
					});
					observer.complete();
				}).catch((error) => {
					observer.error(TRPCClientError.from(error));
				});
				return () => {
					observer.complete();
					ac.abort();
					connectionSub.unsubscribe();
				};
			});
		};
	};
}
/**
* @deprecated use {@link httpSubscriptionLink} instead
*/
const unstable_httpSubscriptionLink = httpSubscriptionLink;

//#endregion
//#region src/links/retryLink.ts
var import_objectSpread2$1 = __toESM(require_objectSpread2(), 1);
/**
* @see https://trpc.io/docs/v11/client/links/retryLink
*/
function retryLink(opts) {
	return () => {
		return (callOpts) => {
			return observable((observer) => {
				let next$;
				let callNextTimeout = void 0;
				let lastEventId = void 0;
				attempt(1);
				function opWithLastEventId() {
					const op = callOpts.op;
					if (!lastEventId) return op;
					return (0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, op), {}, { input: inputWithTrackedEventId(op.input, lastEventId) });
				}
				function attempt(attempts) {
					const op = opWithLastEventId();
					next$ = callOpts.next(op).subscribe({
						error(error) {
							var _opts$retryDelayMs, _opts$retryDelayMs2;
							const shouldRetry = opts.retry({
								op,
								attempts,
								error
							});
							if (!shouldRetry) {
								observer.error(error);
								return;
							}
							const delayMs = (_opts$retryDelayMs = (_opts$retryDelayMs2 = opts.retryDelayMs) === null || _opts$retryDelayMs2 === void 0 ? void 0 : _opts$retryDelayMs2.call(opts, attempts)) !== null && _opts$retryDelayMs !== void 0 ? _opts$retryDelayMs : 0;
							if (delayMs <= 0) {
								attempt(attempts + 1);
								return;
							}
							callNextTimeout = setTimeout(() => attempt(attempts + 1), delayMs);
						},
						next(envelope) {
							if ((!envelope.result.type || envelope.result.type === "data") && envelope.result.id) lastEventId = envelope.result.id;
							observer.next(envelope);
						},
						complete() {
							observer.complete();
						}
					});
				}
				return () => {
					next$.unsubscribe();
					clearTimeout(callNextTimeout);
				};
			});
		};
	};
}

//#endregion
//#region ../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/usingCtx.js
var require_usingCtx = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/usingCtx.js"(exports, module) {
	function _usingCtx() {
		var r = "function" == typeof SuppressedError ? SuppressedError : function(r$1, e$1) {
			var n$1 = Error();
			return n$1.name = "SuppressedError", n$1.error = r$1, n$1.suppressed = e$1, n$1;
		}, e = {}, n = [];
		function using(r$1, e$1) {
			if (null != e$1) {
				if (Object(e$1) !== e$1) throw new TypeError("using declarations can only be used with objects, functions, null, or undefined.");
				if (r$1) var o = e$1[Symbol.asyncDispose || Symbol["for"]("Symbol.asyncDispose")];
				if (void 0 === o && (o = e$1[Symbol.dispose || Symbol["for"]("Symbol.dispose")], r$1)) var t = o;
				if ("function" != typeof o) throw new TypeError("Object is not disposable.");
				t && (o = function o$1() {
					try {
						t.call(e$1);
					} catch (r$2) {
						return Promise.reject(r$2);
					}
				}), n.push({
					v: e$1,
					d: o,
					a: r$1
				});
			} else r$1 && n.push({
				d: e$1,
				a: r$1
			});
			return e$1;
		}
		return {
			e,
			u: using.bind(null, !1),
			a: using.bind(null, !0),
			d: function d() {
				var o, t = this.e, s = 0;
				function next() {
					for (; o = n.pop();) try {
						if (!o.a && 1 === s) return s = 0, n.push(o), Promise.resolve().then(next);
						if (o.d) {
							var r$1 = o.d.call(o.v);
							if (o.a) return s |= 2, Promise.resolve(r$1).then(next, err);
						} else s |= 1;
					} catch (r$2) {
						return err(r$2);
					}
					if (1 === s) return t !== e ? Promise.reject(t) : Promise.resolve();
					if (t !== e) throw t;
				}
				function err(n$1) {
					return t = t !== e ? new r(n$1, t) : n$1, next();
				}
				return next();
			}
		};
	}
	module.exports = _usingCtx, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });

//#endregion
//#region ../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/OverloadYield.js
var require_OverloadYield = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/OverloadYield.js"(exports, module) {
	function _OverloadYield(e, d) {
		this.v = e, this.k = d;
	}
	module.exports = _OverloadYield, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });

//#endregion
//#region ../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/awaitAsyncGenerator.js
var require_awaitAsyncGenerator = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/awaitAsyncGenerator.js"(exports, module) {
	var OverloadYield$1 = require_OverloadYield();
	function _awaitAsyncGenerator$1(e) {
		return new OverloadYield$1(e, 0);
	}
	module.exports = _awaitAsyncGenerator$1, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });

//#endregion
//#region ../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/wrapAsyncGenerator.js
var require_wrapAsyncGenerator = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/wrapAsyncGenerator.js"(exports, module) {
	var OverloadYield = require_OverloadYield();
	function _wrapAsyncGenerator$1(e) {
		return function() {
			return new AsyncGenerator(e.apply(this, arguments));
		};
	}
	function AsyncGenerator(e) {
		var r, t;
		function resume(r$1, t$1) {
			try {
				var n = e[r$1](t$1), o = n.value, u = o instanceof OverloadYield;
				Promise.resolve(u ? o.v : o).then(function(t$2) {
					if (u) {
						var i = "return" === r$1 ? "return" : "next";
						if (!o.k || t$2.done) return resume(i, t$2);
						t$2 = e[i](t$2).value;
					}
					settle(n.done ? "return" : "normal", t$2);
				}, function(e$1) {
					resume("throw", e$1);
				});
			} catch (e$1) {
				settle("throw", e$1);
			}
		}
		function settle(e$1, n) {
			switch (e$1) {
				case "return":
					r.resolve({
						value: n,
						done: !0
					});
					break;
				case "throw":
					r.reject(n);
					break;
				default: r.resolve({
					value: n,
					done: !1
				});
			}
			(r = r.next) ? resume(r.key, r.arg) : t = null;
		}
		this._invoke = function(e$1, n) {
			return new Promise(function(o, u) {
				var i = {
					key: e$1,
					arg: n,
					resolve: o,
					reject: u,
					next: null
				};
				t ? t = t.next = i : (r = t = i, resume(e$1, n));
			});
		}, "function" != typeof e["return"] && (this["return"] = void 0);
	}
	AsyncGenerator.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function() {
		return this;
	}, AsyncGenerator.prototype.next = function(e) {
		return this._invoke("next", e);
	}, AsyncGenerator.prototype["throw"] = function(e) {
		return this._invoke("throw", e);
	}, AsyncGenerator.prototype["return"] = function(e) {
		return this._invoke("return", e);
	};
	module.exports = _wrapAsyncGenerator$1, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });

//#endregion
//#region src/links/localLink.ts
var import_usingCtx = __toESM(require_usingCtx(), 1);
var import_awaitAsyncGenerator = __toESM(require_awaitAsyncGenerator(), 1);
var import_wrapAsyncGenerator = __toESM(require_wrapAsyncGenerator(), 1);
var import_objectSpread2 = __toESM(require_objectSpread2(), 1);
/**
* localLink is a terminating link that allows you to make tRPC procedure calls directly in your application without going through HTTP.
*
* @see https://trpc.io/docs/links/localLink
*/
function unstable_localLink(opts) {
	const transformer = getTransformer(opts.transformer);
	const transformChunk = (chunk) => {
		if (opts.transformer) return chunk;
		if (chunk === void 0) return chunk;
		const serialized = JSON.stringify(transformer.input.serialize(chunk));
		const deserialized = JSON.parse(transformer.output.deserialize(serialized));
		return deserialized;
	};
	return () => ({ op }) => observable((observer) => {
		let ctx = void 0;
		const ac = new AbortController();
		const signal = raceAbortSignals(op.signal, ac.signal);
		const signalPromise = abortSignalToPromise(signal);
		signalPromise.catch(() => {});
		let input = op.input;
		async function runProcedure(newInput) {
			input = newInput;
			ctx = await opts.createContext();
			return callProcedure({
				router: opts.router,
				path: op.path,
				getRawInput: async () => newInput,
				ctx,
				type: op.type,
				signal
			});
		}
		function onErrorCallback(cause) {
			var _opts$onError;
			if (isAbortError(cause)) return;
			(_opts$onError = opts.onError) === null || _opts$onError === void 0 || _opts$onError.call(opts, {
				error: getTRPCErrorFromUnknown(cause),
				type: op.type,
				path: op.path,
				input,
				ctx
			});
		}
		function coerceToTRPCClientError(cause) {
			if (isTRPCClientError(cause)) return cause;
			const error = getTRPCErrorFromUnknown(cause);
			const shape = getTRPCErrorShape({
				config: opts.router._def._config,
				ctx,
				error,
				input,
				path: op.path,
				type: op.type
			});
			return TRPCClientError.from({ error: transformChunk(shape) });
		}
		run(async () => {
			switch (op.type) {
				case "query":
				case "mutation": {
					const result = await runProcedure(op.input);
					if (!isAsyncIterable(result)) {
						observer.next({ result: { data: transformChunk(result) } });
						observer.complete();
						break;
					}
					observer.next({ result: { data: (0, import_wrapAsyncGenerator.default)(function* () {
						try {
							var _usingCtx$1 = (0, import_usingCtx.default)();
							const iterator = _usingCtx$1.a(iteratorResource(result));
							const _finally = _usingCtx$1.u(makeResource({}, () => {
								observer.complete();
							}));
							try {
								while (true) {
									const res = yield (0, import_awaitAsyncGenerator.default)(Promise.race([iterator.next(), signalPromise]));
									if (res.done) return transformChunk(res.value);
									yield transformChunk(res.value);
								}
							} catch (cause) {
								onErrorCallback(cause);
								throw coerceToTRPCClientError(cause);
							}
						} catch (_) {
							_usingCtx$1.e = _;
						} finally {
							yield (0, import_awaitAsyncGenerator.default)(_usingCtx$1.d());
						}
					})() } });
					break;
				}
				case "subscription": try {
					var _usingCtx3 = (0, import_usingCtx.default)();
					const connectionState = behaviorSubject({
						type: "state",
						state: "connecting",
						error: null
					});
					const connectionSub = connectionState.subscribe({ next(state) {
						observer.next({ result: state });
					} });
					let lastEventId = void 0;
					const _finally = _usingCtx3.u(makeResource({}, async () => {
						observer.complete();
						connectionState.next({
							type: "state",
							state: "idle",
							error: null
						});
						connectionSub.unsubscribe();
					}));
					while (true) try {
						var _usingCtx4 = (0, import_usingCtx.default)();
						const result = await runProcedure(inputWithTrackedEventId(op.input, lastEventId));
						if (!isAsyncIterable(result)) throw new Error("Expected an async iterable");
						const iterator = _usingCtx4.a(iteratorResource(result));
						observer.next({ result: { type: "started" } });
						connectionState.next({
							type: "state",
							state: "pending",
							error: null
						});
						while (true) {
							let res;
							try {
								res = await Promise.race([iterator.next(), signalPromise]);
							} catch (cause) {
								if (isAbortError(cause)) return;
								const error = getTRPCErrorFromUnknown(cause);
								if (!retryableRpcCodes.includes(TRPC_ERROR_CODES_BY_KEY[error.code])) throw coerceToTRPCClientError(error);
								onErrorCallback(error);
								connectionState.next({
									type: "state",
									state: "connecting",
									error: coerceToTRPCClientError(error)
								});
								break;
							}
							if (res.done) return;
							let chunk;
							if (isTrackedEnvelope(res.value)) {
								lastEventId = res.value[0];
								chunk = {
									id: res.value[0],
									data: {
										id: res.value[0],
										data: res.value[1]
									}
								};
							} else chunk = { data: res.value };
							observer.next({ result: (0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, chunk), {}, { data: transformChunk(chunk.data) }) });
						}
					} catch (_) {
						_usingCtx4.e = _;
					} finally {
						await _usingCtx4.d();
					}
					break;
				} catch (_) {
					_usingCtx3.e = _;
				} finally {
					_usingCtx3.d();
				}
			}
		}).catch((cause) => {
			onErrorCallback(cause);
			observer.error(coerceToTRPCClientError(cause));
		});
		return () => {
			ac.abort();
		};
	});
}
/**
* @deprecated Renamed to `unstable_localLink`. This alias will be removed in a future major release.
*/
const experimental_localLink = unstable_localLink;

//#endregion
export { TRPCClientError, TRPCUntypedClient, clientCallTypeToProcedureType, createTRPCClient, createTRPCClientProxy, createTRPCClient as createTRPCProxyClient, createTRPCUntypedClient, createWSClient, experimental_localLink, getFetch, getUntypedClient, httpBatchLink, httpBatchStreamLink, httpLink, httpSubscriptionLink, isFormData, isNonJsonSerializable, isOctetType, isTRPCClientError, loggerLink, retryLink, splitLink, unstable_httpBatchStreamLink, unstable_httpSubscriptionLink, unstable_localLink, wsLink };
//# sourceMappingURL=index.mjs.map