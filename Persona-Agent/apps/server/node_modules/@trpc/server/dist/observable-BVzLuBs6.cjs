const require_observable = require('./observable-B1Nk6r1H.cjs');

//#region src/observable/operators.ts
function map(project) {
	return (source) => {
		return require_observable.observable((destination) => {
			let index = 0;
			const subscription = source.subscribe({
				next(value) {
					destination.next(project(value, index++));
				},
				error(error) {
					destination.error(error);
				},
				complete() {
					destination.complete();
				}
			});
			return subscription;
		});
	};
}
function share(_opts) {
	return (source) => {
		let refCount = 0;
		let subscription = null;
		const observers = [];
		function startIfNeeded() {
			if (subscription) return;
			subscription = source.subscribe({
				next(value) {
					for (const observer of observers) {
						var _observer$next;
						(_observer$next = observer.next) === null || _observer$next === void 0 || _observer$next.call(observer, value);
					}
				},
				error(error) {
					for (const observer of observers) {
						var _observer$error;
						(_observer$error = observer.error) === null || _observer$error === void 0 || _observer$error.call(observer, error);
					}
				},
				complete() {
					for (const observer of observers) {
						var _observer$complete;
						(_observer$complete = observer.complete) === null || _observer$complete === void 0 || _observer$complete.call(observer);
					}
				}
			});
		}
		function resetIfNeeded() {
			if (refCount === 0 && subscription) {
				const _sub = subscription;
				subscription = null;
				_sub.unsubscribe();
			}
		}
		return require_observable.observable((subscriber) => {
			refCount++;
			observers.push(subscriber);
			startIfNeeded();
			return { unsubscribe() {
				refCount--;
				resetIfNeeded();
				const index = observers.findIndex((v) => v === subscriber);
				if (index > -1) observers.splice(index, 1);
			} };
		});
	};
}
function tap(observer) {
	return (source) => {
		return require_observable.observable((destination) => {
			return source.subscribe({
				next(value) {
					var _observer$next2;
					(_observer$next2 = observer.next) === null || _observer$next2 === void 0 || _observer$next2.call(observer, value);
					destination.next(value);
				},
				error(error) {
					var _observer$error2;
					(_observer$error2 = observer.error) === null || _observer$error2 === void 0 || _observer$error2.call(observer, error);
					destination.error(error);
				},
				complete() {
					var _observer$complete2;
					(_observer$complete2 = observer.complete) === null || _observer$complete2 === void 0 || _observer$complete2.call(observer);
					destination.complete();
				}
			});
		});
	};
}
const distinctUnsetMarker = Symbol();
function distinctUntilChanged(compare = (a, b) => a === b) {
	return (source) => {
		return require_observable.observable((destination) => {
			let lastValue = distinctUnsetMarker;
			return source.subscribe({
				next(value) {
					if (lastValue !== distinctUnsetMarker && compare(lastValue, value)) return;
					lastValue = value;
					destination.next(value);
				},
				error(error) {
					destination.error(error);
				},
				complete() {
					destination.complete();
				}
			});
		});
	};
}
const isDeepEqual = (a, b) => {
	if (a === b) return true;
	const bothAreObjects = a && b && typeof a === "object" && typeof b === "object";
	return !!bothAreObjects && Object.keys(a).length === Object.keys(b).length && Object.entries(a).every(([k, v]) => isDeepEqual(v, b[k]));
};
function distinctUntilDeepChanged() {
	return distinctUntilChanged(isDeepEqual);
}

//#endregion
//#region src/observable/behaviorSubject.ts
/**
* @internal
* An observable that maintains and provides a "current value" to subscribers
* @see https://www.learnrxjs.io/learn-rxjs/subjects/behaviorsubject
*/
function behaviorSubject(initialValue) {
	let value = initialValue;
	const observerList = [];
	const addObserver = (observer) => {
		if (value !== void 0) observer.next(value);
		observerList.push(observer);
	};
	const removeObserver = (observer) => {
		observerList.splice(observerList.indexOf(observer), 1);
	};
	const obs = require_observable.observable((observer) => {
		addObserver(observer);
		return () => {
			removeObserver(observer);
		};
	});
	obs.next = (nextValue) => {
		if (value === nextValue) return;
		value = nextValue;
		for (const observer of observerList) observer.next(nextValue);
	};
	obs.get = () => value;
	return obs;
}

//#endregion
Object.defineProperty(exports, 'behaviorSubject', {
  enumerable: true,
  get: function () {
    return behaviorSubject;
  }
});
Object.defineProperty(exports, 'distinctUntilChanged', {
  enumerable: true,
  get: function () {
    return distinctUntilChanged;
  }
});
Object.defineProperty(exports, 'distinctUntilDeepChanged', {
  enumerable: true,
  get: function () {
    return distinctUntilDeepChanged;
  }
});
Object.defineProperty(exports, 'map', {
  enumerable: true,
  get: function () {
    return map;
  }
});
Object.defineProperty(exports, 'share', {
  enumerable: true,
  get: function () {
    return share;
  }
});
Object.defineProperty(exports, 'tap', {
  enumerable: true,
  get: function () {
    return tap;
  }
});