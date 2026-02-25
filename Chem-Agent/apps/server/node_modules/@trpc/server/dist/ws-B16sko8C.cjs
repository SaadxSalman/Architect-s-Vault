const require_getErrorShape = require('./getErrorShape-MR4DZeb7.cjs');
const require_codes = require('./codes-BfZsPdy-.cjs');
const require_tracked = require('./tracked-D4WGA_Z-.cjs');
const require_parseTRPCMessage = require('./parseTRPCMessage-7Ltmq-Fb.cjs');
const require_resolveResponse = require('./resolveResponse-ByfQ6olt.cjs');
const require_observable = require('./observable-B1Nk6r1H.cjs');
const require_node_http = require('./node-http-D0T_XJ9C.cjs');

//#region src/adapters/ws.ts
var import_objectSpread2 = require_getErrorShape.__toESM(require_getErrorShape.require_objectSpread2(), 1);
var import_usingCtx = require_getErrorShape.__toESM(require_resolveResponse.require_usingCtx(), 1);
/**
* Importing ws causes a build error
* @see https://github.com/trpc/trpc/pull/5279
*/
const WEBSOCKET_OPEN = 1;
function getWSConnectionHandler(opts) {
	const { createContext, router } = opts;
	const { transformer } = router._def._config;
	return (client, req) => {
		var _opts$keepAlive;
		const clientSubscriptions = /* @__PURE__ */ new Map();
		const abortController = new AbortController();
		if ((_opts$keepAlive = opts.keepAlive) === null || _opts$keepAlive === void 0 ? void 0 : _opts$keepAlive.enabled) {
			const { pingMs, pongWaitMs } = opts.keepAlive;
			handleKeepAlive(client, pingMs, pongWaitMs);
		}
		function respond(untransformedJSON) {
			client.send(JSON.stringify(require_tracked.transformTRPCResponse(router._def._config, untransformedJSON)));
		}
		async function createCtxPromise(getConnectionParams) {
			try {
				return await require_codes.run(async () => {
					ctx = await (createContext === null || createContext === void 0 ? void 0 : createContext({
						req,
						res: client,
						info: {
							connectionParams: getConnectionParams(),
							calls: [],
							isBatchCall: false,
							accept: null,
							type: "unknown",
							signal: abortController.signal,
							url: null
						}
					}));
					return {
						ok: true,
						value: ctx
					};
				});
			} catch (cause) {
				var _opts$onError, _globalThis$setImmedi;
				const error = require_tracked.getTRPCErrorFromUnknown(cause);
				(_opts$onError = opts.onError) === null || _opts$onError === void 0 || _opts$onError.call(opts, {
					error,
					path: void 0,
					type: "unknown",
					ctx,
					req,
					input: void 0
				});
				respond({
					id: null,
					error: require_getErrorShape.getErrorShape({
						config: router._def._config,
						error,
						type: "unknown",
						path: void 0,
						input: void 0,
						ctx
					})
				});
				((_globalThis$setImmedi = globalThis.setImmediate) !== null && _globalThis$setImmedi !== void 0 ? _globalThis$setImmedi : globalThis.setTimeout)(() => {
					client.close();
				});
				return {
					ok: false,
					error
				};
			}
		}
		let ctx = void 0;
		/**
		* promise for initializing the context
		*
		* - the context promise will be created immediately on connection if no connectionParams are expected
		* - if connection params are expected, they will be created once received
		*/
		let ctxPromise = require_node_http.createURL(req).searchParams.get("connectionParams") === "1" ? null : createCtxPromise(() => null);
		function handleRequest(msg) {
			const { id, jsonrpc } = msg;
			if (id === null) {
				var _opts$onError2;
				const error = require_tracked.getTRPCErrorFromUnknown(new require_tracked.TRPCError({
					code: "PARSE_ERROR",
					message: "`id` is required"
				}));
				(_opts$onError2 = opts.onError) === null || _opts$onError2 === void 0 || _opts$onError2.call(opts, {
					error,
					path: void 0,
					type: "unknown",
					ctx,
					req,
					input: void 0
				});
				respond({
					id,
					jsonrpc,
					error: require_getErrorShape.getErrorShape({
						config: router._def._config,
						error,
						type: "unknown",
						path: void 0,
						input: void 0,
						ctx
					})
				});
				return;
			}
			if (msg.method === "subscription.stop") {
				var _clientSubscriptions$;
				(_clientSubscriptions$ = clientSubscriptions.get(id)) === null || _clientSubscriptions$ === void 0 || _clientSubscriptions$.abort();
				return;
			}
			const { path, lastEventId } = msg.params;
			let { input } = msg.params;
			const type = msg.method;
			if (lastEventId !== void 0) if (require_codes.isObject(input)) input = (0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, input), {}, { lastEventId });
			else {
				var _input;
				(_input = input) !== null && _input !== void 0 || (input = { lastEventId });
			}
			require_codes.run(async () => {
				const res = await ctxPromise;
				if (!res.ok) throw res.error;
				const abortController$1 = new AbortController();
				const result = await require_tracked.callProcedure({
					router,
					path,
					getRawInput: async () => input,
					ctx,
					type,
					signal: abortController$1.signal
				});
				const isIterableResult = require_codes.isAsyncIterable(result) || require_observable.isObservable(result);
				if (type !== "subscription") {
					if (isIterableResult) throw new require_tracked.TRPCError({
						code: "UNSUPPORTED_MEDIA_TYPE",
						message: `Cannot return an async iterable or observable from a ${type} procedure with WebSockets`
					});
					respond({
						id,
						jsonrpc,
						result: {
							type: "data",
							data: result
						}
					});
					return;
				}
				if (!isIterableResult) throw new require_tracked.TRPCError({
					message: `Subscription ${path} did not return an observable or a AsyncGenerator`,
					code: "INTERNAL_SERVER_ERROR"
				});
				/* istanbul ignore next -- @preserve */
				if (client.readyState !== WEBSOCKET_OPEN) return;
				/* istanbul ignore next -- @preserve */
				if (clientSubscriptions.has(id)) throw new require_tracked.TRPCError({
					message: `Duplicate id ${id}`,
					code: "BAD_REQUEST"
				});
				const iterable = require_observable.isObservable(result) ? require_observable.observableToAsyncIterable(result, abortController$1.signal) : result;
				require_codes.run(async () => {
					try {
						var _usingCtx = (0, import_usingCtx.default)();
						const iterator = _usingCtx.a(require_resolveResponse.iteratorResource(iterable));
						const abortPromise = new Promise((resolve) => {
							abortController$1.signal.onabort = () => resolve("abort");
						});
						let next;
						let result$1;
						while (true) {
							next = await require_resolveResponse.Unpromise.race([iterator.next().catch(require_tracked.getTRPCErrorFromUnknown), abortPromise]);
							if (next === "abort") {
								var _iterator$return;
								await ((_iterator$return = iterator.return) === null || _iterator$return === void 0 ? void 0 : _iterator$return.call(iterator));
								break;
							}
							if (next instanceof Error) {
								var _opts$onError3;
								const error = require_tracked.getTRPCErrorFromUnknown(next);
								(_opts$onError3 = opts.onError) === null || _opts$onError3 === void 0 || _opts$onError3.call(opts, {
									error,
									path,
									type,
									ctx,
									req,
									input
								});
								respond({
									id,
									jsonrpc,
									error: require_getErrorShape.getErrorShape({
										config: router._def._config,
										error,
										type,
										path,
										input,
										ctx
									})
								});
								break;
							}
							if (next.done) break;
							result$1 = {
								type: "data",
								data: next.value
							};
							if (require_tracked.isTrackedEnvelope(next.value)) {
								const [id$1, data] = next.value;
								result$1.id = id$1;
								result$1.data = {
									id: id$1,
									data
								};
							}
							respond({
								id,
								jsonrpc,
								result: result$1
							});
							next = null;
							result$1 = null;
						}
						respond({
							id,
							jsonrpc,
							result: { type: "stopped" }
						});
						clientSubscriptions.delete(id);
					} catch (_) {
						_usingCtx.e = _;
					} finally {
						await _usingCtx.d();
					}
				}).catch((cause) => {
					var _opts$onError4;
					const error = require_tracked.getTRPCErrorFromUnknown(cause);
					(_opts$onError4 = opts.onError) === null || _opts$onError4 === void 0 || _opts$onError4.call(opts, {
						error,
						path,
						type,
						ctx,
						req,
						input
					});
					respond({
						id,
						jsonrpc,
						error: require_getErrorShape.getErrorShape({
							config: router._def._config,
							error,
							type,
							path,
							input,
							ctx
						})
					});
					abortController$1.abort();
				});
				clientSubscriptions.set(id, abortController$1);
				respond({
					id,
					jsonrpc,
					result: { type: "started" }
				});
			}).catch((cause) => {
				var _opts$onError5;
				const error = require_tracked.getTRPCErrorFromUnknown(cause);
				(_opts$onError5 = opts.onError) === null || _opts$onError5 === void 0 || _opts$onError5.call(opts, {
					error,
					path,
					type,
					ctx,
					req,
					input
				});
				respond({
					id,
					jsonrpc,
					error: require_getErrorShape.getErrorShape({
						config: router._def._config,
						error,
						type,
						path,
						input,
						ctx
					})
				});
			});
		}
		client.on("message", (rawData) => {
			const msgStr = rawData.toString();
			if (msgStr === "PONG") return;
			if (msgStr === "PING") {
				if (!opts.dangerouslyDisablePong) client.send("PONG");
				return;
			}
			if (!ctxPromise) {
				ctxPromise = createCtxPromise(() => {
					let msg;
					try {
						msg = JSON.parse(msgStr);
						if (!require_codes.isObject(msg)) throw new Error("Message was not an object");
					} catch (cause) {
						throw new require_tracked.TRPCError({
							code: "PARSE_ERROR",
							message: `Malformed TRPCConnectionParamsMessage`,
							cause
						});
					}
					const connectionParams = require_resolveResponse.parseConnectionParamsFromUnknown(msg.data);
					return connectionParams;
				});
				return;
			}
			const parsedMsgs = require_codes.run(() => {
				try {
					const msgJSON = JSON.parse(msgStr);
					const msgs = Array.isArray(msgJSON) ? msgJSON : [msgJSON];
					return msgs.map((raw) => require_parseTRPCMessage.parseTRPCMessage(raw, transformer));
				} catch (cause) {
					const error = new require_tracked.TRPCError({
						code: "PARSE_ERROR",
						cause
					});
					respond({
						id: null,
						error: require_getErrorShape.getErrorShape({
							config: router._def._config,
							error,
							type: "unknown",
							path: void 0,
							input: void 0,
							ctx
						})
					});
					return [];
				}
			});
			parsedMsgs.map(handleRequest);
		});
		client.on("error", (cause) => {
			var _opts$onError6;
			(_opts$onError6 = opts.onError) === null || _opts$onError6 === void 0 || _opts$onError6.call(opts, {
				ctx,
				error: require_tracked.getTRPCErrorFromUnknown(cause),
				input: void 0,
				path: void 0,
				type: "unknown",
				req
			});
		});
		client.once("close", () => {
			for (const sub of clientSubscriptions.values()) sub.abort();
			clientSubscriptions.clear();
			abortController.abort();
		});
	};
}
/**
* Handle WebSocket keep-alive messages
*/
function handleKeepAlive(client, pingMs = 3e4, pongWaitMs = 5e3) {
	let timeout = void 0;
	let ping = void 0;
	const schedulePing = () => {
		const scheduleTimeout = () => {
			timeout = setTimeout(() => {
				client.terminate();
			}, pongWaitMs);
		};
		ping = setTimeout(() => {
			client.send("PING");
			scheduleTimeout();
		}, pingMs);
	};
	const onMessage = () => {
		clearTimeout(ping);
		clearTimeout(timeout);
		schedulePing();
	};
	client.on("message", onMessage);
	client.on("close", () => {
		clearTimeout(ping);
		clearTimeout(timeout);
	});
	schedulePing();
}
function applyWSSHandler(opts) {
	const onConnection = getWSConnectionHandler(opts);
	opts.wss.on("connection", (client, req) => {
		var _req$url;
		if (opts.prefix && !((_req$url = req.url) === null || _req$url === void 0 ? void 0 : _req$url.startsWith(opts.prefix))) return;
		onConnection(client, req);
	});
	return { broadcastReconnectNotification: () => {
		const response = {
			id: null,
			method: "reconnect"
		};
		const data = JSON.stringify(response);
		for (const client of opts.wss.clients) if (client.readyState === WEBSOCKET_OPEN) client.send(data);
	} };
}

//#endregion
Object.defineProperty(exports, 'applyWSSHandler', {
  enumerable: true,
  get: function () {
    return applyWSSHandler;
  }
});
Object.defineProperty(exports, 'getWSConnectionHandler', {
  enumerable: true,
  get: function () {
    return getWSConnectionHandler;
  }
});
Object.defineProperty(exports, 'handleKeepAlive', {
  enumerable: true,
  get: function () {
    return handleKeepAlive;
  }
});