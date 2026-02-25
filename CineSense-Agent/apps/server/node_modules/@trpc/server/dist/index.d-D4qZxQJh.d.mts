//#region src/observable/types.d.ts
interface Unsubscribable {
  unsubscribe(): void;
}
type UnsubscribeFn = () => void;
interface Subscribable<TValue, TError> {
  subscribe(observer: Partial<Observer<TValue, TError>>): Unsubscribable;
}
interface Observable<TValue, TError> extends Subscribable<TValue, TError> {
  pipe(): Observable<TValue, TError>;
  pipe<TValue1, TError1>(op1: OperatorFunction<TValue, TError, TValue1, TError1>): Observable<TValue1, TError1>;
  pipe<TValue1, TError1, TValue2, TError2>(op1: OperatorFunction<TValue, TError, TValue1, TError1>, op2: OperatorFunction<TValue1, TError1, TValue2, TError2>): Observable<TValue2, TError2>;
  pipe<TValue1, TError1, TValue2, TError2, TValue3, TError3>(op1: OperatorFunction<TValue, TError, TValue1, TError1>, op2: OperatorFunction<TValue1, TError1, TValue2, TError2>, op3: OperatorFunction<TValue2, TError2, TValue3, TError3>): Observable<TValue2, TError2>;
  pipe<TValue1, TError1, TValue2, TError2, TValue3, TError3, TValue4, TError4>(op1: OperatorFunction<TValue, TError, TValue1, TError1>, op2: OperatorFunction<TValue1, TError1, TValue2, TError2>, op3: OperatorFunction<TValue2, TError2, TValue3, TError3>, op4: OperatorFunction<TValue3, TError3, TValue4, TError4>): Observable<TValue2, TError2>;
  pipe<TValue1, TError1, TValue2, TError2, TValue3, TError3, TValue4, TError4, TValue5, TError5>(op1: OperatorFunction<TValue, TError, TValue1, TError1>, op2: OperatorFunction<TValue1, TError1, TValue2, TError2>, op3: OperatorFunction<TValue2, TError2, TValue3, TError3>, op4: OperatorFunction<TValue3, TError3, TValue4, TError4>, op5: OperatorFunction<TValue4, TError4, TValue5, TError5>): Observable<TValue2, TError2>;
}
interface Observer<TValue, TError> {
  next: (value: TValue) => void;
  error: (err: TError) => void;
  complete: () => void;
}
type TeardownLogic = Unsubscribable | UnsubscribeFn | void;
type UnaryFunction<TSource, TReturn> = (source: TSource) => TReturn;
type OperatorFunction<TValueBefore, TErrorBefore, TValueAfter, TErrorAfter> = UnaryFunction<Subscribable<TValueBefore, TErrorBefore>, Subscribable<TValueAfter, TErrorAfter>>;
type MonoTypeOperatorFunction<TValue, TError> = OperatorFunction<TValue, TError, TValue, TError>;
//#endregion
//#region src/observable/observable.d.ts
/** @public */
type inferObservableValue<TObservable> = TObservable extends Observable<infer TValue, unknown> ? TValue : never;
/** @public */
declare function isObservable(x: unknown): x is Observable<unknown, unknown>;
/** @public */
declare function observable<TValue, TError = unknown>(subscribe: (observer: Observer<TValue, TError>) => TeardownLogic): Observable<TValue, TError>;
/** @internal */
declare function observableToPromise<TValue>(observable: Observable<TValue, unknown>): Promise<TValue>;
/** @internal */
declare function observableToAsyncIterable<TValue>(observable: Observable<TValue, unknown>, signal: AbortSignal): AsyncIterable<TValue>;
//# sourceMappingURL=observable.d.ts.map
//#endregion
//#region src/observable/operators.d.ts
declare function map<TValueBefore, TError, TValueAfter>(project: (value: TValueBefore, index: number) => TValueAfter): OperatorFunction<TValueBefore, TError, TValueAfter, TError>;
interface ShareConfig {}
declare function share<TValue, TError>(_opts?: ShareConfig): MonoTypeOperatorFunction<TValue, TError>;
declare function tap<TValue, TError>(observer: Partial<Observer<TValue, TError>>): MonoTypeOperatorFunction<TValue, TError>;
declare function distinctUntilChanged<TValue, TError>(compare?: (a: TValue, b: TValue) => boolean): MonoTypeOperatorFunction<TValue, TError>;
declare function distinctUntilDeepChanged<TValue, TError>(): MonoTypeOperatorFunction<TValue, TError>;
//#endregion
//#region src/observable/behaviorSubject.d.ts
interface BehaviorSubject<TValue> extends Observable<TValue, never> {
  observable: Observable<TValue, never>;
  next: (value: TValue) => void;
  get: () => TValue;
}
interface ReadonlyBehaviorSubject<TValue> extends Omit<BehaviorSubject<TValue>, 'next'> {}
/**
 * @internal
 * An observable that maintains and provides a "current value" to subscribers
 * @see https://www.learnrxjs.io/learn-rxjs/subjects/behaviorsubject
 */
declare function behaviorSubject<TValue>(initialValue: TValue): BehaviorSubject<TValue>;
//# sourceMappingURL=behaviorSubject.d.ts.map

//#endregion
export { BehaviorSubject, Observable, Observer, ReadonlyBehaviorSubject, TeardownLogic, Unsubscribable, UnsubscribeFn, behaviorSubject, distinctUntilChanged, distinctUntilDeepChanged, inferObservableValue, isObservable, map, observable, observableToAsyncIterable, observableToPromise, share, tap };
//# sourceMappingURL=index.d-D4qZxQJh.d.mts.map