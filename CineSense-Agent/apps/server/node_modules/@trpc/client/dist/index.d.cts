import { TRPCConnectionState } from "./subscriptions.d-Ciljg_dH.cjs";
import { FetchEsque, HTTPHeaders, NativeFetchEsque, Operation, OperationContext, OperationLink, OperationResultEnvelope, OperationResultObservable, OperationResultObserver, TRPCClientError, TRPCClientErrorBase, TRPCClientErrorLike, TRPCClientRuntime, TRPCFetch, TRPCLink, TRPCProcedureOptions, isFormData, isNonJsonSerializable, isOctetType, isTRPCClientError } from "./types.d-B2PuQAdV.cjs";
import { TransformerOptions } from "./unstable-internals.d-kWsZTlQq.cjs";
import "./httpUtils.d-e55oH-rp.cjs";
import { HTTPBatchLinkOptions, httpBatchLink } from "./httpBatchLink.d-CJdYzcjI.cjs";
import { HTTPLinkOptions, httpLink } from "./httpLink.d-CYzMvM3c.cjs";
import { LoggerLinkOptions, loggerLink } from "./loggerLink.d-3BnyPZWQ.cjs";
import { splitLink } from "./splitLink.d-3ZZnmg7h.cjs";
import { TRPCWebSocketClient, UrlOptionsWithConnectionParams, WebSocketClientOptions, WebSocketLinkOptions, createWSClient, wsLink } from "./wsLink.d-Dtb4zdet.cjs";
import { AnyClientTypes, AnyProcedure, AnyRouter, ErrorHandlerOptions, EventSourceLike, InferrableClientTypes, ProcedureType, RouterRecord, TypeError, inferAsyncIterableYield, inferClientTypes, inferProcedureInput, inferRouterContext, inferTransformedProcedureOutput } from "@trpc/server/unstable-core-do-not-import";
import { Unsubscribable } from "@trpc/server/observable";
import { AnyRouter as AnyRouter$1 } from "@trpc/server";

//#region src/internals/TRPCUntypedClient.d.ts
interface TRPCRequestOptions {
  /**
   * Pass additional context to links
   */
  context?: OperationContext;
  signal?: AbortSignal;
}
interface TRPCSubscriptionObserver<TValue, TError> {
  onStarted: (opts: {
    context: OperationContext | undefined;
  }) => void;
  onData: (value: inferAsyncIterableYield<TValue>) => void;
  onError: (err: TError) => void;
  onStopped: () => void;
  onComplete: () => void;
  onConnectionStateChange: (state: TRPCConnectionState<TError>) => void;
}
/** @internal */
type CreateTRPCClientOptions<TRouter extends InferrableClientTypes> = {
  links: TRPCLink<TRouter>[];
  transformer?: TypeError<'The transformer property has moved to httpLink/httpBatchLink/wsLink'>;
};
declare class TRPCUntypedClient<TInferrable extends InferrableClientTypes> {
  private readonly links;
  readonly runtime: TRPCClientRuntime;
  private requestId;
  constructor(opts: CreateTRPCClientOptions<TInferrable>);
  private $request;
  private requestAsPromise;
  query(path: string, input?: unknown, opts?: TRPCRequestOptions): Promise<unknown>;
  mutation(path: string, input?: unknown, opts?: TRPCRequestOptions): Promise<unknown>;
  subscription(path: string, input: unknown, opts: Partial<TRPCSubscriptionObserver<unknown, TRPCClientError<AnyRouter>>> & TRPCRequestOptions): Unsubscribable;
}
//# sourceMappingURL=TRPCUntypedClient.d.ts.map
//#endregion
//#region src/createTRPCUntypedClient.d.ts
declare function createTRPCUntypedClient<TRouter extends AnyRouter>(opts: CreateTRPCClientOptions<TRouter>): TRPCUntypedClient<TRouter>;
//#endregion
//#region src/createTRPCClient.d.ts
/**
 * @public
 * @deprecated use {@link TRPCClient} instead, will be removed in v12
 **/
type inferRouterClient<TRouter extends AnyRouter> = TRPCClient<TRouter>;
/**
 * @public
 * @deprecated use {@link TRPCClient} instead, will be removed in v12
 **/
type CreateTRPCClient<TRouter extends AnyRouter> = TRPCClient<TRouter>;
declare const untypedClientSymbol: unique symbol;
/**
 * @public
 **/
type TRPCClient<TRouter extends AnyRouter> = DecoratedProcedureRecord<{
  transformer: TRouter['_def']['_config']['$types']['transformer'];
  errorShape: TRouter['_def']['_config']['$types']['errorShape'];
}, TRouter['_def']['record']> & {
  [untypedClientSymbol]: TRPCUntypedClient<TRouter>;
};
type ResolverDef = {
  input: any;
  output: any;
  transformer: boolean;
  errorShape: any;
};
type coerceAsyncGeneratorToIterable<T> = T extends AsyncGenerator<infer $T, infer $Return, infer $Next> ? AsyncIterable<$T, $Return, $Next> : T;
/** @internal */
type Resolver<TDef extends ResolverDef> = (input: TDef['input'], opts?: TRPCProcedureOptions) => Promise<coerceAsyncGeneratorToIterable<TDef['output']>>;
type SubscriptionResolver<TDef extends ResolverDef> = (input: TDef['input'], opts: Partial<TRPCSubscriptionObserver<TDef['output'], TRPCClientError<TDef>>> & TRPCProcedureOptions) => Unsubscribable;
type DecorateProcedure<TType extends ProcedureType, TDef extends ResolverDef> = TType extends 'query' ? {
  query: Resolver<TDef>;
} : TType extends 'mutation' ? {
  mutate: Resolver<TDef>;
} : TType extends 'subscription' ? {
  subscribe: SubscriptionResolver<TDef>;
} : never;
/**
 * @internal
 */
type DecoratedProcedureRecord<TRoot extends InferrableClientTypes, TRecord extends RouterRecord> = { [TKey in keyof TRecord]: TRecord[TKey] extends infer $Value ? $Value extends AnyProcedure ? DecorateProcedure<$Value['_def']['type'], {
  input: inferProcedureInput<$Value>;
  output: inferTransformedProcedureOutput<inferClientTypes<TRoot>, $Value>;
  errorShape: inferClientTypes<TRoot>['errorShape'];
  transformer: inferClientTypes<TRoot>['transformer'];
}> : $Value extends RouterRecord ? DecoratedProcedureRecord<TRoot, $Value> : never : never };
/** @internal */
declare const clientCallTypeToProcedureType: (clientCallType: string) => ProcedureType;
/**
 * @internal
 */
declare function createTRPCClientProxy<TRouter extends AnyRouter>(client: TRPCUntypedClient<TRouter>): TRPCClient<TRouter>;
declare function createTRPCClient<TRouter extends AnyRouter>(opts: CreateTRPCClientOptions<TRouter>): TRPCClient<TRouter>;
/**
 * Get an untyped client from a proxy client
 * @internal
 */
declare function getUntypedClient<TRouter extends AnyRouter>(client: TRPCClient<TRouter>): TRPCUntypedClient<TRouter>;
//#endregion
//#region src/getFetch.d.ts
declare function getFetch(customFetchImpl?: FetchEsque | NativeFetchEsque): FetchEsque;
//# sourceMappingURL=getFetch.d.ts.map

//#endregion
//#region src/links/httpBatchStreamLink.d.ts
/**
 * @see https://trpc.io/docs/client/links/httpBatchStreamLink
 */
declare function httpBatchStreamLink<TRouter extends AnyRouter$1>(opts: HTTPBatchLinkOptions<TRouter['_def']['_config']['$types']>): TRPCLink<TRouter>;
/**
 * @deprecated use {@link httpBatchStreamLink} instead
 */
declare const unstable_httpBatchStreamLink: typeof httpBatchStreamLink;
//# sourceMappingURL=httpBatchStreamLink.d.ts.map
//#endregion
//#region src/links/httpSubscriptionLink.d.ts
type HTTPSubscriptionLinkOptions<TRoot extends AnyClientTypes, TEventSource extends EventSourceLike.AnyConstructor = typeof EventSource> = {
  /**
   * EventSource ponyfill
   */
  EventSource?: TEventSource;
  /**
   * EventSource options or a callback that returns them
   */
  eventSourceOptions?: EventSourceLike.InitDictOf<TEventSource> | ((opts: {
    op: Operation;
  }) => EventSourceLike.InitDictOf<TEventSource> | Promise<EventSourceLike.InitDictOf<TEventSource>>);
} & TransformerOptions<TRoot> & UrlOptionsWithConnectionParams;
/**
 * @see https://trpc.io/docs/client/links/httpSubscriptionLink
 */
declare function httpSubscriptionLink<TInferrable extends InferrableClientTypes, TEventSource extends EventSourceLike.AnyConstructor>(opts: HTTPSubscriptionLinkOptions<inferClientTypes<TInferrable>, TEventSource>): TRPCLink<TInferrable>;
/**
 * @deprecated use {@link httpSubscriptionLink} instead
 */
declare const unstable_httpSubscriptionLink: typeof httpSubscriptionLink;
//#endregion
//#region src/links/retryLink.d.ts
interface RetryLinkOptions<TInferrable extends InferrableClientTypes> {
  /**
   * The retry function
   */
  retry: (opts: RetryFnOptions<TInferrable>) => boolean;
  /**
   * The delay between retries in ms (defaults to 0)
   */
  retryDelayMs?: (attempt: number) => number;
}
interface RetryFnOptions<TInferrable extends InferrableClientTypes> {
  /**
   * The operation that failed
   */
  op: Operation;
  /**
   * The error that occurred
   */
  error: TRPCClientError<TInferrable>;
  /**
   * The number of attempts that have been made (including the first call)
   */
  attempts: number;
}
/**
 * @see https://trpc.io/docs/v11/client/links/retryLink
 */
declare function retryLink<TInferrable extends InferrableClientTypes>(opts: RetryLinkOptions<TInferrable>): TRPCLink<TInferrable>;
//#endregion
//#region src/links/localLink.d.ts
type LocalLinkOptions<TRouter extends AnyRouter> = {
  router: TRouter;
  createContext: () => Promise<inferRouterContext<TRouter>>;
  onError?: (opts: ErrorHandlerOptions<inferRouterContext<TRouter>>) => void;
} & TransformerOptions<inferClientTypes<TRouter>>;
/**
 * localLink is a terminating link that allows you to make tRPC procedure calls directly in your application without going through HTTP.
 *
 * @see https://trpc.io/docs/links/localLink
 */
declare function unstable_localLink<TRouter extends AnyRouter>(opts: LocalLinkOptions<TRouter>): TRPCLink<TRouter>;
/**
 * @deprecated Renamed to `unstable_localLink`. This alias will be removed in a future major release.
 */
declare const experimental_localLink: typeof unstable_localLink;
//# sourceMappingURL=localLink.d.ts.map

//#endregion
export { CreateTRPCClient, CreateTRPCClientOptions, HTTPBatchLinkOptions, HTTPHeaders, HTTPLinkOptions, LocalLinkOptions, LoggerLinkOptions, Operation, OperationContext, OperationLink, OperationResultEnvelope, OperationResultObservable, OperationResultObserver, Resolver, TRPCClient, TRPCClientError, TRPCClientErrorBase, TRPCClientErrorLike, TRPCClientRuntime, TRPCFetch, TRPCLink, TRPCProcedureOptions, TRPCRequestOptions, TRPCUntypedClient, TRPCWebSocketClient, WebSocketClientOptions, WebSocketLinkOptions, clientCallTypeToProcedureType, createTRPCClient, createTRPCClientProxy, createTRPCClient as createTRPCProxyClient, createTRPCUntypedClient, createWSClient, experimental_localLink, getFetch, getUntypedClient, httpBatchLink, httpBatchStreamLink, httpLink, httpSubscriptionLink, inferRouterClient, inferRouterClient as inferRouterProxyClient, isFormData, isNonJsonSerializable, isOctetType, isTRPCClientError, loggerLink, retryLink, splitLink, unstable_httpBatchStreamLink, unstable_httpSubscriptionLink, unstable_localLink, wsLink };
//# sourceMappingURL=index.d.cts.map