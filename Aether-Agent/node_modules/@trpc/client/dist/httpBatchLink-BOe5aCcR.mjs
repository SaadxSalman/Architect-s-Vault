import { __toESM, require_objectSpread2 } from "./objectSpread2-BvkFp-_Y.mjs";
import { TRPCClientError } from "./TRPCClientError-CjKyS10w.mjs";
import { getUrl, jsonHttpRequester, resolveHTTPLinkOptions } from "./httpUtils-Dv57hbOd.mjs";
import { observable } from "@trpc/server/observable";
import { transformResult } from "@trpc/server/unstable-core-do-not-import";

//#region src/internals/dataLoader.ts
/**
* A function that should never be called unless we messed something up.
*/
const throwFatalError = () => {
	throw new Error("Something went wrong. Please submit an issue at https://github.com/trpc/trpc/issues/new");
};
/**
* Dataloader that's very inspired by https://github.com/graphql/dataloader
* Less configuration, no caching, and allows you to cancel requests
* When cancelling a single fetch the whole batch will be cancelled only when _all_ items are cancelled
*/
function dataLoader(batchLoader) {
	let pendingItems = null;
	let dispatchTimer = null;
	const destroyTimerAndPendingItems = () => {
		clearTimeout(dispatchTimer);
		dispatchTimer = null;
		pendingItems = null;
	};
	/**
	* Iterate through the items and split them into groups based on the `batchLoader`'s validate function
	*/
	function groupItems(items) {
		const groupedItems = [[]];
		let index = 0;
		while (true) {
			const item = items[index];
			if (!item) break;
			const lastGroup = groupedItems[groupedItems.length - 1];
			if (item.aborted) {
				var _item$reject;
				(_item$reject = item.reject) === null || _item$reject === void 0 || _item$reject.call(item, new Error("Aborted"));
				index++;
				continue;
			}
			const isValid = batchLoader.validate(lastGroup.concat(item).map((it) => it.key));
			if (isValid) {
				lastGroup.push(item);
				index++;
				continue;
			}
			if (lastGroup.length === 0) {
				var _item$reject2;
				(_item$reject2 = item.reject) === null || _item$reject2 === void 0 || _item$reject2.call(item, new Error("Input is too big for a single dispatch"));
				index++;
				continue;
			}
			groupedItems.push([]);
		}
		return groupedItems;
	}
	function dispatch() {
		const groupedItems = groupItems(pendingItems);
		destroyTimerAndPendingItems();
		for (const items of groupedItems) {
			if (!items.length) continue;
			const batch = { items };
			for (const item of items) item.batch = batch;
			const promise = batchLoader.fetch(batch.items.map((_item) => _item.key));
			promise.then(async (result) => {
				await Promise.all(result.map(async (valueOrPromise, index) => {
					const item = batch.items[index];
					try {
						var _item$resolve;
						const value = await Promise.resolve(valueOrPromise);
						(_item$resolve = item.resolve) === null || _item$resolve === void 0 || _item$resolve.call(item, value);
					} catch (cause) {
						var _item$reject3;
						(_item$reject3 = item.reject) === null || _item$reject3 === void 0 || _item$reject3.call(item, cause);
					}
					item.batch = null;
					item.reject = null;
					item.resolve = null;
				}));
				for (const item of batch.items) {
					var _item$reject4;
					(_item$reject4 = item.reject) === null || _item$reject4 === void 0 || _item$reject4.call(item, new Error("Missing result"));
					item.batch = null;
				}
			}).catch((cause) => {
				for (const item of batch.items) {
					var _item$reject5;
					(_item$reject5 = item.reject) === null || _item$reject5 === void 0 || _item$reject5.call(item, cause);
					item.batch = null;
				}
			});
		}
	}
	function load(key) {
		var _dispatchTimer;
		const item = {
			aborted: false,
			key,
			batch: null,
			resolve: throwFatalError,
			reject: throwFatalError
		};
		const promise = new Promise((resolve, reject) => {
			var _pendingItems;
			item.reject = reject;
			item.resolve = resolve;
			(_pendingItems = pendingItems) !== null && _pendingItems !== void 0 || (pendingItems = []);
			pendingItems.push(item);
		});
		(_dispatchTimer = dispatchTimer) !== null && _dispatchTimer !== void 0 || (dispatchTimer = setTimeout(dispatch));
		return promise;
	}
	return { load };
}

//#endregion
//#region src/internals/signals.ts
/**
* Like `Promise.all()` but for abort signals
* - When all signals have been aborted, the merged signal will be aborted
* - If one signal is `null`, no signal will be aborted
*/
function allAbortSignals(...signals) {
	const ac = new AbortController();
	const count = signals.length;
	let abortedCount = 0;
	const onAbort = () => {
		if (++abortedCount === count) ac.abort();
	};
	for (const signal of signals) if (signal === null || signal === void 0 ? void 0 : signal.aborted) onAbort();
	else signal === null || signal === void 0 || signal.addEventListener("abort", onAbort, { once: true });
	return ac.signal;
}
/**
* Like `Promise.race` but for abort signals
*
* Basically, a ponyfill for
* [`AbortSignal.any`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/any_static).
*/
function raceAbortSignals(...signals) {
	const ac = new AbortController();
	for (const signal of signals) if (signal === null || signal === void 0 ? void 0 : signal.aborted) ac.abort();
	else signal === null || signal === void 0 || signal.addEventListener("abort", () => ac.abort(), { once: true });
	return ac.signal;
}
function abortSignalToPromise(signal) {
	return new Promise((_, reject) => {
		if (signal.aborted) {
			reject(signal.reason);
			return;
		}
		signal.addEventListener("abort", () => {
			reject(signal.reason);
		}, { once: true });
	});
}

//#endregion
//#region src/links/httpBatchLink.ts
var import_objectSpread2 = __toESM(require_objectSpread2(), 1);
/**
* @see https://trpc.io/docs/client/links/httpBatchLink
*/
function httpBatchLink(opts) {
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
					const url = getUrl((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, resolvedOpts), {}, {
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
					const signal = allAbortSignals(...batchOps.map((op) => op.signal));
					const res = await jsonHttpRequester((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, resolvedOpts), {}, {
						path,
						inputs,
						type,
						headers() {
							if (!opts.headers) return {};
							if (typeof opts.headers === "function") return opts.headers({ opList: batchOps });
							return opts.headers;
						},
						signal
					}));
					const resJSON = Array.isArray(res.json) ? res.json : batchOps.map(() => res.json);
					const result = resJSON.map((item) => ({
						meta: res.meta,
						json: item
					}));
					return result;
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
				if (op.type === "subscription") throw new Error("Subscriptions are unsupported by `httpLink` - use `httpSubscriptionLink` or `wsLink`");
				const loader = loaders[op.type];
				const promise = loader.load(op);
				let _res = void 0;
				promise.then((res) => {
					_res = res;
					const transformed = transformResult(res.json, resolvedOpts.transformer.output);
					if (!transformed.ok) {
						observer.error(TRPCClientError.from(transformed.error, { meta: res.meta }));
						return;
					}
					observer.next({
						context: res.meta,
						result: transformed.result
					});
					observer.complete();
				}).catch((err) => {
					observer.error(TRPCClientError.from(err, { meta: _res === null || _res === void 0 ? void 0 : _res.meta }));
				});
				return () => {};
			});
		};
	};
}

//#endregion
export { abortSignalToPromise, allAbortSignals, dataLoader, httpBatchLink, raceAbortSignals };
//# sourceMappingURL=httpBatchLink-BOe5aCcR.mjs.map