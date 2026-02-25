const require_chunk = require('./chunk-DWy1uDak.cjs');
const require_objectSpread2$1 = require('./objectSpread2-Bsvh_OqM.cjs');
const require_TRPCClientError = require('./TRPCClientError-Dey88Uiy.cjs');
const require_unstable_internals = require('./unstable-internals-M84gUQCV.cjs');
const __trpc_server_observable = require_chunk.__toESM(require("@trpc/server/observable"));
const __trpc_server_unstable_core_do_not_import = require_chunk.__toESM(require("@trpc/server/unstable-core-do-not-import"));

//#region src/links/wsLink/wsClient/options.ts
const lazyDefaults = {
	enabled: false,
	closeMs: 0
};
const keepAliveDefaults = {
	enabled: false,
	pongTimeoutMs: 1e3,
	intervalMs: 5e3
};
/**
* Calculates a delay for exponential backoff based on the retry attempt index.
* The delay starts at 0 for the first attempt and doubles for each subsequent attempt,
* capped at 30 seconds.
*/
const exponentialBackoff = (attemptIndex) => {
	return attemptIndex === 0 ? 0 : Math.min(1e3 * 2 ** attemptIndex, 3e4);
};

//#endregion
//#region src/links/internals/urlWithConnectionParams.ts
/**
* Get the result of a value or function that returns a value
* It also optionally accepts typesafe arguments for the function
*/
const resultOf = (value, ...args) => {
	return typeof value === "function" ? value(...args) : value;
};

//#endregion
//#region src/links/wsLink/wsClient/utils.ts
var import_defineProperty$3 = require_chunk.__toESM(require_objectSpread2$1.require_defineProperty(), 1);
var TRPCWebSocketClosedError = class TRPCWebSocketClosedError extends Error {
	constructor(opts) {
		super(opts.message, { cause: opts.cause });
		this.name = "TRPCWebSocketClosedError";
		Object.setPrototypeOf(this, TRPCWebSocketClosedError.prototype);
	}
};
/**
* Utility class for managing a timeout that can be started, stopped, and reset.
* Useful for scenarios where the timeout duration is reset dynamically based on events.
*/
var ResettableTimeout = class {
	constructor(onTimeout, timeoutMs) {
		this.onTimeout = onTimeout;
		this.timeoutMs = timeoutMs;
		(0, import_defineProperty$3.default)(this, "timeout", void 0);
	}
	/**
	* Resets the current timeout, restarting it with the same duration.
	* Does nothing if no timeout is active.
	*/
	reset() {
		if (!this.timeout) return;
		clearTimeout(this.timeout);
		this.timeout = setTimeout(this.onTimeout, this.timeoutMs);
	}
	start() {
		clearTimeout(this.timeout);
		this.timeout = setTimeout(this.onTimeout, this.timeoutMs);
	}
	stop() {
		clearTimeout(this.timeout);
		this.timeout = void 0;
	}
};
function withResolvers() {
	let resolve;
	let reject;
	const promise = new Promise((res, rej) => {
		resolve = res;
		reject = rej;
	});
	return {
		promise,
		resolve,
		reject
	};
}
/**
* Resolves a WebSocket URL and optionally appends connection parameters.
*
* If connectionParams are provided, appends 'connectionParams=1' query parameter.
*/
async function prepareUrl(urlOptions) {
	const url = await resultOf(urlOptions.url);
	if (!urlOptions.connectionParams) return url;
	const prefix = url.includes("?") ? "&" : "?";
	const connectionParams = `${prefix}connectionParams=1`;
	return url + connectionParams;
}
async function buildConnectionMessage(connectionParams) {
	const message = {
		method: "connectionParams",
		data: await resultOf(connectionParams)
	};
	return JSON.stringify(message);
}

//#endregion
//#region src/links/wsLink/wsClient/requestManager.ts
var import_defineProperty$2 = require_chunk.__toESM(require_objectSpread2$1.require_defineProperty(), 1);
/**
* Manages WebSocket requests, tracking their lifecycle and providing utility methods
* for handling outgoing and pending requests.
*
* - **Outgoing requests**: Requests that are queued and waiting to be sent.
* - **Pending requests**: Requests that have been sent and are in flight awaiting a response.
*   For subscriptions, multiple responses may be received until the subscription is closed.
*/
var RequestManager = class {
	constructor() {
		(0, import_defineProperty$2.default)(this, "outgoingRequests", new Array());
		(0, import_defineProperty$2.default)(this, "pendingRequests", {});
	}
	/**
	* Registers a new request by adding it to the outgoing queue and setting up
	* callbacks for lifecycle events such as completion or error.
	*
	* @param message - The outgoing message to be sent.
	* @param callbacks - Callback functions to observe the request's state.
	* @returns A cleanup function to manually remove the request.
	*/
	register(message, callbacks) {
		const { promise: end, resolve } = withResolvers();
		this.outgoingRequests.push({
			id: String(message.id),
			message,
			end,
			callbacks: {
				next: callbacks.next,
				complete: () => {
					callbacks.complete();
					resolve();
				},
				error: (e) => {
					callbacks.error(e);
					resolve();
				}
			}
		});
		return () => {
			this.delete(message.id);
			callbacks.complete();
			resolve();
		};
	}
	/**
	* Deletes a request from both the outgoing and pending collections, if it exists.
	*/
	delete(messageId) {
		if (messageId === null) return;
		this.outgoingRequests = this.outgoingRequests.filter(({ id }) => id !== String(messageId));
		delete this.pendingRequests[String(messageId)];
	}
	/**
	* Moves all outgoing requests to the pending state and clears the outgoing queue.
	*
	* The caller is expected to handle the actual sending of the requests
	* (e.g., sending them over the network) after this method is called.
	*
	* @returns The list of requests that were transitioned to the pending state.
	*/
	flush() {
		const requests = this.outgoingRequests;
		this.outgoingRequests = [];
		for (const request of requests) this.pendingRequests[request.id] = request;
		return requests;
	}
	/**
	* Retrieves all currently pending requests, which are in flight awaiting responses
	* or handling ongoing subscriptions.
	*/
	getPendingRequests() {
		return Object.values(this.pendingRequests);
	}
	/**
	* Retrieves a specific pending request by its message ID.
	*/
	getPendingRequest(messageId) {
		if (messageId === null) return null;
		return this.pendingRequests[String(messageId)];
	}
	/**
	* Retrieves all outgoing requests, which are waiting to be sent.
	*/
	getOutgoingRequests() {
		return this.outgoingRequests;
	}
	/**
	* Retrieves all requests, both outgoing and pending, with their respective states.
	*
	* @returns An array of all requests with their state ("outgoing" or "pending").
	*/
	getRequests() {
		return [...this.getOutgoingRequests().map((request) => ({
			state: "outgoing",
			message: request.message,
			end: request.end,
			callbacks: request.callbacks
		})), ...this.getPendingRequests().map((request) => ({
			state: "pending",
			message: request.message,
			end: request.end,
			callbacks: request.callbacks
		}))];
	}
	/**
	* Checks if there are any pending requests, including ongoing subscriptions.
	*/
	hasPendingRequests() {
		return this.getPendingRequests().length > 0;
	}
	/**
	* Checks if there are any pending subscriptions
	*/
	hasPendingSubscriptions() {
		return this.getPendingRequests().some((request) => request.message.method === "subscription");
	}
	/**
	* Checks if there are any outgoing requests waiting to be sent.
	*/
	hasOutgoingRequests() {
		return this.outgoingRequests.length > 0;
	}
};

//#endregion
//#region src/links/wsLink/wsClient/wsConnection.ts
var import_defineProperty$1 = require_chunk.__toESM(require_objectSpread2$1.require_defineProperty(), 1);
/**
* Opens a WebSocket connection asynchronously and returns a promise
* that resolves when the connection is successfully established.
* The promise rejects if an error occurs during the connection attempt.
*/
function asyncWsOpen(ws) {
	const { promise, resolve, reject } = withResolvers();
	ws.addEventListener("open", () => {
		ws.removeEventListener("error", reject);
		resolve();
	});
	ws.addEventListener("error", reject);
	return promise;
}
/**
* Sets up a periodic ping-pong mechanism to keep the WebSocket connection alive.
*
* - Sends "PING" messages at regular intervals defined by `intervalMs`.
* - If a "PONG" response is not received within the `pongTimeoutMs`, the WebSocket is closed.
* - The ping timer resets upon receiving any message to maintain activity.
* - Automatically starts the ping process when the WebSocket connection is opened.
* - Cleans up timers when the WebSocket is closed.
*
* @param ws - The WebSocket instance to manage.
* @param options - Configuration options for ping-pong intervals and timeouts.
*/
function setupPingInterval(ws, { intervalMs, pongTimeoutMs }) {
	let pingTimeout;
	let pongTimeout;
	function start() {
		pingTimeout = setTimeout(() => {
			ws.send("PING");
			pongTimeout = setTimeout(() => {
				ws.close();
			}, pongTimeoutMs);
		}, intervalMs);
	}
	function reset() {
		clearTimeout(pingTimeout);
		start();
	}
	function pong() {
		clearTimeout(pongTimeout);
		reset();
	}
	ws.addEventListener("open", start);
	ws.addEventListener("message", ({ data }) => {
		clearTimeout(pingTimeout);
		start();
		if (data === "PONG") pong();
	});
	ws.addEventListener("close", () => {
		clearTimeout(pingTimeout);
		clearTimeout(pongTimeout);
	});
}
/**
* Manages a WebSocket connection with support for reconnection, keep-alive mechanisms,
* and observable state tracking.
*/
var WsConnection = class WsConnection {
	constructor(opts) {
		var _opts$WebSocketPonyfi;
		(0, import_defineProperty$1.default)(this, "id", ++WsConnection.connectCount);
		(0, import_defineProperty$1.default)(this, "WebSocketPonyfill", void 0);
		(0, import_defineProperty$1.default)(this, "urlOptions", void 0);
		(0, import_defineProperty$1.default)(this, "keepAliveOpts", void 0);
		(0, import_defineProperty$1.default)(this, "wsObservable", (0, __trpc_server_observable.behaviorSubject)(null));
		(0, import_defineProperty$1.default)(this, "openPromise", null);
		this.WebSocketPonyfill = (_opts$WebSocketPonyfi = opts.WebSocketPonyfill) !== null && _opts$WebSocketPonyfi !== void 0 ? _opts$WebSocketPonyfi : WebSocket;
		if (!this.WebSocketPonyfill) throw new Error("No WebSocket implementation found - you probably don't want to use this on the server, but if you do you need to pass a `WebSocket`-ponyfill");
		this.urlOptions = opts.urlOptions;
		this.keepAliveOpts = opts.keepAlive;
	}
	get ws() {
		return this.wsObservable.get();
	}
	set ws(ws) {
		this.wsObservable.next(ws);
	}
	/**
	* Checks if the WebSocket connection is open and ready to communicate.
	*/
	isOpen() {
		return !!this.ws && this.ws.readyState === this.WebSocketPonyfill.OPEN && !this.openPromise;
	}
	/**
	* Checks if the WebSocket connection is closed or in the process of closing.
	*/
	isClosed() {
		return !!this.ws && (this.ws.readyState === this.WebSocketPonyfill.CLOSING || this.ws.readyState === this.WebSocketPonyfill.CLOSED);
	}
	async open() {
		var _this = this;
		if (_this.openPromise) return _this.openPromise;
		_this.id = ++WsConnection.connectCount;
		const wsPromise = prepareUrl(_this.urlOptions).then((url) => new _this.WebSocketPonyfill(url));
		_this.openPromise = wsPromise.then(async (ws) => {
			_this.ws = ws;
			ws.addEventListener("message", function({ data }) {
				if (data === "PING") this.send("PONG");
			});
			if (_this.keepAliveOpts.enabled) setupPingInterval(ws, _this.keepAliveOpts);
			ws.addEventListener("close", () => {
				if (_this.ws === ws) _this.ws = null;
			});
			await asyncWsOpen(ws);
			if (_this.urlOptions.connectionParams) ws.send(await buildConnectionMessage(_this.urlOptions.connectionParams));
		});
		try {
			await _this.openPromise;
		} finally {
			_this.openPromise = null;
		}
	}
	/**
	* Closes the WebSocket connection gracefully.
	* Waits for any ongoing open operation to complete before closing.
	*/
	async close() {
		var _this2 = this;
		try {
			await _this2.openPromise;
		} finally {
			var _this$ws;
			(_this$ws = _this2.ws) === null || _this$ws === void 0 || _this$ws.close();
		}
	}
};
(0, import_defineProperty$1.default)(WsConnection, "connectCount", 0);
/**
* Provides a backward-compatible representation of the connection state.
*/
function backwardCompatibility(connection) {
	if (connection.isOpen()) return {
		id: connection.id,
		state: "open",
		ws: connection.ws
	};
	if (connection.isClosed()) return {
		id: connection.id,
		state: "closed",
		ws: connection.ws
	};
	if (!connection.ws) return null;
	return {
		id: connection.id,
		state: "connecting",
		ws: connection.ws
	};
}

//#endregion
//#region src/links/wsLink/wsClient/wsClient.ts
var import_defineProperty = require_chunk.__toESM(require_objectSpread2$1.require_defineProperty(), 1);
var import_objectSpread2 = require_chunk.__toESM(require_objectSpread2$1.require_objectSpread2(), 1);
/**
* A WebSocket client for managing TRPC operations, supporting lazy initialization,
* reconnection, keep-alive, and request management.
*/
var WsClient = class {
	constructor(opts) {
		var _opts$retryDelayMs;
		(0, import_defineProperty.default)(this, "connectionState", void 0);
		(0, import_defineProperty.default)(this, "allowReconnect", false);
		(0, import_defineProperty.default)(this, "requestManager", new RequestManager());
		(0, import_defineProperty.default)(this, "activeConnection", void 0);
		(0, import_defineProperty.default)(this, "reconnectRetryDelay", void 0);
		(0, import_defineProperty.default)(this, "inactivityTimeout", void 0);
		(0, import_defineProperty.default)(this, "callbacks", void 0);
		(0, import_defineProperty.default)(this, "lazyMode", void 0);
		(0, import_defineProperty.default)(this, "reconnecting", null);
		this.callbacks = {
			onOpen: opts.onOpen,
			onClose: opts.onClose,
			onError: opts.onError
		};
		const lazyOptions = (0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, lazyDefaults), opts.lazy);
		this.inactivityTimeout = new ResettableTimeout(() => {
			if (this.requestManager.hasOutgoingRequests() || this.requestManager.hasPendingRequests()) {
				this.inactivityTimeout.reset();
				return;
			}
			this.close().catch(() => null);
		}, lazyOptions.closeMs);
		this.activeConnection = new WsConnection({
			WebSocketPonyfill: opts.WebSocket,
			urlOptions: opts,
			keepAlive: (0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, keepAliveDefaults), opts.keepAlive)
		});
		this.activeConnection.wsObservable.subscribe({ next: (ws) => {
			if (!ws) return;
			this.setupWebSocketListeners(ws);
		} });
		this.reconnectRetryDelay = (_opts$retryDelayMs = opts.retryDelayMs) !== null && _opts$retryDelayMs !== void 0 ? _opts$retryDelayMs : exponentialBackoff;
		this.lazyMode = lazyOptions.enabled;
		this.connectionState = (0, __trpc_server_observable.behaviorSubject)({
			type: "state",
			state: lazyOptions.enabled ? "idle" : "connecting",
			error: null
		});
		if (!this.lazyMode) this.open().catch(() => null);
	}
	/**
	* Opens the WebSocket connection. Handles reconnection attempts and updates
	* the connection state accordingly.
	*/
	async open() {
		var _this = this;
		_this.allowReconnect = true;
		if (_this.connectionState.get().state === "idle") _this.connectionState.next({
			type: "state",
			state: "connecting",
			error: null
		});
		try {
			await _this.activeConnection.open();
		} catch (error) {
			_this.reconnect(new TRPCWebSocketClosedError({
				message: "Initialization error",
				cause: error
			}));
			return _this.reconnecting;
		}
	}
	/**
	* Closes the WebSocket connection and stops managing requests.
	* Ensures all outgoing and pending requests are properly finalized.
	*/
	async close() {
		var _this2 = this;
		_this2.allowReconnect = false;
		_this2.inactivityTimeout.stop();
		const requestsToAwait = [];
		for (const request of _this2.requestManager.getRequests()) if (request.message.method === "subscription") request.callbacks.complete();
		else if (request.state === "outgoing") request.callbacks.error(require_TRPCClientError.TRPCClientError.from(new TRPCWebSocketClosedError({ message: "Closed before connection was established" })));
		else requestsToAwait.push(request.end);
		await Promise.all(requestsToAwait).catch(() => null);
		await _this2.activeConnection.close().catch(() => null);
		_this2.connectionState.next({
			type: "state",
			state: "idle",
			error: null
		});
	}
	/**
	* Method to request the server.
	* Handles data transformation, batching of requests, and subscription lifecycle.
	*
	* @param op - The operation details including id, type, path, input and signal
	* @param transformer - Data transformer for serializing requests and deserializing responses
	* @param lastEventId - Optional ID of the last received event for subscriptions
	*
	* @returns An observable that emits operation results and handles cleanup
	*/
	request({ op: { id, type, path, input, signal }, transformer, lastEventId }) {
		return (0, __trpc_server_observable.observable)((observer) => {
			const abort = this.batchSend({
				id,
				method: type,
				params: {
					input: transformer.input.serialize(input),
					path,
					lastEventId
				}
			}, (0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, observer), {}, { next(event) {
				const transformed = (0, __trpc_server_unstable_core_do_not_import.transformResult)(event, transformer.output);
				if (!transformed.ok) {
					observer.error(require_TRPCClientError.TRPCClientError.from(transformed.error));
					return;
				}
				observer.next({ result: transformed.result });
			} }));
			return () => {
				abort();
				if (type === "subscription" && this.activeConnection.isOpen()) this.send({
					id,
					method: "subscription.stop"
				});
				signal === null || signal === void 0 || signal.removeEventListener("abort", abort);
			};
		});
	}
	get connection() {
		return backwardCompatibility(this.activeConnection);
	}
	reconnect(closedError) {
		var _this3 = this;
		this.connectionState.next({
			type: "state",
			state: "connecting",
			error: require_TRPCClientError.TRPCClientError.from(closedError)
		});
		if (this.reconnecting) return;
		const tryReconnect = async (attemptIndex) => {
			try {
				await (0, __trpc_server_unstable_core_do_not_import.sleep)(_this3.reconnectRetryDelay(attemptIndex));
				if (_this3.allowReconnect) {
					await _this3.activeConnection.close();
					await _this3.activeConnection.open();
					if (_this3.requestManager.hasPendingRequests()) _this3.send(_this3.requestManager.getPendingRequests().map(({ message }) => message));
				}
				_this3.reconnecting = null;
			} catch (_unused) {
				await tryReconnect(attemptIndex + 1);
			}
		};
		this.reconnecting = tryReconnect(0);
	}
	setupWebSocketListeners(ws) {
		var _this4 = this;
		const handleCloseOrError = (cause) => {
			const reqs = this.requestManager.getPendingRequests();
			for (const { message, callbacks } of reqs) {
				if (message.method === "subscription") continue;
				callbacks.error(require_TRPCClientError.TRPCClientError.from(cause !== null && cause !== void 0 ? cause : new TRPCWebSocketClosedError({
					message: "WebSocket closed",
					cause
				})));
				this.requestManager.delete(message.id);
			}
		};
		ws.addEventListener("open", () => {
			(0, __trpc_server_unstable_core_do_not_import.run)(async () => {
				var _this$callbacks$onOpe, _this$callbacks;
				if (_this4.lazyMode) _this4.inactivityTimeout.start();
				(_this$callbacks$onOpe = (_this$callbacks = _this4.callbacks).onOpen) === null || _this$callbacks$onOpe === void 0 || _this$callbacks$onOpe.call(_this$callbacks);
				_this4.connectionState.next({
					type: "state",
					state: "pending",
					error: null
				});
			}).catch((error) => {
				ws.close(3e3);
				handleCloseOrError(error);
			});
		});
		ws.addEventListener("message", ({ data }) => {
			this.inactivityTimeout.reset();
			if (typeof data !== "string" || ["PING", "PONG"].includes(data)) return;
			const incomingMessage = JSON.parse(data);
			if ("method" in incomingMessage) {
				this.handleIncomingRequest(incomingMessage);
				return;
			}
			this.handleResponseMessage(incomingMessage);
		});
		ws.addEventListener("close", (event) => {
			var _this$callbacks$onClo, _this$callbacks2;
			handleCloseOrError(event);
			(_this$callbacks$onClo = (_this$callbacks2 = this.callbacks).onClose) === null || _this$callbacks$onClo === void 0 || _this$callbacks$onClo.call(_this$callbacks2, event);
			if (!this.lazyMode || this.requestManager.hasPendingSubscriptions()) this.reconnect(new TRPCWebSocketClosedError({
				message: "WebSocket closed",
				cause: event
			}));
		});
		ws.addEventListener("error", (event) => {
			var _this$callbacks$onErr, _this$callbacks3;
			handleCloseOrError(event);
			(_this$callbacks$onErr = (_this$callbacks3 = this.callbacks).onError) === null || _this$callbacks$onErr === void 0 || _this$callbacks$onErr.call(_this$callbacks3, event);
			this.reconnect(new TRPCWebSocketClosedError({
				message: "WebSocket closed",
				cause: event
			}));
		});
	}
	handleResponseMessage(message) {
		const request = this.requestManager.getPendingRequest(message.id);
		if (!request) return;
		request.callbacks.next(message);
		let completed = true;
		if ("result" in message && request.message.method === "subscription") {
			if (message.result.type === "data") request.message.params.lastEventId = message.result.id;
			if (message.result.type !== "stopped") completed = false;
		}
		if (completed) {
			request.callbacks.complete();
			this.requestManager.delete(message.id);
		}
	}
	handleIncomingRequest(message) {
		if (message.method === "reconnect") this.reconnect(new TRPCWebSocketClosedError({ message: "Server requested reconnect" }));
	}
	/**
	* Sends a message or batch of messages directly to the server.
	*/
	send(messageOrMessages) {
		if (!this.activeConnection.isOpen()) throw new Error("Active connection is not open");
		const messages = messageOrMessages instanceof Array ? messageOrMessages : [messageOrMessages];
		this.activeConnection.ws.send(JSON.stringify(messages.length === 1 ? messages[0] : messages));
	}
	/**
	* Groups requests for batch sending.
	*
	* @returns A function to abort the batched request.
	*/
	batchSend(message, callbacks) {
		var _this5 = this;
		this.inactivityTimeout.reset();
		(0, __trpc_server_unstable_core_do_not_import.run)(async () => {
			if (!_this5.activeConnection.isOpen()) await _this5.open();
			await (0, __trpc_server_unstable_core_do_not_import.sleep)(0);
			if (!_this5.requestManager.hasOutgoingRequests()) return;
			_this5.send(_this5.requestManager.flush().map(({ message: message$1 }) => message$1));
		}).catch((err) => {
			this.requestManager.delete(message.id);
			callbacks.error(require_TRPCClientError.TRPCClientError.from(err));
		});
		return this.requestManager.register(message, callbacks);
	}
};

//#endregion
//#region src/links/wsLink/createWsClient.ts
function createWSClient(opts) {
	return new WsClient(opts);
}

//#endregion
//#region src/links/wsLink/wsLink.ts
function wsLink(opts) {
	const { client } = opts;
	const transformer = require_unstable_internals.getTransformer(opts.transformer);
	return () => {
		return ({ op }) => {
			return (0, __trpc_server_observable.observable)((observer) => {
				const connStateSubscription = op.type === "subscription" ? client.connectionState.subscribe({ next(result) {
					observer.next({
						result,
						context: op.context
					});
				} }) : null;
				const requestSubscription = client.request({
					op,
					transformer
				}).subscribe(observer);
				return () => {
					requestSubscription.unsubscribe();
					connStateSubscription === null || connStateSubscription === void 0 || connStateSubscription.unsubscribe();
				};
			});
		};
	};
}

//#endregion
Object.defineProperty(exports, 'createWSClient', {
  enumerable: true,
  get: function () {
    return createWSClient;
  }
});
Object.defineProperty(exports, 'resultOf', {
  enumerable: true,
  get: function () {
    return resultOf;
  }
});
Object.defineProperty(exports, 'wsLink', {
  enumerable: true,
  get: function () {
    return wsLink;
  }
});