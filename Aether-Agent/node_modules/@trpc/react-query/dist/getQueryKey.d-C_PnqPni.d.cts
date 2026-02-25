import * as _trpc_client1 from "@trpc/client";
import { CreateTRPCClientOptions, TRPCClient, TRPCClientError, TRPCClientErrorLike, TRPCRequestOptions, TRPCUntypedClient, createTRPCClient } from "@trpc/client";
import { AnyClientTypes, AnyMutationProcedure, AnyProcedure, AnyQueryProcedure, AnyRootTypes, AnyRouter, DeepPartial, DistributiveOmit, MaybePromise, ProcedureType, ProtectedIntersection, RouterRecord, Simplify, coerceAsyncIterableToArray, inferAsyncIterableYield, inferProcedureInput, inferProcedureOutput, inferTransformedProcedureOutput } from "@trpc/server/unstable-core-do-not-import";
import { CancelOptions, DataTag, DefinedInitialDataInfiniteOptions, DefinedInitialDataOptions, DefinedUseInfiniteQueryResult, DefinedUseQueryResult, FetchInfiniteQueryOptions, FetchQueryOptions, InfiniteData, InfiniteQueryObserverSuccessResult, InitialDataFunction, InvalidateOptions, InvalidateQueryFilters, MutationOptions, Query, QueryClient, QueryClientConfig, QueryFilters, QueryKey, QueryObserverSuccessResult, QueryOptions, RefetchOptions, RefetchQueryFilters, ResetOptions, SetDataOptions, SkipToken, UndefinedInitialDataInfiniteOptions, UndefinedInitialDataOptions, UnusedSkipTokenInfiniteOptions, UnusedSkipTokenOptions, Updater, UseBaseQueryOptions, UseInfiniteQueryOptions, UseInfiniteQueryResult, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult, UseSuspenseInfiniteQueryOptions, UseSuspenseInfiniteQueryResult, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";
import * as React$1 from "react";
import { JSX, ReactNode } from "react";

//#region src/internals/context.d.ts
interface TRPCUseUtilsOptions {
  /**
   * tRPC-related options
   */
  trpc?: TRPCRequestOptions;
}
interface TRPCFetchQueryOptions<TOutput, TError> extends DistributiveOmit<FetchQueryOptions<TOutput, TError>, 'queryKey'>, TRPCUseUtilsOptions {}
type TRPCFetchInfiniteQueryOptions<TInput, TOutput, TError> = DistributiveOmit<FetchInfiniteQueryOptions<TOutput, TError, TOutput, TRPCQueryKey, ExtractCursorType<TInput>>, 'queryKey' | 'initialPageParam'> & TRPCUseUtilsOptions & {
  initialCursor?: ExtractCursorType<TInput>;
};
/** @internal */
type SSRState = 'mounted' | 'mounting' | 'prepass' | false;
interface TRPCContextPropsBase<TRouter extends AnyRouter, TSSRContext> {
  /**
   * The `TRPCClient`
   */
  client: TRPCUntypedClient<TRouter>;
  /**
   * The SSR context when server-side rendering
   * @default null
   */
  ssrContext?: TSSRContext | null;
  /**
   * State of SSR hydration.
   * - `false` if not using SSR.
   * - `prepass` when doing a prepass to fetch queries' data
   * - `mounting` before TRPCProvider has been rendered on the client
   * - `mounted` when the TRPCProvider has been rendered on the client
   * @default false
   */
  ssrState?: SSRState;
  /**
   * @deprecated pass abortOnUnmount to `createTRPCReact` instead
   * Abort loading query calls when unmounting a component - usually when navigating to a new page
   * @default false
   */
  abortOnUnmount?: boolean;
}
/**
 * @internal
 */
type DecoratedTRPCContextProps<TRouter extends AnyRouter, TSSRContext> = TRPCContextPropsBase<TRouter, TSSRContext> & {
  client: TRPCClient<TRouter>;
};
interface TRPCContextProps<TRouter extends AnyRouter, TSSRContext> extends TRPCContextPropsBase<TRouter, TSSRContext> {
  /**
   * The react-query `QueryClient`
   */
  queryClient: QueryClient;
}
declare const contextProps: (keyof TRPCContextPropsBase<any, any>)[];
/**
 * @internal
 */
interface TRPCContextState<TRouter extends AnyRouter, TSSRContext = undefined> extends Required<TRPCContextProps<TRouter, TSSRContext>>, TRPCQueryUtils<TRouter> {}
/**
 * @internal
 */
interface TRPCQueryUtils<TRouter extends AnyRouter> {
  /**
   * @see https://tanstack.com/query/latest/docs/framework/react/reference/queryOptions#queryoptions
   */
  queryOptions(path: readonly string[],
  // <-- look into if needed
  queryKey: TRPCQueryKey, opts?: UndefinedTRPCQueryOptionsIn<unknown, unknown, TRPCClientError<AnyClientTypes>>): UndefinedTRPCQueryOptionsOut<unknown, unknown, TRPCClientError<AnyClientTypes>>;
  queryOptions(path: readonly string[],
  // <-- look into if needed
  queryKey: TRPCQueryKey, opts: DefinedTRPCQueryOptionsIn<unknown, unknown, TRPCClientError<AnyClientTypes>>): DefinedTRPCQueryOptionsOut<unknown, unknown, TRPCClientError<AnyClientTypes>>;
  /**
   * @see https://tanstack.com/query/latest/docs/framework/react/reference/infiniteQueryOptions#infinitequeryoptions
   */
  infiniteQueryOptions(path: readonly string[],
  // <-- look into if needed
  queryKey: TRPCQueryKey, opts: UndefinedTRPCInfiniteQueryOptionsIn<unknown, unknown, unknown, TRPCClientError<AnyClientTypes>>): UndefinedTRPCInfiniteQueryOptionsOut<unknown, unknown, unknown, TRPCClientError<AnyClientTypes>>;
  infiniteQueryOptions(path: readonly string[],
  // <-- look into if needed
  queryKey: TRPCQueryKey, opts: DefinedTRPCInfiniteQueryOptionsIn<unknown, unknown, unknown, TRPCClientError<AnyClientTypes>>): DefinedTRPCInfiniteQueryOptionsOut<unknown, unknown, unknown, TRPCClientError<AnyClientTypes>>;
  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientfetchquery
   */
  fetchQuery: (queryKey: TRPCQueryKey, opts?: TRPCFetchQueryOptions<unknown, TRPCClientError<TRouter>>) => Promise<unknown>;
  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientfetchinfinitequery
   */
  fetchInfiniteQuery: (queryKey: TRPCQueryKey, opts?: TRPCFetchInfiniteQueryOptions<unknown, unknown, TRPCClientError<TRouter>>) => Promise<InfiniteData<unknown, unknown>>;
  /**
   * @see https://tanstack.com/query/v5/docs/framework/react/guides/prefetching
   */
  prefetchQuery: (queryKey: TRPCQueryKey, opts?: TRPCFetchQueryOptions<unknown, TRPCClientError<TRouter>>) => Promise<void>;
  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientprefetchinfinitequery
   */
  prefetchInfiniteQuery: (queryKey: TRPCQueryKey, opts?: TRPCFetchInfiniteQueryOptions<unknown, unknown, TRPCClientError<TRouter>>) => Promise<void>;
  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientensurequerydata
   */
  ensureQueryData: (queryKey: TRPCQueryKey, opts?: TRPCFetchQueryOptions<unknown, TRPCClientError<TRouter>>) => Promise<unknown>;
  /**
   * @see https://tanstack.com/query/v5/docs/framework/react/guides/query-invalidation
   */
  invalidateQueries: (queryKey: TRPCQueryKey, filters?: InvalidateQueryFilters<TRPCQueryKey>, options?: InvalidateOptions) => Promise<void>;
  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientresetqueries
   */
  resetQueries: (queryKey: TRPCQueryKey, filters?: QueryFilters<TRPCQueryKey>, options?: ResetOptions) => Promise<void>;
  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientrefetchqueries
   */
  refetchQueries: (queryKey: TRPCQueryKey, filters?: RefetchQueryFilters<TRPCQueryKey>, options?: RefetchOptions) => Promise<void>;
  /**
   * @see https://tanstack.com/query/v5/docs/framework/react/guides/query-cancellation
   */
  cancelQuery: (queryKey: TRPCQueryKey, options?: CancelOptions) => Promise<void>;
  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientsetquerydata
   */
  setQueryData: (queryKey: TRPCQueryKey, updater: Updater<unknown, unknown>, options?: SetDataOptions) => void;
  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientsetqueriesdata
   */
  setQueriesData: (queryKey: TRPCQueryKey, filters: QueryFilters, updater: Updater<unknown, unknown>, options?: SetDataOptions) => [QueryKey, unknown][];
  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientgetquerydata
   */
  getQueryData: (queryKey: TRPCQueryKey) => unknown;
  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientsetquerydata
   */
  setInfiniteQueryData: (queryKey: TRPCQueryKey, updater: Updater<InfiniteData<unknown> | undefined, InfiniteData<unknown> | undefined>, options?: SetDataOptions) => void;
  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientgetquerydata
   */
  getInfiniteQueryData: (queryKey: TRPCQueryKey) => InfiniteData<unknown> | undefined;
  /**
   * @see https://tanstack.com/query/latest/docs/reference/QueryClient/#queryclientsetmutationdefaults
   */
  setMutationDefaults: (mutationKey: TRPCMutationKey, options: MutationOptions | ((args: {
    canonicalMutationFn: (input: unknown) => Promise<unknown>;
  }) => MutationOptions)) => void;
  /**
   * @see https://tanstack.com/query/latest/docs/reference/QueryClient#queryclientgetmutationdefaults
   */
  getMutationDefaults: (mutationKey: TRPCMutationKey) => MutationOptions | undefined;
  /**
   * @see https://tanstack.com/query/latest/docs/reference/QueryClient#queryclientismutating
   */
  isMutating: (filters: {
    mutationKey: TRPCMutationKey;
  }) => number;
}
declare const TRPCContext: React$1.Context<any>;
//#endregion
//#region src/shared/hooks/types.d.ts
type OutputWithCursor<TData, TCursor = any> = {
  cursor: TCursor | null;
  data: TData;
};
interface TRPCReactRequestOptions extends Omit<TRPCRequestOptions, 'signal'> {
  /**
   * Opt out of SSR for this query by passing `ssr: false`
   */
  ssr?: boolean;
  /**
   * Opt out or into aborting request on unmount
   */
  abortOnUnmount?: boolean;
}
interface TRPCUseQueryBaseOptions {
  /**
   * tRPC-related options
   */
  trpc?: TRPCReactRequestOptions;
}
interface UseTRPCQueryOptions<TOutput, TData, TError, TQueryOptsData = TOutput> extends DistributiveOmit<UseBaseQueryOptions<TOutput, TError, TData, TQueryOptsData, any>, 'queryKey'>, TRPCUseQueryBaseOptions {}
interface UseTRPCSuspenseQueryOptions<TOutput, TData, TError> extends DistributiveOmit<UseSuspenseQueryOptions<TOutput, TError, TData, any>, 'queryKey'>, TRPCUseQueryBaseOptions {}
interface UseTRPCPrefetchQueryOptions<TOutput, TData, TError> extends DistributiveOmit<FetchQueryOptions<TOutput, TError, TData, any>, 'queryKey'>, TRPCUseQueryBaseOptions {}
/** @internal **/
interface DefinedUseTRPCQueryOptions<TOutput, TData, TError, TQueryOptsData = TOutput> extends DistributiveOmit<UseTRPCQueryOptions<TOutput, TData, TError, TQueryOptsData>, 'queryKey'> {
  initialData: InitialDataFunction<TQueryOptsData> | TQueryOptsData;
}
interface TRPCQueryOptions<TData, TError> extends DistributiveOmit<QueryOptions<TData, TError, TData, any>, 'queryKey'>, TRPCUseQueryBaseOptions {
  queryKey: TRPCQueryKey;
}
type ExtractCursorType<TInput> = TInput extends {
  cursor?: any;
} ? TInput['cursor'] : unknown;
interface UseTRPCInfiniteQueryOptions<TInput, TOutput, TError> extends DistributiveOmit<UseInfiniteQueryOptions<TOutput, TError, TOutput, any, ExtractCursorType<TInput>>, 'queryKey' | 'initialPageParam'>, TRPCUseQueryBaseOptions {
  initialCursor?: ExtractCursorType<TInput>;
}
type UseTRPCPrefetchInfiniteQueryOptions<TInput, TOutput, TError> = DistributiveOmit<FetchInfiniteQueryOptions<TOutput, TError, TOutput, any, ExtractCursorType<TInput>>, 'queryKey' | 'initialPageParam'> & TRPCUseQueryBaseOptions & {
  initialCursor?: ExtractCursorType<TInput>;
};
interface UseTRPCSuspenseInfiniteQueryOptions<TInput, TOutput, TError> extends DistributiveOmit<UseSuspenseInfiniteQueryOptions<TOutput, TError, TOutput, any, ExtractCursorType<TInput>>, 'queryKey' | 'initialPageParam'>, TRPCUseQueryBaseOptions {
  initialCursor?: ExtractCursorType<TInput>;
}
interface UseTRPCMutationOptions<TInput, TError, TOutput, TContext = unknown> extends UseMutationOptions<TOutput, TError, TInput, TContext>, TRPCUseQueryBaseOptions {}
interface UseTRPCSubscriptionOptions<TOutput, TError> {
  /**
   * @deprecated
   * use a `skipToken` from `@tanstack/react-query` instead
   * this will be removed in v12
   */
  enabled?: boolean;
  /**
   * Called when the subscription is started
   */
  onStarted?: () => void;
  /**
   * Called when new data is received
   */
  onData?: (data: TOutput) => void;
  /**
   * Called when an **unrecoverable error** occurs and the subscription is closed
   */
  onError?: (err: TError) => void;
  /**
   * Called when the subscription is completed on the server
   */
  onComplete?: () => void;
}
interface TRPCSubscriptionBaseResult<TOutput, TError> {
  status: 'idle' | 'connecting' | 'pending' | 'error';
  data: undefined | TOutput;
  error: null | TError;
  /**
   * Reset the subscription
   */
  reset: () => void;
}
interface TRPCSubscriptionIdleResult<TOutput> extends TRPCSubscriptionBaseResult<TOutput, null> {
  status: 'idle';
  data: undefined;
  error: null;
}
interface TRPCSubscriptionConnectingResult<TOutput, TError> extends TRPCSubscriptionBaseResult<TOutput, TError> {
  status: 'connecting';
  data: undefined | TOutput;
  error: TError | null;
}
interface TRPCSubscriptionPendingResult<TOutput> extends TRPCSubscriptionBaseResult<TOutput, undefined> {
  status: 'pending';
  data: TOutput | undefined;
  error: null;
}
interface TRPCSubscriptionErrorResult<TOutput, TError> extends TRPCSubscriptionBaseResult<TOutput, TError> {
  status: 'error';
  data: TOutput | undefined;
  error: TError;
}
type TRPCSubscriptionResult<TOutput, TError> = TRPCSubscriptionIdleResult<TOutput> | TRPCSubscriptionConnectingResult<TOutput, TError> | TRPCSubscriptionErrorResult<TOutput, TError> | TRPCSubscriptionPendingResult<TOutput>;
interface TRPCProviderProps<TRouter extends AnyRouter, TSSRContext> extends Omit<TRPCContextProps<TRouter, TSSRContext>, 'client'> {
  children: ReactNode;
  client: TRPCClient<TRouter> | TRPCUntypedClient<TRouter>;
}
type TRPCProvider<TRouter extends AnyRouter, TSSRContext> = (props: TRPCProviderProps<TRouter, TSSRContext>) => JSX.Element;
type CreateClient<TRouter extends AnyRouter> = (opts: CreateTRPCClientOptions<TRouter>) => TRPCUntypedClient<TRouter>;
/**
 * @internal
 */
type UseTRPCQueryResult<TData, TError> = TRPCHookResult & UseQueryResult<coerceAsyncIterableToArray<TData>, TError>;
/**
 * @internal
 */
type DefinedUseTRPCQueryResult<TData, TError> = DefinedUseQueryResult<TData, TError> & TRPCHookResult;
/**
 * @internal
 */
type UseTRPCQuerySuccessResult<TData, TError> = QueryObserverSuccessResult<TData, TError> & TRPCHookResult;
/**
 * @internal
 */
type UseTRPCSuspenseQueryResult<TData, TError> = [TData, UseSuspenseQueryResult<TData, TError> & TRPCHookResult];
/**
 * @internal
 */
type UseTRPCInfiniteQueryResult<TData, TError, TInput> = TRPCHookResult & UseInfiniteQueryResult<InfiniteData<TData, NonNullable<ExtractCursorType<TInput>> | null>, TError>;
/**
 * @internal
 */
type UseTRPCInfiniteQuerySuccessResult<TData, TError, TInput> = InfiniteQueryObserverSuccessResult<InfiniteData<TData, NonNullable<ExtractCursorType<TInput>> | null>, TError> & TRPCHookResult;
/**
 * @internal
 */
type UseTRPCSuspenseInfiniteQueryResult<TData, TError, TInput> = [InfiniteData<TData, NonNullable<ExtractCursorType<TInput>> | null>, UseSuspenseInfiniteQueryResult<InfiniteData<TData, NonNullable<ExtractCursorType<TInput>> | null>, TError> & TRPCHookResult];
/**
 * @internal
 */
type UseTRPCMutationResult<TData, TError, TVariables, TContext> = TRPCHookResult & UseMutationResult<TData, TError, TVariables, TContext>;
interface TRPCHookResult {
  trpc: {
    path: string;
  };
}
//# sourceMappingURL=types.d.ts.map
//#endregion
//#region src/shared/types.d.ts
interface TRPCQueryBaseOptions {
  /**
   * tRPC-related options
   */
  trpc?: TRPCReactRequestOptions;
}
interface TRPCQueryOptionsResult {
  trpc: {
    path: string;
  };
}
type TRPCOptionOverrides = 'queryKey' | 'queryFn' | 'queryHashFn' | 'queryHash';
type TRPCInfiniteOptionOverrides = TRPCOptionOverrides | 'initialPageParam';
/**
 * QueryOptions API helpers
 */
interface UndefinedTRPCQueryOptionsIn<TQueryFnData, TData, TError> extends DistributiveOmit<UndefinedInitialDataOptions<coerceAsyncIterableToArray<TQueryFnData>, TError, coerceAsyncIterableToArray<TData>, TRPCQueryKey>, TRPCOptionOverrides>, TRPCQueryBaseOptions {}
interface UndefinedTRPCQueryOptionsOut<TQueryFnData, TOutput, TError> extends UndefinedInitialDataOptions<coerceAsyncIterableToArray<TQueryFnData>, TError, coerceAsyncIterableToArray<TOutput>, TRPCQueryKey>, TRPCQueryOptionsResult {
  queryKey: DataTag<TRPCQueryKey, coerceAsyncIterableToArray<TOutput>, TError>;
}
interface DefinedTRPCQueryOptionsIn<TQueryFnData, TData, TError> extends DistributiveOmit<DefinedInitialDataOptions<coerceAsyncIterableToArray<TQueryFnData>, TError, coerceAsyncIterableToArray<TData>, TRPCQueryKey>, TRPCOptionOverrides>, TRPCQueryBaseOptions {}
interface DefinedTRPCQueryOptionsOut<TQueryFnData, TData, TError> extends DefinedInitialDataOptions<coerceAsyncIterableToArray<TQueryFnData>, TError, coerceAsyncIterableToArray<TData>, TRPCQueryKey>, TRPCQueryOptionsResult {
  queryKey: DataTag<TRPCQueryKey, coerceAsyncIterableToArray<TData>, TError>;
}
interface UnusedSkipTokenTRPCQueryOptionsIn<TQueryFnData, TData, TError> extends DistributiveOmit<UnusedSkipTokenOptions<coerceAsyncIterableToArray<TQueryFnData>, TError, coerceAsyncIterableToArray<TData>, TRPCQueryKey>, TRPCOptionOverrides>, TRPCQueryBaseOptions {}
interface UnusedSkipTokenTRPCQueryOptionsOut<TQueryFnData, TOutput, TError> extends UnusedSkipTokenOptions<coerceAsyncIterableToArray<TQueryFnData>, TError, coerceAsyncIterableToArray<TOutput>, TRPCQueryKey>, TRPCQueryOptionsResult {
  queryKey: DataTag<TRPCQueryKey, coerceAsyncIterableToArray<TOutput>, TError>;
}
/**
 * InifiniteQueryOptions helpers
 */
interface UndefinedTRPCInfiniteQueryOptionsIn<TInput, TQueryFnData, TData, TError> extends DistributiveOmit<UndefinedInitialDataInfiniteOptions<TQueryFnData, TError, InfiniteData<TData, NonNullable<ExtractCursorType<TInput>> | null>, TRPCQueryKey, NonNullable<ExtractCursorType<TInput>> | null>, TRPCInfiniteOptionOverrides>, TRPCQueryBaseOptions {
  initialCursor?: NonNullable<ExtractCursorType<TInput>> | null;
}
interface UndefinedTRPCInfiniteQueryOptionsOut<TInput, TQueryFnData, TData, TError> extends DistributiveOmit<UndefinedInitialDataInfiniteOptions<TQueryFnData, TError, InfiniteData<TData, NonNullable<ExtractCursorType<TInput>> | null>, TRPCQueryKey, NonNullable<ExtractCursorType<TInput>> | null>, 'initialPageParam'>, TRPCQueryOptionsResult {
  queryKey: DataTag<TRPCQueryKey, TData, TError>;
  initialPageParam: NonNullable<ExtractCursorType<TInput>> | null;
}
interface DefinedTRPCInfiniteQueryOptionsIn<TInput, TQueryFnData, TData, TError> extends DistributiveOmit<DefinedInitialDataInfiniteOptions<TQueryFnData, TError, InfiniteData<TData, NonNullable<ExtractCursorType<TInput>> | null>, TRPCQueryKey, NonNullable<ExtractCursorType<TInput>> | null>, TRPCInfiniteOptionOverrides>, TRPCQueryBaseOptions {
  initialCursor?: NonNullable<ExtractCursorType<TInput>> | null;
}
interface DefinedTRPCInfiniteQueryOptionsOut<TInput, TQueryFnData, TData, TError> extends DistributiveOmit<DefinedInitialDataInfiniteOptions<TQueryFnData, TError, InfiniteData<TData, NonNullable<ExtractCursorType<TInput>> | null>, TRPCQueryKey, NonNullable<ExtractCursorType<TInput>> | null>, 'initialPageParam'>, TRPCQueryOptionsResult {
  queryKey: DataTag<TRPCQueryKey, TData, TError>;
  initialPageParam: NonNullable<ExtractCursorType<TInput>> | null;
}
interface UnusedSkipTokenTRPCInfiniteQueryOptionsIn<TInput, TQueryFnData, TData, TError> extends DistributiveOmit<UnusedSkipTokenInfiniteOptions<TQueryFnData, TError, InfiniteData<TData, NonNullable<ExtractCursorType<TInput>> | null>, TRPCQueryKey, NonNullable<ExtractCursorType<TInput>> | null>, TRPCInfiniteOptionOverrides>, TRPCQueryBaseOptions {
  initialCursor?: NonNullable<ExtractCursorType<TInput>> | null;
}
interface UnusedSkipTokenTRPCInfiniteQueryOptionsOut<TInput, TQueryFnData, TData, TError> extends DistributiveOmit<UnusedSkipTokenInfiniteOptions<TQueryFnData, TError, InfiniteData<TData, NonNullable<ExtractCursorType<TInput>> | null>, TRPCQueryKey, NonNullable<ExtractCursorType<TInput>> | null>, 'initialPageParam'>, TRPCQueryOptionsResult {
  queryKey: DataTag<TRPCQueryKey, TData, TError>;
  initialPageParam: NonNullable<ExtractCursorType<TInput>> | null;
}
/**
 * @internal
 */
interface UseMutationOverride {
  onSuccess: (opts: {
    /**
     * Calls the original function that was defined in the query's `onSuccess` option
     */
    originalFn: () => MaybePromise<void>;
    queryClient: QueryClient;
    /**
     * Meta data passed in from the `useMutation()` hook
     */
    meta: Record<string, unknown>;
  }) => MaybePromise<void>;
}
/**
 * @internal
 */
interface CreateTRPCReactOptions<_TRouter extends AnyRouter> {
  /**
   * Override behaviors of the built-in hooks
   */
  overrides?: {
    useMutation?: Partial<UseMutationOverride>;
  };
  /**
   * Abort all queries when unmounting
   * @default false
   */
  abortOnUnmount?: boolean;
  /**
   * Override the default context provider
   * @default undefined
   */
  context?: React.Context<any>;
}
//#endregion
//#region src/shared/hooks/createHooksInternal.d.ts
/**
 * @internal
 */
declare function createRootHooks<TRouter extends AnyRouter, TSSRContext = unknown>(config?: CreateTRPCReactOptions<TRouter>): {
  Provider: TRPCProvider<TRouter, TSSRContext>;
  createClient: (opts: _trpc_client1.CreateTRPCClientOptions<TRouter>) => _trpc_client1.TRPCClient<TRouter>;
  useContext: () => TRPCContextState<TRouter, TSSRContext>;
  useUtils: () => TRPCContextState<TRouter, TSSRContext>;
  useQuery: (path: readonly string[], input: unknown, opts?: UseTRPCQueryOptions<unknown, unknown, TRPCClientErrorLike<TRouter>>) => UseTRPCQueryResult<unknown, TRPCClientErrorLike<TRouter>>;
  usePrefetchQuery: (path: string[], input: unknown, opts?: UseTRPCPrefetchQueryOptions<unknown, unknown, TRPCClientErrorLike<TRouter>>) => void;
  useSuspenseQuery: (path: readonly string[], input: unknown, opts?: UseTRPCSuspenseQueryOptions<unknown, unknown, TRPCClientErrorLike<TRouter>>) => UseTRPCSuspenseQueryResult<unknown, TRPCClientErrorLike<TRouter>>;
  useQueries: TRPCUseQueries<TRouter>;
  useSuspenseQueries: TRPCUseSuspenseQueries<TRouter>;
  useMutation: (path: readonly string[], opts?: UseTRPCMutationOptions<unknown, TRPCClientErrorLike<TRouter>, unknown, unknown>) => UseTRPCMutationResult<unknown, TRPCClientErrorLike<TRouter>, unknown, unknown>;
  useSubscription: (path: readonly string[], input: unknown, opts: UseTRPCSubscriptionOptions<unknown, TRPCClientErrorLike<TRouter>>) => TRPCSubscriptionResult<unknown, TRPCClientErrorLike<TRouter>>;
  useInfiniteQuery: (path: readonly string[], input: unknown, opts: UseTRPCInfiniteQueryOptions<unknown, unknown, TRPCClientErrorLike<TRouter>>) => UseTRPCInfiniteQueryResult<unknown, TRPCClientErrorLike<TRouter>, unknown>;
  usePrefetchInfiniteQuery: (path: string[], input: unknown, opts: UseTRPCPrefetchInfiniteQueryOptions<unknown, unknown, TRPCClientErrorLike<TRouter>>) => void;
  useSuspenseInfiniteQuery: (path: readonly string[], input: unknown, opts: UseTRPCSuspenseInfiniteQueryOptions<unknown, unknown, TRPCClientErrorLike<TRouter>>) => UseTRPCSuspenseInfiniteQueryResult<unknown, TRPCClientErrorLike<TRouter>, unknown>;
};
/**
 * Infer the type of a `createReactQueryHooks` function
 * @internal
 */
type CreateReactQueryHooks<TRouter extends AnyRouter, TSSRContext = unknown> = ReturnType<typeof createRootHooks<TRouter, TSSRContext>>;
//# sourceMappingURL=createHooksInternal.d.ts.map
//#endregion
//#region src/shared/proxy/decorationProxy.d.ts
/**
 * Create proxy for decorating procedures
 * @internal
 */
declare function createReactDecoration<TRouter extends AnyRouter, TSSRContext = unknown>(hooks: CreateReactQueryHooks<TRouter, TSSRContext>): unknown;
//# sourceMappingURL=decorationProxy.d.ts.map
//#endregion
//#region src/utils/inferReactQueryProcedure.d.ts
/**
 * @internal
 */
type InferQueryOptions<TRoot extends AnyRootTypes, TProcedure extends AnyProcedure, TData = inferTransformedProcedureOutput<TRoot, TProcedure>> = Omit<UseTRPCQueryOptions<inferTransformedProcedureOutput<TRoot, TProcedure>, inferTransformedProcedureOutput<TRoot, TProcedure>, TRPCClientErrorLike<TRoot>, TData>, 'select' | 'queryFn'>;
/**
 * @internal
 */
type InferMutationOptions<TRoot extends AnyRootTypes, TProcedure extends AnyProcedure, TMeta = unknown> = UseTRPCMutationOptions<inferProcedureInput<TProcedure>, TRPCClientErrorLike<TRoot>, inferTransformedProcedureOutput<TRoot, TProcedure>, TMeta>;
/**
 * @internal
 */
type InferQueryResult<TRoot extends AnyRootTypes, TProcedure extends AnyProcedure> = UseTRPCQueryResult<inferTransformedProcedureOutput<TRoot, TProcedure>, TRPCClientErrorLike<TRoot>>;
/**
 * @internal
 */
type InferMutationResult<TRoot extends AnyRootTypes, TProcedure extends AnyProcedure, TContext = unknown> = UseTRPCMutationResult<inferTransformedProcedureOutput<TRoot, TProcedure>, TRPCClientErrorLike<TRoot>, inferProcedureInput<TProcedure>, TContext>;
type inferReactQueryProcedureOptionsInner<TRoot extends AnyRootTypes, TRecord extends RouterRecord> = { [TKey in keyof TRecord]: TRecord[TKey] extends infer $Value ? $Value extends AnyQueryProcedure ? InferQueryOptions<TRoot, $Value> : $Value extends AnyMutationProcedure ? InferMutationOptions<TRoot, $Value> : $Value extends RouterRecord ? inferReactQueryProcedureOptionsInner<TRoot, $Value> : never : never };
type inferReactQueryProcedureOptions<TRouter extends AnyRouter> = inferReactQueryProcedureOptionsInner<TRouter['_def']['_config']['$types'], TRouter['_def']['record']>;
//#endregion
//#region src/shared/proxy/utilsProxy.d.ts
type DecorateQueryProcedure<TRoot extends AnyRootTypes, TProcedure extends AnyQueryProcedure> = {
  /**
   * @see https://tanstack.com/query/latest/docs/framework/react/reference/queryOptions#queryoptions
   */
  queryOptions<TQueryFnData extends inferTransformedProcedureOutput<TRoot, TProcedure>, TData = TQueryFnData>(input: inferProcedureInput<TProcedure> | SkipToken, opts: DefinedTRPCQueryOptionsIn<TQueryFnData, TData, TRPCClientError<TRoot>>): DefinedTRPCQueryOptionsOut<TQueryFnData, TData, TRPCClientError<TRoot>>;
  /**
   * @see https://tanstack.com/query/latest/docs/framework/react/reference/queryOptions#queryoptions
   */
  queryOptions<TQueryFnData extends inferTransformedProcedureOutput<TRoot, TProcedure>, TData = TQueryFnData>(input: inferProcedureInput<TProcedure> | SkipToken, opts?: UnusedSkipTokenTRPCQueryOptionsIn<TQueryFnData, TData, TRPCClientError<TRoot>>): UnusedSkipTokenTRPCQueryOptionsOut<TQueryFnData, TData, TRPCClientError<TRoot>>;
  /**
   * @see https://tanstack.com/query/latest/docs/framework/react/reference/queryOptions#queryoptions
   */
  queryOptions<TQueryFnData extends inferTransformedProcedureOutput<TRoot, TProcedure>, TData = TQueryFnData>(input: inferProcedureInput<TProcedure> | SkipToken, opts?: UndefinedTRPCQueryOptionsIn<TQueryFnData, TData, TRPCClientError<TRoot>>): UndefinedTRPCQueryOptionsOut<TQueryFnData, TData, TRPCClientError<TRoot>>;
  /**
   * @see https://tanstack.com/query/latest/docs/framework/react/reference/infiniteQueryOptions#infinitequeryoptions
   */
  infiniteQueryOptions<TQueryFnData extends inferTransformedProcedureOutput<TRoot, TProcedure>, TData = TQueryFnData>(input: inferProcedureInput<TProcedure> | SkipToken, opts: DefinedTRPCInfiniteQueryOptionsIn<inferProcedureInput<TProcedure>, TQueryFnData, TData, TRPCClientError<TRoot>>): DefinedTRPCInfiniteQueryOptionsOut<inferProcedureInput<TProcedure>, TQueryFnData, TData, TRPCClientError<TRoot>>;
  /**
   * @see https://tanstack.com/query/latest/docs/framework/react/reference/infiniteQueryOptions#infinitequeryoptions
   */
  infiniteQueryOptions<TQueryFnData extends inferTransformedProcedureOutput<TRoot, TProcedure>, TData = TQueryFnData>(input: inferProcedureInput<TProcedure>, opts: UnusedSkipTokenTRPCInfiniteQueryOptionsIn<inferProcedureInput<TProcedure>, TQueryFnData, TData, TRPCClientError<TRoot>>): UnusedSkipTokenTRPCInfiniteQueryOptionsOut<inferProcedureInput<TProcedure>, TQueryFnData, TData, TRPCClientError<TRoot>>;
  /**
   * @see https://tanstack.com/query/latest/docs/framework/react/reference/infiniteQueryOptions#infinitequeryoptions
   */
  infiniteQueryOptions<TQueryFnData extends inferTransformedProcedureOutput<TRoot, TProcedure>, TData = TQueryFnData>(input: inferProcedureInput<TProcedure> | SkipToken, opts?: UndefinedTRPCInfiniteQueryOptionsIn<inferProcedureInput<TProcedure>, TQueryFnData, TData, TRPCClientError<TRoot>>): UndefinedTRPCInfiniteQueryOptionsOut<inferProcedureInput<TProcedure>, TQueryFnData, TData, TRPCClientError<TRoot>>;
  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientfetchquery
   */
  fetch(input: inferProcedureInput<TProcedure>, opts?: TRPCFetchQueryOptions<inferTransformedProcedureOutput<TRoot, TProcedure>, TRPCClientError<TRoot>>): Promise<inferTransformedProcedureOutput<TRoot, TProcedure>>;
  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientfetchinfinitequery
   */
  fetchInfinite(input: inferProcedureInput<TProcedure>, opts?: TRPCFetchInfiniteQueryOptions<inferProcedureInput<TProcedure>, inferTransformedProcedureOutput<TRoot, TProcedure>, TRPCClientError<TRoot>>): Promise<InfiniteData<inferTransformedProcedureOutput<TRoot, TProcedure>, NonNullable<ExtractCursorType<inferProcedureInput<TProcedure>>> | null>>;
  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientprefetchquery
   */
  prefetch(input: inferProcedureInput<TProcedure>, opts?: TRPCFetchQueryOptions<inferTransformedProcedureOutput<TRoot, TProcedure>, TRPCClientError<TRoot>>): Promise<void>;
  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientprefetchinfinitequery
   */
  prefetchInfinite(input: inferProcedureInput<TProcedure>, opts?: TRPCFetchInfiniteQueryOptions<inferProcedureInput<TProcedure>, inferTransformedProcedureOutput<TRoot, TProcedure>, TRPCClientError<TRoot>>): Promise<void>;
  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientensurequerydata
   */
  ensureData(input: inferProcedureInput<TProcedure>, opts?: TRPCFetchQueryOptions<inferTransformedProcedureOutput<TRoot, TProcedure>, TRPCClientError<TRoot>>): Promise<inferTransformedProcedureOutput<TRoot, TProcedure>>;
  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientinvalidatequeries
   */
  invalidate(input?: DeepPartial<inferProcedureInput<TProcedure>>, filters?: Omit<InvalidateQueryFilters, 'predicate'> & {
    predicate?: (query: Query<inferProcedureOutput<TProcedure>, TRPCClientError<TRoot>, inferTransformedProcedureOutput<TRoot, TProcedure>, QueryKeyKnown<inferProcedureInput<TProcedure>, inferProcedureInput<TProcedure> extends {
      cursor?: any;
    } | void ? 'infinite' : 'query'>>) => boolean;
  }, options?: InvalidateOptions): Promise<void>;
  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientrefetchqueries
   */
  refetch(input?: inferProcedureInput<TProcedure>, filters?: RefetchQueryFilters, options?: RefetchOptions): Promise<void>;
  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientcancelqueries
   */
  cancel(input?: inferProcedureInput<TProcedure>, options?: CancelOptions): Promise<void>;
  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientresetqueries
   */
  reset(input?: inferProcedureInput<TProcedure>, options?: ResetOptions): Promise<void>;
  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientsetquerydata
   */
  setData(
  /**
   * The input of the procedure
   */
  input: inferProcedureInput<TProcedure>, updater: Updater<inferTransformedProcedureOutput<TRoot, TProcedure> | undefined, inferTransformedProcedureOutput<TRoot, TProcedure> | undefined>, options?: SetDataOptions): void;
  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientsetquerydata
   */
  setQueriesData(
  /**
   * The input of the procedure
   */
  input: inferProcedureInput<TProcedure>, filters: QueryFilters, updater: Updater<inferTransformedProcedureOutput<TRoot, TProcedure> | undefined, inferTransformedProcedureOutput<TRoot, TProcedure> | undefined>, options?: SetDataOptions): [QueryKey, inferTransformedProcedureOutput<TRoot, TProcedure>];
  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientsetquerydata
   */
  setInfiniteData(input: inferProcedureInput<TProcedure>, updater: Updater<InfiniteData<inferTransformedProcedureOutput<TRoot, TProcedure>, NonNullable<ExtractCursorType<inferProcedureInput<TProcedure>>> | null> | undefined, InfiniteData<inferTransformedProcedureOutput<TRoot, TProcedure>, NonNullable<ExtractCursorType<inferProcedureInput<TProcedure>>> | null> | undefined>, options?: SetDataOptions): void;
  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientgetquerydata
   */
  getData(input?: inferProcedureInput<TProcedure>): inferTransformedProcedureOutput<TRoot, TProcedure> | undefined;
  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientgetquerydata
   */
  getInfiniteData(input?: inferProcedureInput<TProcedure>): InfiniteData<inferTransformedProcedureOutput<TRoot, TProcedure>, NonNullable<ExtractCursorType<inferProcedureInput<TProcedure>>> | null> | undefined;
};
type DecorateMutationProcedure<TRoot extends AnyRootTypes, TProcedure extends AnyMutationProcedure> = {
  setMutationDefaults<TMeta = unknown>(options: InferMutationOptions<TRoot, TProcedure, TMeta> | ((args: {
    canonicalMutationFn: NonNullable<InferMutationOptions<TRoot, TProcedure>['mutationFn']>;
  }) => InferMutationOptions<TRoot, TProcedure, TMeta>)): void;
  getMutationDefaults(): InferMutationOptions<TRoot, TProcedure> | undefined;
  isMutating(): number;
};
/**
 * this is the type that is used to add in procedures that can be used on
 * an entire router
 */
type DecorateRouter = {
  /**
   * Invalidate the full router
   * @see https://trpc.io/docs/v10/useContext#query-invalidation
   * @see https://tanstack.com/query/v5/docs/framework/react/guides/query-invalidation
   */
  invalidate(input?: undefined, filters?: InvalidateQueryFilters, options?: InvalidateOptions): Promise<void>;
};
/**
 * @internal
 */
type DecoratedProcedureUtilsRecord<TRoot extends AnyRootTypes, TRecord extends RouterRecord> = DecorateRouter & { [TKey in keyof TRecord]: TRecord[TKey] extends infer $Value ? $Value extends AnyQueryProcedure ? DecorateQueryProcedure<TRoot, $Value> : $Value extends AnyMutationProcedure ? DecorateMutationProcedure<TRoot, $Value> : $Value extends RouterRecord ? DecoratedProcedureUtilsRecord<TRoot, $Value> & DecorateRouter : never : never };
type AnyDecoratedProcedure = DecorateQueryProcedure<any, any> & DecorateMutationProcedure<any, any>;
type CreateReactUtils<TRouter extends AnyRouter, TSSRContext> = ProtectedIntersection<DecoratedTRPCContextProps<TRouter, TSSRContext>, DecoratedProcedureUtilsRecord<TRouter['_def']['_config']['$types'], TRouter['_def']['record']>>;
type CreateQueryUtils<TRouter extends AnyRouter> = DecoratedProcedureUtilsRecord<TRouter['_def']['_config']['$types'], TRouter['_def']['record']>;
declare const getQueryType: (utilName: keyof AnyDecoratedProcedure) => QueryType;
/**
 * @internal
 */
declare function createReactQueryUtils<TRouter extends AnyRouter, TSSRContext>(context: TRPCContextState<AnyRouter, TSSRContext>): ProtectedIntersection<DecoratedTRPCContextProps<TRouter, TSSRContext>, DecoratedProcedureUtilsRecord<TRouter["_def"]["_config"]["$types"], TRouter["_def"]["record"]>>;
/**
 * @internal
 */
declare function createQueryUtilsProxy<TRouter extends AnyRouter>(context: TRPCQueryUtils<TRouter>): CreateQueryUtils<TRouter>;
//#endregion
//#region src/shared/proxy/useQueriesProxy.d.ts
type GetQueryOptions<TRoot extends AnyRootTypes, TProcedure extends AnyProcedure> = <TData = inferTransformedProcedureOutput<TRoot, TProcedure>>(input: inferProcedureInput<TProcedure>, opts?: TrpcQueryOptionsForUseQueries<inferTransformedProcedureOutput<TRoot, TProcedure>, TData, TRPCClientError<TRoot>>) => TrpcQueryOptionsForUseQueries<inferTransformedProcedureOutput<TRoot, TProcedure>, TData, TRPCClientError<TRoot>>;
/**
 * @internal
 */
type UseQueriesProcedureRecord<TRoot extends AnyRootTypes, TRecord extends RouterRecord> = { [TKey in keyof TRecord]: TRecord[TKey] extends infer $Value ? $Value extends AnyQueryProcedure ? GetQueryOptions<TRoot, $Value> : $Value extends RouterRecord ? UseQueriesProcedureRecord<TRoot, $Value> : never : never };
type GetSuspenseQueryOptions<TRoot extends AnyRootTypes, TProcedure extends AnyQueryProcedure> = <TData = inferTransformedProcedureOutput<TRoot, TProcedure>>(input: inferProcedureInput<TProcedure>, opts?: TrpcQueryOptionsForUseSuspenseQueries<inferTransformedProcedureOutput<TRoot, TProcedure>, TData, TRPCClientError<TRoot>>) => TrpcQueryOptionsForUseSuspenseQueries<inferTransformedProcedureOutput<TRoot, TProcedure>, TData, TRPCClientError<TRoot>>;
/**
 * @internal
 */
type UseSuspenseQueriesProcedureRecord<TRoot extends AnyRootTypes, TRecord extends RouterRecord> = { [TKey in keyof TRecord]: TRecord[TKey] extends infer $Value ? $Value extends AnyQueryProcedure ? GetSuspenseQueryOptions<TRoot, $Value> : $Value extends RouterRecord ? UseSuspenseQueriesProcedureRecord<TRoot, $Value> : never : never };
/**
 * Create proxy for `useQueries` options
 * @internal
 */
declare function createUseQueries<TRouter extends AnyRouter>(client: TRPCUntypedClient<TRouter> | TRPCClient<TRouter>): UseQueriesProcedureRecord<TRouter["_def"]["_config"]["$types"], TRouter["_def"]["record"]>;
//#endregion
//#region src/shared/queryClient.d.ts
/**
 * @internal
 */
type CreateTRPCReactQueryClientConfig = {
  queryClient?: QueryClient;
  queryClientConfig?: never;
} | {
  queryClientConfig?: QueryClientConfig;
  queryClient?: never;
};
/**
 * @internal
 */
declare const getQueryClient: (config: CreateTRPCReactQueryClientConfig) => QueryClient;
//# sourceMappingURL=queryClient.d.ts.map
//#endregion
//#region src/shared/polymorphism/mutationLike.d.ts
/**
 * Use to describe a mutation route which matches a given mutation procedure's interface
 */
type MutationLike<TRoot extends AnyRootTypes, TProcedure extends AnyProcedure> = {
  useMutation: (opts?: InferMutationOptions<TRoot, TProcedure>) => InferMutationResult<TRoot, TProcedure>;
};
/**
 * Use to unwrap a MutationLike's input
 */
type InferMutationLikeInput<TMutationLike extends MutationLike<any, any>> = TMutationLike extends MutationLike<any, infer $Procedure> ? inferProcedureInput<$Procedure> : never;
/**
 * Use to unwrap a MutationLike's data output
 */
type InferMutationLikeData<TMutationLike extends MutationLike<any, any>> = TMutationLike extends MutationLike<infer TRoot, infer TProcedure> ? inferTransformedProcedureOutput<TRoot, TProcedure> : never;
//# sourceMappingURL=mutationLike.d.ts.map
//#endregion
//#region src/shared/polymorphism/queryLike.d.ts
/**
 * Use to request a query route which matches a given query procedure's interface
 */
type QueryLike<TRoot extends AnyRootTypes, TProcedure extends AnyProcedure> = {
  useQuery: (variables: inferProcedureInput<TProcedure>, opts?: InferQueryOptions<TRoot, TProcedure, any>) => InferQueryResult<TRoot, TProcedure>;
  useSuspenseQuery: (variables: inferProcedureInput<TProcedure>, opts?: InferQueryOptions<TRoot, TProcedure, any>) => UseTRPCSuspenseQueryResult<inferProcedureOutput<TProcedure>, TRPCClientErrorLike<TRoot>>;
};
/**
 * Use to unwrap a QueryLike's input
 */
type InferQueryLikeInput<TQueryLike> = TQueryLike extends DecoratedQuery<infer $Def> ? $Def['input'] : TQueryLike extends QueryLike<any, infer TProcedure> ? inferProcedureInput<TProcedure> : never;
/**
 * Use to unwrap a QueryLike's data output
 */
type InferQueryLikeData<TQueryLike> = TQueryLike extends DecoratedQuery<infer $Def> ? $Def['output'] : TQueryLike extends QueryLike<infer TRoot, infer TProcedure> ? inferTransformedProcedureOutput<TRoot, TProcedure> : never;
//# sourceMappingURL=queryLike.d.ts.map
//#endregion
//#region src/shared/polymorphism/routerLike.d.ts
/**
 * Use to describe a route path which matches a given route's interface
 */
type RouterLike<TRouter extends AnyRouter> = RouterLikeInner<TRouter['_def']['_config']['$types'], TRouter['_def']['record']>;
type RouterLikeInner<TRoot extends AnyRootTypes, TRecord extends RouterRecord> = { [TKey in keyof TRecord]: TRecord[TKey] extends infer $Value ? $Value extends AnyQueryProcedure ? QueryLike<TRoot, $Value> : $Value extends AnyMutationProcedure ? MutationLike<TRoot, $Value> : $Value extends RouterRecord ? RouterLikeInner<TRoot, $Value> : never : never };
//# sourceMappingURL=routerLike.d.ts.map
//#endregion
//#region src/shared/polymorphism/utilsLike.d.ts
/**
 * Use to describe a Utils/Context path which matches the given route's interface
 */
type UtilsLike<TRouter extends AnyRouter> = DecoratedProcedureUtilsRecord<TRouter['_def']['_config']['$types'], TRouter['_def']['record']>;
//# sourceMappingURL=utilsLike.d.ts.map
//#endregion
//#region src/internals/getClientArgs.d.ts
/**
 * @internal
 */
declare function getClientArgs<TOptions>(queryKey: TRPCQueryKey, opts: TOptions, infiniteParams?: {
  pageParam: any;
  direction: 'forward' | 'backward';
}): readonly [string, unknown, any];
//# sourceMappingURL=getClientArgs.d.ts.map
//#endregion
//#region src/internals/useQueries.d.ts
/**
 * @internal
 */
type UseQueryOptionsForUseQueries<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey> = DistributiveOmit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey'>;
/**
 * @internal
 */
type UseQueryOptionsForUseSuspenseQueries<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey> = DistributiveOmit<UseSuspenseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey'>;
/**
 * @internal
 */
type TrpcQueryOptionsForUseQueries<TOutput, TData, TError> = DistributiveOmit<UseTRPCQueryOptions<TOutput, TData, TError>, 'queryKey'>;
/**
 * @internal
 */
type TrpcQueryOptionsForUseSuspenseQueries<TOutput, TData, TError> = DistributiveOmit<UseTRPCSuspenseQueryOptions<TOutput, TData, TError>, 'queryKey'>;
/**
 * @internal
 */
declare type QueriesResults<TQueriesOptions extends UseQueryOptionsForUseQueries<any, any, any, any>[]> = { [TKey in keyof TQueriesOptions]: TQueriesOptions[TKey] extends UseQueryOptionsForUseQueries<infer TQueryFnData, infer TError, infer TData, any> ? UseTRPCQueryResult<unknown extends TData ? TQueryFnData : TData, TError> : never };
/**
 * @internal
 */
declare type SuspenseQueriesResults<TQueriesOptions extends UseQueryOptionsForUseSuspenseQueries<any, any, any, any>[]> = [{ [TKey in keyof TQueriesOptions]: TQueriesOptions[TKey] extends UseQueryOptionsForUseSuspenseQueries<infer TQueryFnData, any, infer TData, any> ? unknown extends TData ? TQueryFnData : TData : never }, { [TKey in keyof TQueriesOptions]: TQueriesOptions[TKey] extends UseQueryOptionsForUseSuspenseQueries<infer TQueryFnData, infer TError, infer TData, any> ? UseSuspenseQueryResult<unknown extends TData ? TQueryFnData : TData, TError> : never }];
type GetOptions<TQueryOptions> = TQueryOptions extends UseQueryOptionsForUseQueries<any, any, any, any> ? TQueryOptions : never;
/**
 * @internal
 */
type QueriesOptions<TQueriesOptions extends any[], TResult extends any[] = []> = TQueriesOptions extends [] ? [] : TQueriesOptions extends [infer Head] ? [...TResult, GetOptions<Head>] : TQueriesOptions extends [infer Head, ...infer Tail] ? QueriesOptions<Tail, [...TResult, GetOptions<Head>]> : unknown[] extends TQueriesOptions ? TQueriesOptions : TQueriesOptions extends UseQueryOptionsForUseQueries<infer TQueryFnData, infer TError, infer TData, infer TQueryKey>[] ? UseQueryOptionsForUseQueries<TQueryFnData, TError, TData, TQueryKey>[] : UseQueryOptionsForUseQueries[];
type GetSuspenseOptions<TQueryOptions> = TQueryOptions extends UseQueryOptionsForUseSuspenseQueries<any, any, any, any> ? TQueryOptions : never;
/**
 * @internal
 */
type SuspenseQueriesOptions<TQueriesOptions extends any[], TResult extends any[] = []> = TQueriesOptions extends [] ? [] : TQueriesOptions extends [infer Head] ? [...TResult, GetSuspenseOptions<Head>] : TQueriesOptions extends [infer Head, ...infer Tail] ? SuspenseQueriesOptions<Tail, [...TResult, GetSuspenseOptions<Head>]> : unknown[] extends TQueriesOptions ? TQueriesOptions : TQueriesOptions extends UseQueryOptionsForUseSuspenseQueries<infer TQueryFnData, infer TError, infer TData, infer TQueryKey>[] ? UseQueryOptionsForUseSuspenseQueries<TQueryFnData, TError, TData, TQueryKey>[] : UseQueryOptionsForUseSuspenseQueries[];
/**
 * @internal
 */
type TRPCUseQueries<TRouter extends AnyRouter> = <TQueryOptions extends UseQueryOptionsForUseQueries<any, any, any, any>[], TCombinedResult = QueriesResults<TQueryOptions>>(queriesCallback: (t: UseQueriesProcedureRecord<TRouter['_def']['_config']['$types'], TRouter['_def']['record']>) => readonly [...QueriesOptions<TQueryOptions>], options?: {
  combine?: (results: QueriesResults<TQueryOptions>) => TCombinedResult;
}) => TCombinedResult;
/**
 * @internal
 */
type TRPCUseSuspenseQueries<TRouter extends AnyRouter> = <TQueryOptions extends UseQueryOptionsForUseSuspenseQueries<any, any, any, any>[]>(queriesCallback: (t: UseSuspenseQueriesProcedureRecord<TRouter['_def']['_config']['$types'], TRouter['_def']['record']>) => readonly [...SuspenseQueriesOptions<TQueryOptions>]) => SuspenseQueriesResults<TQueryOptions>;
//#endregion
//#region src/createTRPCReact.d.ts
type ResolverDef = {
  input: any;
  output: any;
  transformer: boolean;
  errorShape: any;
};
/**
 * @internal
 */
interface ProcedureUseQuery<TDef extends ResolverDef> {
  <TQueryFnData extends TDef['output'] = TDef['output'], TData = TQueryFnData>(input: TDef['input'] | SkipToken, opts: DefinedUseTRPCQueryOptions<TQueryFnData, TData, TRPCClientErrorLike<{
    errorShape: TDef['errorShape'];
    transformer: TDef['transformer'];
  }>, TDef['output']>): DefinedUseTRPCQueryResult<TData, TRPCClientErrorLike<{
    errorShape: TDef['errorShape'];
    transformer: TDef['transformer'];
  }>>;
  <TQueryFnData extends TDef['output'] = TDef['output'], TData = TQueryFnData>(input: TDef['input'] | SkipToken, opts?: UseTRPCQueryOptions<TQueryFnData, TData, TRPCClientErrorLike<TDef>, TDef['output']>): UseTRPCQueryResult<TData, TRPCClientErrorLike<TDef>>;
}
/**
 * @internal
 */
type ProcedureUsePrefetchQuery<TDef extends ResolverDef> = (input: TDef['input'] | SkipToken, opts?: TRPCFetchQueryOptions<TDef['output'], TRPCClientErrorLike<TDef>>) => void;
/**
 * @remark `void` is here due to https://github.com/trpc/trpc/pull/4374
 */
type CursorInput = {
  cursor?: any;
} | void;
type ReservedInfiniteQueryKeys = 'cursor' | 'direction';
type InfiniteInput<TInput> = Omit<TInput, ReservedInfiniteQueryKeys> | SkipToken;
type inferCursorType<TInput> = TInput extends {
  cursor?: any;
} ? TInput['cursor'] : unknown;
type makeInfiniteQueryOptions<TCursor, TOptions> = Omit<TOptions, 'queryKey' | 'initialPageParam' | 'queryFn' | 'queryHash' | 'queryHashFn'> & TRPCUseQueryBaseOptions & {
  initialCursor?: TCursor;
};
type trpcInfiniteData<TDef extends ResolverDef> = Simplify<InfiniteData<TDef['output'], inferCursorType<TDef['input']>>>;
interface useTRPCInfiniteQuery<TDef extends ResolverDef> {
  <TData = trpcInfiniteData<TDef>>(input: InfiniteInput<TDef['input']>, opts: makeInfiniteQueryOptions<inferCursorType<TDef['input']>, DefinedInitialDataInfiniteOptions<TDef['output'], TRPCClientErrorLike<TDef>, TData, any, inferCursorType<TDef['input']>>>): TRPCHookResult & DefinedUseInfiniteQueryResult<TData, TRPCClientErrorLike<TDef>>;
  <TData = trpcInfiniteData<TDef>>(input: InfiniteInput<TDef['input']>, opts?: makeInfiniteQueryOptions<inferCursorType<TDef['input']>, UndefinedInitialDataInfiniteOptions<TDef['output'], TRPCClientErrorLike<TDef>, TData, any, inferCursorType<TDef['input']>>>): TRPCHookResult & UseInfiniteQueryResult<TData, TRPCClientErrorLike<TDef>>;
  <TData = trpcInfiniteData<TDef>>(input: InfiniteInput<TDef['input']>, opts?: makeInfiniteQueryOptions<inferCursorType<TDef['input']>, UseInfiniteQueryOptions<TDef['output'], TRPCClientErrorLike<TDef>, TData, any, inferCursorType<TDef['input']>>>): TRPCHookResult & UseInfiniteQueryResult<TData, TRPCClientErrorLike<TDef>>;
}
type useTRPCSuspenseInfiniteQuery<TDef extends ResolverDef> = (input: InfiniteInput<TDef['input']>, opts: makeInfiniteQueryOptions<inferCursorType<TDef['input']>, UseSuspenseInfiniteQueryOptions<TDef['output'], TRPCClientErrorLike<TDef>, trpcInfiniteData<TDef>, any, inferCursorType<TDef['input']>>>) => [trpcInfiniteData<TDef>, TRPCHookResult & UseSuspenseInfiniteQueryResult<trpcInfiniteData<TDef>, TRPCClientErrorLike<TDef>>];
/**
 * @internal
 */
type MaybeDecoratedInfiniteQuery<TDef extends ResolverDef> = TDef['input'] extends CursorInput ? {
  /**
   * @see https://trpc.io/docs/v11/client/react/useInfiniteQuery
   */
  useInfiniteQuery: useTRPCInfiniteQuery<TDef>;
  /**
   * @see https://trpc.io/docs/client/react/suspense#usesuspenseinfinitequery
   */
  useSuspenseInfiniteQuery: useTRPCSuspenseInfiniteQuery<TDef>;
  usePrefetchInfiniteQuery: (input: Omit<TDef['input'], ReservedInfiniteQueryKeys> | SkipToken, opts: TRPCFetchInfiniteQueryOptions<TDef['input'], TDef['output'], TRPCClientErrorLike<TDef>>) => void;
} : object;
/**
 * @internal
 */
type DecoratedQueryMethods<TDef extends ResolverDef> = {
  /**
   * @see https://trpc.io/docs/v11/client/react/useQuery
   */
  useQuery: ProcedureUseQuery<TDef>;
  usePrefetchQuery: ProcedureUsePrefetchQuery<TDef>;
  /**
   * @see https://trpc.io/docs/v11/client/react/suspense#usesuspensequery
   */
  useSuspenseQuery: <TQueryFnData extends TDef['output'] = TDef['output'], TData = TQueryFnData>(input: TDef['input'], opts?: UseTRPCSuspenseQueryOptions<TQueryFnData, TData, TRPCClientErrorLike<TDef>>) => [TData, UseSuspenseQueryResult<TData, TRPCClientErrorLike<TDef>> & TRPCHookResult];
};
/**
 * @internal
 */
type DecoratedQuery<TDef extends ResolverDef> = MaybeDecoratedInfiniteQuery<TDef> & DecoratedQueryMethods<TDef>;
type DecoratedMutation<TDef extends ResolverDef> = {
  /**
   * @see https://trpc.io/docs/v11/client/react/useMutation
   */
  useMutation: <TContext = unknown>(opts?: UseTRPCMutationOptions<TDef['input'], TRPCClientErrorLike<TDef>, TDef['output'], TContext>) => UseTRPCMutationResult<TDef['output'], TRPCClientErrorLike<TDef>, TDef['input'], TContext>;
};
interface ProcedureUseSubscription<TDef extends ResolverDef> {
  (input: TDef['input'], opts?: UseTRPCSubscriptionOptions<inferAsyncIterableYield<TDef['output']>, TRPCClientErrorLike<TDef>>): TRPCSubscriptionResult<inferAsyncIterableYield<TDef['output']>, TRPCClientErrorLike<TDef>>;
  (input: TDef['input'] | SkipToken, opts?: Omit<UseTRPCSubscriptionOptions<inferAsyncIterableYield<TDef['output']>, TRPCClientErrorLike<TDef>>, 'enabled'>): TRPCSubscriptionResult<inferAsyncIterableYield<TDef['output']>, TRPCClientErrorLike<TDef>>;
}
/**
 * @internal
 */
type DecorateProcedure<TType extends ProcedureType, TDef extends ResolverDef> = TType extends 'query' ? DecoratedQuery<TDef> : TType extends 'mutation' ? DecoratedMutation<TDef> : TType extends 'subscription' ? {
  /**
   * @see https://trpc.io/docs/v11/subscriptions
   */
  useSubscription: ProcedureUseSubscription<TDef>;
} : never;
/**
 * @internal
 */
type DecorateRouterRecord<TRoot extends AnyRootTypes, TRecord extends RouterRecord> = { [TKey in keyof TRecord]: TRecord[TKey] extends infer $Value ? $Value extends AnyProcedure ? DecorateProcedure<$Value['_def']['type'], {
  input: inferProcedureInput<$Value>;
  output: inferTransformedProcedureOutput<TRoot, $Value>;
  transformer: TRoot['transformer'];
  errorShape: TRoot['errorShape'];
}> : $Value extends RouterRecord ? DecorateRouterRecord<TRoot, $Value> : never : never };
/**
 * @internal
 */
type CreateTRPCReactBase<TRouter extends AnyRouter, TSSRContext> = {
  /**
   * @deprecated renamed to `useUtils` and will be removed in a future tRPC version
   *
   * @see https://trpc.io/docs/v11/client/react/useUtils
   */
  useContext(): CreateReactUtils<TRouter, TSSRContext>;
  /**
   * @see https://trpc.io/docs/v11/client/react/useUtils
   */
  useUtils(): CreateReactUtils<TRouter, TSSRContext>;
  Provider: TRPCProvider<TRouter, TSSRContext>;
  createClient: typeof createTRPCClient<TRouter>;
  useQueries: TRPCUseQueries<TRouter>;
  useSuspenseQueries: TRPCUseSuspenseQueries<TRouter>;
};
type CreateTRPCReact<TRouter extends AnyRouter, TSSRContext> = ProtectedIntersection<CreateTRPCReactBase<TRouter, TSSRContext>, DecorateRouterRecord<TRouter['_def']['_config']['$types'], TRouter['_def']['record']>>;
/**
 * @internal
 */

declare function createTRPCReact<TRouter extends AnyRouter, TSSRContext = unknown>(opts?: CreateTRPCReactOptions<TRouter>): CreateTRPCReact<TRouter, TSSRContext>;
//#endregion
//#region src/internals/getQueryKey.d.ts
type QueryType = 'any' | 'infinite' | 'query';
type TRPCQueryKey = [readonly string[], {
  input?: unknown;
  type?: Exclude<QueryType, 'any'>;
}?];
type TRPCMutationKey = [readonly string[]];
type ProcedureOrRouter = DecoratedMutation<any> | DecoratedQuery<any> | DecorateRouterRecord<any, any>;
/**
 * To allow easy interactions with groups of related queries, such as
 * invalidating all queries of a router, we use an array as the path when
 * storing in tanstack query.
 **/

type GetInfiniteQueryInput<TProcedureInput, TInputWithoutCursorAndDirection = Omit<TProcedureInput, 'cursor' | 'direction'>> = keyof TInputWithoutCursorAndDirection extends never ? undefined : DeepPartial<TInputWithoutCursorAndDirection> | undefined;
/** @internal */
type GetQueryProcedureInput<TProcedureInput> = TProcedureInput extends {
  cursor?: any;
} ? GetInfiniteQueryInput<TProcedureInput> : DeepPartial<TProcedureInput> | undefined;
type GetParams<TProcedureOrRouter extends ProcedureOrRouter> = TProcedureOrRouter extends DecoratedQuery<infer $Def> ? [input?: GetQueryProcedureInput<$Def['input']>, type?: QueryType] : [];
/**
 * Method to extract the query key for a procedure
 * @param procedureOrRouter - procedure or AnyRouter
 * @param input - input to procedureOrRouter
 * @param type - defaults to `any`
 * @see https://trpc.io/docs/v11/getQueryKey
 */
declare function getQueryKey<TProcedureOrRouter extends ProcedureOrRouter>(procedureOrRouter: TProcedureOrRouter, ..._params: GetParams<TProcedureOrRouter>): TRPCQueryKey;
type QueryKeyKnown<TInput, TType extends Exclude<QueryType, 'any'>> = [string[], {
  input?: GetQueryProcedureInput<TInput>;
  type: TType;
}?];
/**
 * Method to extract the mutation key for a procedure
 * @param procedure - procedure
 * @see https://trpc.io/docs/v11/getQueryKey#mutations
 */
declare function getMutationKey<TProcedure extends DecoratedMutation<any>>(procedure: TProcedure): TRPCMutationKey;
//#endregion
export { CreateClient, CreateQueryUtils, CreateReactUtils, CreateTRPCReact, CreateTRPCReactBase, CreateTRPCReactOptions, CreateTRPCReactQueryClientConfig, DecorateProcedure, DecorateQueryProcedure, DecorateRouterRecord, DecoratedProcedureUtilsRecord, DecoratedTRPCContextProps, DefinedTRPCInfiniteQueryOptionsIn, DefinedTRPCInfiniteQueryOptionsOut, DefinedTRPCQueryOptionsIn, DefinedTRPCQueryOptionsOut, DefinedUseTRPCQueryOptions, DefinedUseTRPCQueryResult, ExtractCursorType, InferMutationLikeData, InferMutationLikeInput, InferQueryLikeData, InferQueryLikeInput, MutationLike, OutputWithCursor, QueryLike, RouterLike, RouterLikeInner, SSRState, TRPCContext, TRPCContextProps, TRPCContextPropsBase, TRPCContextState, TRPCFetchInfiniteQueryOptions, TRPCFetchQueryOptions, TRPCHookResult, TRPCProvider, TRPCProviderProps, TRPCQueryBaseOptions, TRPCQueryOptions, TRPCQueryOptionsResult, TRPCQueryUtils, TRPCReactRequestOptions, TRPCSubscriptionBaseResult, TRPCSubscriptionConnectingResult, TRPCSubscriptionErrorResult, TRPCSubscriptionIdleResult, TRPCSubscriptionPendingResult, TRPCSubscriptionResult, TRPCUseQueries, TRPCUseQueryBaseOptions, TRPCUseSuspenseQueries, UndefinedTRPCInfiniteQueryOptionsIn, UndefinedTRPCInfiniteQueryOptionsOut, UndefinedTRPCQueryOptionsIn, UndefinedTRPCQueryOptionsOut, UnusedSkipTokenTRPCInfiniteQueryOptionsIn, UnusedSkipTokenTRPCInfiniteQueryOptionsOut, UnusedSkipTokenTRPCQueryOptionsIn, UnusedSkipTokenTRPCQueryOptionsOut, UseMutationOverride, UseQueriesProcedureRecord, UseSuspenseQueriesProcedureRecord, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult, UseTRPCInfiniteQuerySuccessResult, UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCPrefetchInfiniteQueryOptions, UseTRPCPrefetchQueryOptions, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCQuerySuccessResult, UseTRPCSubscriptionOptions, UseTRPCSuspenseInfiniteQueryOptions, UseTRPCSuspenseInfiniteQueryResult, UseTRPCSuspenseQueryOptions, UseTRPCSuspenseQueryResult, UtilsLike, contextProps, createQueryUtilsProxy, createReactDecoration, createReactQueryUtils, createRootHooks, createTRPCReact, createUseQueries, getClientArgs, getMutationKey, getQueryClient, getQueryKey, getQueryType, inferReactQueryProcedureOptions };
//# sourceMappingURL=getQueryKey.d-C_PnqPni.d.cts.map