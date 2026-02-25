import { CreateTRPCReactQueryClientConfig, DecorateQueryProcedure } from "../getQueryKey.d-C_PnqPni.cjs";
import { TRPCClient, TRPCUntypedClient } from "@trpc/client";
import { AnyQueryProcedure, AnyRootTypes, AnyRouter, ProtectedIntersection, RouterRecord, inferClientTypes, inferRouterContext } from "@trpc/server/unstable-core-do-not-import";
import { DehydrateOptions, DehydratedState, QueryClient } from "@tanstack/react-query";
import { TransformerOptions } from "@trpc/client/unstable-internals";

//#region src/server/ssgProxy.d.ts
type CreateSSGHelpersInternal<TRouter extends AnyRouter> = {
  router: TRouter;
  ctx: inferRouterContext<TRouter>;
} & TransformerOptions<inferClientTypes<TRouter>>;
interface CreateSSGHelpersExternal<TRouter extends AnyRouter> {
  client: TRPCClient<TRouter> | TRPCUntypedClient<TRouter>;
}
type CreateServerSideHelpersOptions<TRouter extends AnyRouter> = CreateTRPCReactQueryClientConfig & (CreateSSGHelpersExternal<TRouter> | CreateSSGHelpersInternal<TRouter>);
type SSGFns = 'queryOptions' | 'infiniteQueryOptions' | 'fetch' | 'fetchInfinite' | 'prefetch' | 'prefetchInfinite';
/**
 * @internal
 */
type DecoratedProcedureSSGRecord<TRoot extends AnyRootTypes, TRecord extends RouterRecord> = { [TKey in keyof TRecord]: TRecord[TKey] extends infer $Value ? $Value extends AnyQueryProcedure ? Pick<DecorateQueryProcedure<TRoot, $Value>, SSGFns> : $Value extends RouterRecord ? DecoratedProcedureSSGRecord<TRoot, $Value> : never : never };
/**
 * Create functions you can use for server-side rendering / static generation
 * @see https://trpc.io/docs/v11/client/nextjs/server-side-helpers
 */
declare function createServerSideHelpers<TRouter extends AnyRouter>(opts: CreateServerSideHelpersOptions<TRouter>): ProtectedIntersection<{
  queryClient: QueryClient;
  dehydrate: (opts?: DehydrateOptions) => DehydratedState;
}, DecoratedProcedureSSGRecord<TRouter["_def"]["_config"]["$types"], TRouter["_def"]["record"]>>;
//#endregion
export { createServerSideHelpers };
//# sourceMappingURL=index.d.cts.map