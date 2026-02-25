import { TRPCFetchInfiniteQueryOptions, TRPCFetchQueryOptions } from "./getQueryKey.d-C_PnqPni.cjs";
import { TRPCClientError } from "@trpc/client";
import { AnyProcedure, AnyRootTypes, AnyRouter, RouterCaller, RouterRecord, TypeError, inferProcedureInput, inferProcedureOutput, inferRouterRootTypes } from "@trpc/server/unstable-core-do-not-import";
import { QueryClient } from "@tanstack/react-query";
import * as React from "react";
import { inferTransformedProcedureOutput as inferTransformedProcedureOutput$1 } from "@trpc/server";

//#region src/rsc.d.ts
type DecorateProcedure<TRoot extends AnyRootTypes, TProcedure extends AnyProcedure> = {
  (input: inferProcedureInput<TProcedure>): Promise<inferProcedureOutput<TProcedure>>;
  prefetch: (input: inferProcedureInput<TProcedure>, opts?: TRPCFetchQueryOptions<inferTransformedProcedureOutput$1<TRoot, TProcedure>, TRPCClientError<TRoot>>) => Promise<void>;
  prefetchInfinite: (input: inferProcedureInput<TProcedure>, opts?: TRPCFetchInfiniteQueryOptions<inferProcedureInput<TProcedure>, inferTransformedProcedureOutput$1<TRoot, TProcedure>, TRPCClientError<TRoot>>) => Promise<void>;
};
type DecorateRouterRecord<TRoot extends AnyRootTypes, TRecord extends RouterRecord> = { [TKey in keyof TRecord]: TRecord[TKey] extends infer $Value ? $Value extends AnyProcedure ? DecorateProcedure<TRoot, $Value> : $Value extends RouterRecord ? DecorateRouterRecord<TRoot, $Value> : never : never };
type Caller<TRouter extends AnyRouter> = ReturnType<RouterCaller<inferRouterRootTypes<TRouter>, TRouter['_def']['record']>>;
/**
 * @note This requires `@tanstack/react-query@^5.49.0`
 * @note Make sure to have `dehydrate.serializeData` and `hydrate.deserializeData`
 * set to your data transformer in your `QueryClient` factory.
 * @example
 * ```ts
 * export const createQueryClient = () =>
 *   new QueryClient({
 *     defaultOptions: {
 *       dehydrate: {
 *         serializeData: transformer.serialize,
 *       },
 *       hydrate: {
 *         deserializeData: transformer.deserialize,
 *       },
 *     },
 *   });
 * ```
 */
declare function createHydrationHelpers<TRouter extends AnyRouter>(caller: AnyRouter extends TRouter ? TypeError<'Generic parameter missing in `createHydrationHelpers<HERE>`'> : Caller<TRouter>, getQueryClient: () => QueryClient): {
  /***
   * Wrapped caller with prefetch helpers
   * Can be used as a regular [server-side caller](https://trpc.io/docs/server/server-side-calls)
   * or using prefetch helpers to put the promise into the QueryClient cache
   * @example
   * ```ts
   * const data = await trpc.post.get("postId");
   *
   * // or
   * void trpc.post.get.prefetch("postId");
   * ```
   */
  trpc: DecorateRouterRecord<inferRouterRootTypes<TRouter>, TRouter["_def"]["record"]>;
  /**
   * HoC to hydrate the query client for a client component
   * to pick up the prefetched promise and skip an initial
   * client-side fetch.
   * @example
   * ```tsx
   * // MyRSC.tsx
   * const MyRSC = ({ params }) => {
   *   void trpc.post.get.prefetch(params.postId);
   *
   *   return (
   *     <HydrateClient>
   *       <MyCC postId={params.postId} />
   *     </HydrateClient>
   *    );
   * };
   *
   * // MyCC.tsx
   * "use client"
   * const MyCC = ({ postId }) => {
   *   const { data: post } = trpc.post.get.useQuery(postId);
   *   return <div>{post.title}</div>;
   * };
   * ```
   */
  HydrateClient: (props: {
    children: React.ReactNode;
  }) => React.JSX.Element;
};
//#endregion
export { createHydrationHelpers };
//# sourceMappingURL=rsc.d.cts.map