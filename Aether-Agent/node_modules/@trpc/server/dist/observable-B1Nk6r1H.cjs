
//#region src/observable/observable.ts
/** @public */
function isObservable(x) {
	return typeof x === "object" && x !== null && "subscribe" in x;
}
/** @public */
function observable(subscribe) {
	const self = {
		subscribe(observer) {
			let teardownRef = null;
			let isDone = false;
			let unsubscribed = false;
			let teardownImmediately = false;
			function unsubscribe() {
				if (teardownRef === null) {
					teardownImmediately = true;
					return;
				}
				if (unsubscribed) return;
				unsubscribed = true;
				if (typeof teardownRef === "function") teardownRef();
				else if (teardownRef) teardownRef.unsubscribe();
			}
			teardownRef = subscribe({
				next(value) {
					var _observer$next;
					if (isDone) return;
					(_observer$next = observer.next) === null || _observer$next === void 0 || _observer$next.call(observer, value);
				},
				error(err) {
					var _observer$error;
					if (isDone) return;
					isDone = true;
					(_observer$error = observer.error) === null || _observer$error === void 0 || _observer$error.call(observer, err);
					unsubscribe();
				},
				complete() {
					var _observer$complete;
					if (isDone) return;
					isDone = true;
					(_observer$complete = observer.complete) === null || _observer$complete === void 0 || _observer$complete.call(observer);
					unsubscribe();
				}
			});
			if (teardownImmediately) unsubscribe();
			return { unsubscribe };
		},
		pipe(...operations) {
			return operations.reduce(pipeReducer, self);
		}
	};
	return self;
}
function pipeReducer(prev, fn) {
	return fn(prev);
}
/** @internal */
function observableToPromise(observable$1) {
	const ac = new AbortController();
	const promise = new Promise((resolve, reject) => {
		let isDone = false;
		function onDone() {
			if (isDone) return;
			isDone = true;
			obs$.unsubscribe();
		}
		ac.signal.addEventListener("abort", () => {
			reject(ac.signal.reason);
		});
		const obs$ = observable$1.subscribe({
			next(data) {
				isDone = true;
				resolve(data);
				onDone();
			},
			error(data) {
				reject(data);
			},
			complete() {
				ac.abort();
				onDone();
			}
		});
	});
	return promise;
}
/**
* @internal
*/
function observableToReadableStream(observable$1, signal) {
	let unsub = null;
	const onAbort = () => {
		unsub === null || unsub === void 0 || unsub.unsubscribe();
		unsub = null;
		signal.removeEventListener("abort", onAbort);
	};
	return new ReadableStream({
		start(controller) {
			unsub = observable$1.subscribe({
				next(data) {
					controller.enqueue({
						ok: true,
						value: data
					});
				},
				error(error) {
					controller.enqueue({
						ok: false,
						error
					});
					controller.close();
				},
				complete() {
					controller.close();
				}
			});
			if (signal.aborted) onAbort();
			else signal.addEventListener("abort", onAbort, { once: true });
		},
		cancel() {
			onAbort();
		}
	});
}
/** @internal */
function observableToAsyncIterable(observable$1, signal) {
	const stream = observableToReadableStream(observable$1, signal);
	const reader = stream.getReader();
	const iterator = {
		async next() {
			const value = await reader.read();
			if (value.done) return {
				value: void 0,
				done: true
			};
			const { value: result } = value;
			if (!result.ok) throw result.error;
			return {
				value: result.value,
				done: false
			};
		},
		async return() {
			await reader.cancel();
			return {
				value: void 0,
				done: true
			};
		}
	};
	return { [Symbol.asyncIterator]() {
		return iterator;
	} };
}

//#endregion
Object.defineProperty(exports, 'isObservable', {
  enumerable: true,
  get: function () {
    return isObservable;
  }
});
Object.defineProperty(exports, 'observable', {
  enumerable: true,
  get: function () {
    return observable;
  }
});
Object.defineProperty(exports, 'observableToAsyncIterable', {
  enumerable: true,
  get: function () {
    return observableToAsyncIterable;
  }
});
Object.defineProperty(exports, 'observableToPromise', {
  enumerable: true,
  get: function () {
    return observableToPromise;
  }
});